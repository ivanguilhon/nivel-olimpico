import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 80, fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1 }}>
          404
        </h1>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-text)', marginBottom: 8 }}>
          Página não encontrada
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: 16, marginBottom: 32 }}>
          A página que você procura não existe ou foi movida.
        </p>
        <Link href="/"
          style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 8,
            background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
