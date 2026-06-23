'use client'

export const dynamic = 'force-dynamic'

import QuestionForm from '@/components/QuestionForm'

export default function NovaPerguntaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
        Nova pergunta
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 32 }}>
        Use LaTeX: <code style={{ color: 'var(--color-gold)', fontSize: 13 }}>$F=ma$</code> inline e{' '}
        <code style={{ color: 'var(--color-gold)', fontSize: 13 }}>$$E=mc^2$$</code> em destaque.
      </p>
      <QuestionForm mode="create" />
    </div>
  )
}
