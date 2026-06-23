'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    })

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)',
    color: 'var(--color-text)', borderRadius: 8, padding: '11px 14px', fontSize: 15, outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--color-muted)', fontSize: 12, marginBottom: 5,
    textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-display)',
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
            Recuperar senha
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
            Digite seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {sent ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={40} style={{ color: '#34D399' }} />
              </div>
              <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                E-mail enviado!
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6 }}>
                Verifique sua caixa de entrada e clique no link para redefinir sua senha.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg mb-4"
                  style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)' }}>
                  <AlertCircle size={15} style={{ color: '#ff6b6b', flexShrink: 0 }} />
                  <p style={{ color: '#ff6b6b', fontSize: 13 }}>{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    autoComplete="email" placeholder="seu@email.com" style={inputStyle} />
                </div>
                <button type="submit" disabled={loading}
                  style={{ padding: '12px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)',
                    background: loading ? 'var(--color-surface2)' : 'var(--color-gold)',
                    color: loading ? 'var(--color-muted)' : '#000' }}>
                  {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                </button>
              </form>
            </>
          )}

          <div className="mt-4 text-center">
            <Link href="/login" style={{ color: 'var(--color-gold)', fontSize: 14, fontWeight: 600 }}>
              ← Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
