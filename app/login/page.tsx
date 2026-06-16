'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, LogIn } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'

  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const emailRef    = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { error: err } = await supabase.auth.signInWithPassword({
      email:    emailRef.current!.value,
      password: passwordRef.current!.value,
    })

    if (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos.'
        : err.message)
      setLoading(false)
    } else {
      router.push(next)
      router.refresh()
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

  const authError = searchParams.get('error')

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
            Bem-vindo de volta
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
            Entre na sua conta para acessar o fórum e o tutor.
          </p>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {(error || authError) && (
            <div className="flex items-center gap-2 p-3 rounded-lg mb-4"
              style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)' }}>
              <AlertCircle size={15} style={{ color: '#ff6b6b', flexShrink: 0 }} />
              <p style={{ color: '#ff6b6b', fontSize: 13 }}>
                {error || 'Erro na confirmação de e-mail. Tente novamente.'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label style={labelStyle}>E-mail</label>
              <input ref={emailRef} type="email" required autoComplete="email"
                placeholder="seu@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Senha</label>
              <input ref={passwordRef} type="password" required autoComplete="current-password"
                placeholder="••••••••" style={inputStyle} />
            </div>

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2"
              style={{ padding: '12px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)',
                background: loading ? 'var(--color-surface2)' : 'var(--color-gold)',
                color: loading ? 'var(--color-muted)' : '#000' }}>
              <LogIn size={16} />
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>
              Não tem conta?{' '}
              <Link href="/register" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                Cadastre-se grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <LoginForm />
    </Suspense>
  )
}
