'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 6)  { setError('A senha deve ter pelo menos 6 caracteres.'); return }

    setLoading(true); setError('')

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error: err } = await supabase.auth.updateUser({ password })

    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      router.push('/login')
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
            Nova senha
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
            Escolha uma nova senha para sua conta.
          </p>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg mb-4"
              style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)' }}>
              <AlertCircle size={15} style={{ color: '#ff6b6b', flexShrink: 0 }} />
              <p style={{ color: '#ff6b6b', fontSize: 13 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label style={labelStyle}>Nova senha</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                autoComplete="new-password" placeholder="••••••••" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirmar senha</label>
              <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                autoComplete="new-password" placeholder="••••••••" style={inputStyle} />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: '12px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)',
                background: loading ? 'var(--color-surface2)' : 'var(--color-gold)',
                color: loading ? 'var(--color-muted)' : '#000' }}>
              {loading ? 'Salvando...' : 'Salvar nova senha'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
