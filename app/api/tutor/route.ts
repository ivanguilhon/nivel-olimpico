import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

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

export async function POST(req: NextRequest) {
  // Check API key first
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada. Adicione a variável de ambiente no Vercel.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Mensagens inválidas.' }), { status: 400 })
    }

    const validMessages = messages
      .filter((m: { role: string; content: string }) =>
        (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim()
      )
      .slice(-20)

    if (validMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'Nenhuma mensagem válida.' }), { status: 400 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const stream = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: validMessages,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text))
            }
            if (event.type === 'message_stop') {
              controller.close()
            }
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
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error: unknown) {
    console.error('Tutor API error:', error)
    const msg = error instanceof Error ? error.message : 'Erro desconhecido'
    return new Response(
      JSON.stringify({ error: `Erro ao conectar com a API: ${msg}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
