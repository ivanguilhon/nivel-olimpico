"use client"
import Link from 'next/link'


export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-text)', marginBottom: '0.5rem' }}>Bem-vindo de volta</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>Entre na sua conta para acessar o conteúdo exclusivo.</p>
        </div>

        <div className="p-8 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <form className="flex flex-col gap-5" action="/auth/login" method="POST">
            {[
              { id: 'email',    label: 'Email',  type: 'email',    placeholder: 'seu@email.com' },
              { id: 'password', label: 'Senha',  type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} style={{ display: 'block', color: 'var(--color-muted)', fontSize: 12, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {f.label}
                </label>
                <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required
                  style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)',
                    borderRadius: 6, padding: '10px 14px', fontSize: 15 }} />
              </div>
            ))}
            <button type="submit" style={{ background: 'var(--color-gold)', color: '#0D0D1A', border: 'none', borderRadius: 6, padding: '12px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Entrar
            </button>
          </form>
          <p className="text-center mt-4" style={{ color: 'var(--color-muted)', fontSize: 14 }}>
            Não tem conta?{' '}
            <Link href="/register" style={{ color: 'var(--color-gold)' }}>Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
