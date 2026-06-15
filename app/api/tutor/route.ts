import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const DAILY_LIMIT = 20   // mensagens gratuitas por dia
const MODEL       = 'claude-haiku-4-5-20251001'

const SYSTEM_PROMPT = `Você é o Tutor Olímpico, assistente de física do Prof. Dr. Ivan Guilhon da plataforma Física em Nível Olímpico (nivelolimpico.com.br).

Seu perfil:
- Especialista em física para olimpíadas (OBF, IPhO, EuPhO, OIbF) e exames ITA/IME
- Didático, rigoroso e encorajador
- Responde sempre em português brasileiro

Diretrizes:
1. Mostre resolução passo a passo. Identifique: dados, incógnitas, leis aplicáveis.
2. Use LaTeX sempre: inline com $...$ e destaque com $$...$$.
3. Quando possível, apresente múltiplos métodos de solução.
4. Ajuste profundidade ao nível demonstrado pelo aluno.
5. Conecte matemática à intuição física.
6. Tópicos: mecânica, termodinâmica, eletromagnetismo, óptica, física moderna, ondulatória, fluidos, gravitação.`

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req: NextRequest) {
  // 1. Checar API key
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: 'ANTHROPIC_API_KEY não configurada no servidor.' }, 500)
  }

  // 2. Autenticar usuário via Supabase
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,   // service role para poder escrever em tutor_usage
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return json({ error: 'É necessário fazer login para usar o Tutor Olímpico.', code: 'UNAUTHENTICATED' }, 401)
  }

  // 3. Verificar e incrementar uso diário
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  const { data: usage } = await supabase
    .from('tutor_usage')
    .select('count')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  const currentCount = usage?.count ?? 0

  if (currentCount >= DAILY_LIMIT) {
    return json({
      error: `Limite diário de ${DAILY_LIMIT} mensagens atingido. Volte amanhã!`,
      code: 'RATE_LIMITED',
      limit: DAILY_LIMIT,
      used: currentCount,
    }, 429)
  }

  // Incrementa uso (upsert)
  await supabase
    .from('tutor_usage')
    .upsert(
      { user_id: user.id, date: today, count: currentCount + 1 },
      { onConflict: 'user_id,date' }
    )

  // 4. Validar mensagens
  const { messages } = await req.json()
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'Mensagens inválidas.' }, 400)
  }

  const validMessages = messages
    .filter((m: { role: string; content: string }) =>
      (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim()
    )
    .slice(-20)

  if (validMessages.length === 0) {
    return json({ error: 'Nenhuma mensagem válida.' }, 400)
  }

  // 5. Chamar Claude Haiku com streaming
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const stream = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: validMessages,
      stream: true,
    })

    const encoder = new TextEncoder()
    const remaining = DAILY_LIMIT - (currentCount + 1)

    const readable = new ReadableStream({
      async start(controller) {
        // Envia header com uso restante como primeiro chunk JSON especial
        controller.enqueue(encoder.encode(
          `\x00${JSON.stringify({ remaining, used: currentCount + 1, limit: DAILY_LIMIT })}\x00`
        ))
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text))
            }
            if (event.type === 'message_stop') controller.close()
          }
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Tutor-Remaining': String(remaining),
        'X-Tutor-Limit': String(DAILY_LIMIT),
      },
    })
  } catch (error: unknown) {
    console.error('Claude API error:', error)
    const msg = error instanceof Error ? error.message : 'Erro desconhecido'
    return json({ error: `Erro na API: ${msg}` }, 500)
  }
}
