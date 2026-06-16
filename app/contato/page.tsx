'use client'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function ContatoPage() {
  const [form, setForm]     = useState({ nome: '', email: '', mensagem: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')
    try {
      const res  = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setErrMsg(data.error ?? 'Erro desconhecido.'); setStatus('error'); return }
      setStatus('ok')
      setForm({ nome: '', email: '', mensagem: '' })
    } catch {
      setErrMsg('Erro de conexão. Tente novamente.')
      setStatus('error')
    }
  }

  const input = {
    background: 'var(--color-surface)', border: '1px solid var(--color-border)',
    color: 'var(--color-text)', borderRadius: 8, padding: '11px 14px',
    fontSize: 15, outline: 'none', width: '100%', fontFamily: 'var(--font-body)',
  } as React.CSSProperties

  const label = {
    display: 'block', color: 'var(--color-muted)', fontSize: 12,
    marginBottom: '0.4rem', textTransform: 'uppercase' as const,
    letterSpacing: '0.08em', fontFamily: 'var(--font-display)',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
        Contato
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Dúvidas sobre cursos, livros ou parcerias? Envie uma mensagem — responderei em breve.
      </p>

      {status === 'ok' ? (
        <div className="flex items-start gap-4 p-6 rounded-xl"
          style={{ background: 'rgba(228,173,65,0.08)', border: '1px solid rgba(228,173,65,0.3)' }}>
          <CheckCircle size={24} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
              Mensagem enviada!
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
              Você receberá uma confirmação por e-mail. Responderei o mais breve possível.
            </p>
            <button onClick={() => setStatus('idle')} style={{ marginTop: 12, color: 'var(--color-gold)', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
              Enviar outra mensagem →
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            <label style={label}>Nome</label>
            <input type="text" value={form.nome} onChange={set('nome')} required
              placeholder="Seu nome completo" style={input} />
          </div>
          <div>
            <label style={label}>E-mail</label>
            <input type="email" value={form.email} onChange={set('email')} required
              placeholder="seu@email.com" style={input} />
          </div>
          <div>
            <label style={label}>Mensagem</label>
            <textarea value={form.mensagem} onChange={set('mensagem')} required
              rows={6} placeholder="Escreva sua mensagem..."
              style={{ ...input, resize: 'vertical' }} />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 rounded-lg"
              style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.25)' }}>
              <AlertCircle size={18} style={{ color: '#ff6b6b', flexShrink: 0 }} />
              <p style={{ color: '#ff6b6b', fontSize: 14 }}>{errMsg}</p>
            </div>
          )}

          <button type="submit" disabled={status === 'sending'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: status === 'sending' ? 'var(--color-surface2)' : 'var(--color-gold)',
              color: status === 'sending' ? 'var(--color-muted)' : '#000',
              border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 15,
              fontWeight: 700, cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-display)', alignSelf: 'flex-start', transition: 'all 0.15s',
            }}>
            <Send size={16} />
            {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      )}

      <div className="mt-12 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
        style={{ borderTop: '1px solid var(--color-border)' }}>
        <div>
          <p style={{ color: 'var(--color-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-display)', marginBottom: 6 }}>WhatsApp</p>
          <a href="https://wa.me/5512988616486" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--color-gold)', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
            +55 12 98861-6486
          </a>
        </div>
        <div>
          <p style={{ color: 'var(--color-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-display)', marginBottom: 6 }}>Instagram</p>
          <a href="https://instagram.com/prof.ivanguilhon" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--color-gold)', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
            @prof.ivanguilhon
          </a>
        </div>
      </div>
    </div>
  )
}
