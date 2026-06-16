import { Resend } from 'resend'
import { NextRequest } from 'next/server'

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return json({ error: 'Serviço de e-mail não configurado.' }, 500)
  }

  const { nome, email, mensagem } = await req.json()

  if (!nome?.trim() || !email?.trim() || !mensagem?.trim()) {
    return json({ error: 'Preencha todos os campos.' }, 400)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return json({ error: 'E-mail inválido.' }, 400)
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from:    'Site Nível Olímpico <contato@nivelolimpico.com.br>',
      to:      ['ivan@nivelolimpico.com.br'],
      replyTo: email,
      subject: `[Contato] Mensagem de ${nome}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#E4AD41;border-bottom:2px solid #E4AD41;padding-bottom:8px">
            Nova mensagem — Nível Olímpico
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:80px"><strong>Nome</strong></td><td style="padding:8px 0">${nome}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>E-mail</strong></td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <h3 style="color:#333;margin-top:24px">Mensagem</h3>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${mensagem}</div>
          <hr style="margin-top:32px;border:none;border-top:1px solid #eee"/>
          <p style="color:#999;font-size:12px">Enviado via nivelolimpico.com.br</p>
        </div>
      `,
    })

    // Auto-reply to sender
    await resend.emails.send({
      from:    'Prof. Dr. Ivan Guilhon <contato@nivelolimpico.com.br>',
      to:      [email],
      subject: 'Recebi sua mensagem — Nível Olímpico',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#E4AD41">Olá, ${nome}!</h2>
          <p>Recebi sua mensagem e responderei em breve.</p>
          <p style="color:#666">— Prof. Dr. Ivan Guilhon<br/>
          <a href="https://nivelolimpico.com.br">nivelolimpico.com.br</a></p>
        </div>
      `,
    })

    return json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return json({ error: 'Erro ao enviar e-mail. Tente novamente.' }, 500)
  }
}
