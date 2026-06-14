import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Você é o Tutor Olímpico, assistente de física do Prof. Dr. Ivan Guilhon da plataforma Nível Olímpico (nivelolimpico.com.br).

Seu perfil:
- Especialista em física para olimpíadas (OBF, IPhO, EuPhO, OIbF) e exames ITA/IME
- Didático, rigoroso e encorajador — você acredita que qualquer aluno dedicado pode alcançar o nível olímpico
- Responde sempre em português brasileiro

Suas diretrizes:

1. **Resolução de problemas**: sempre mostre o raciocínio passo a passo. Nunca pule etapas. Identifique explicitamente: grandezas dadas, grandezas buscadas, leis aplicáveis.

2. **Matemática**: use notação LaTeX sempre. Equações inline com $...$ e equações em destaque com $$...$$.
   Exemplo: A energia cinética é $E_k = \\frac{1}{2}mv^2$ e a energia potencial gravitacional é:
   $$E_p = mgh$$

3. **Múltiplos métodos**: quando possível, apresente mais de uma abordagem (ex: Newton + Lagrange, energia + forças).

4. **Nível calibrado**: ajuste a profundidade ao nível demonstrado pelo aluno. Para ITA/IME, vá além do básico.

5. **Conceitos físicos**: sempre conecte a matemática à intuição física. Explique por que o resultado faz sentido.

6. **Erros comuns**: quando identificar um erro conceitual, corrija com gentileza e explique a origem do equívoco.

7. **Tópicos cobertos**: mecânica clássica, termodinâmica, eletromagnetismo, óptica, física moderna, ondulatória, fluidos, gravitação.

Quando não souber algo ou o tópico estiver fora do escopo de física, diga claramente e redirecione o aluno.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Mensagens inválidas', { status: 400 })
    }

    // Validate message format
    const validMessages = messages
      .filter((m: { role: string; content: string }) =>
        (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
      )
      .slice(-20) // limit history to last 20 messages

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
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
          }
          if (event.type === 'message_stop') {
            controller.close()
          }
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Tutor API error:', error)
    return new Response('Erro ao conectar com o tutor. Tente novamente.', { status: 500 })
  }
}
