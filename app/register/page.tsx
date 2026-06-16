'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState(false)
  const nameRef     = useRef<HTMLInputElement>(null)
  const emailRef    = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef  = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const password = passwordRef.current!.value
    const confirm  = confirmRef.current!.value

    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 8)  { setError('A senha deve ter no mínimo 8 caracteres.'); return }

    setLoading(true)

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error: err } = await supabase.auth.signUp({
      email:    emailRef.current!.value,
      password,
      options: {
        data:         { full_name: nameRef.current!.value },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (err) {
      setError(
        err.message.includes('already registered')
          ? 'Este e-mail já está cadastrado. Faça login.'
          : err.message
      )
      setLoading(false)
    } else {
      setSuccess(true)
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

  if (success) return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <CheckCircle size={56} style={{ color: '#34D399', margin: '0 auto 20px' }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>
          Confirme seu e-mail
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
          Enviamos um link de confirmação para <strong style={{ color: 'var(--color-text)' }}>{emailRef.current?.value}</strong>.
          <br />Clique no link para ativar sua conta.
        </p>
        <Link href="/login"
          style={{ display: 'inline-block', padding: '11px 28px', borderRadius: 8,
            background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
          Ir para o login
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
            Criar conta grátis
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
            Acesse o fórum, o tutor de IA e conteúdo exclusivo.
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
              <label style={labelStyle}>Nome completo</label>
              <input ref={nameRef} type="text" required autoComplete="name"
                placeholder="Seu nome" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input ref={emailRef} type="email" required autoComplete="email"
                placeholder="seu@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Senha <span style={{ fontWeight: 400 }}>(mín. 8 caracteres)</span></label>
              <input ref={passwordRef} type="password" required minLength={8}
                autoComplete="new-password" placeholder="••••••••" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirmar senha</label>
              <input ref={confirmRef} type="password" required minLength={8}
                autoComplete="new-password" placeholder="••••••••" style={inputStyle} />
            </div>

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2"
              style={{ padding: '12px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)',
                background: loading ? 'var(--color-surface2)' : 'var(--color-gold)',
                color: loading ? 'var(--color-muted)' : '#000' }}>
              <UserPlus size={16} />
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>
              Já tem conta?{' '}
              <Link href="/login" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                Faça login
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 flex flex-col gap-2">
          {[
            'Acesso ao Fórum de Física',
            'Tutor de IA (20 perguntas/dia)',
            'Grupos de discussão',
          ].map(b => (
            <div key={b} className="flex items-center gap-2">
              <CheckCircle size={14} style={{ color: '#34D399', flexShrink: 0 }} />
              <span style={{ color: 'var(--color-muted)', fontSize: 13 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
