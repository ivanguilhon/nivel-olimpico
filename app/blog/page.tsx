import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog Olímpico',
  description: 'Artigos de física para olimpíadas, ITA e IME por Prof. Dr. Ivan Guilhon.',
}

const posts = [
  {
    slug:     'conservacao-energia-mecanica',
    title:    'Conservação de Energia Mecânica: da teoria à prova do ITA',
    date:     '2025-05-15',
    category: 'Mecânica',
    readTime: '8 min',
    excerpt:  'Quando usar conservação de energia em vez das leis de Newton? Estratégia completa com exemplo resolvido do ITA 2019.',
  },
  {
    slug:     'erros-classicos-ita',
    title:    'Os 5 erros que mais derrubam candidatos no ITA',
    date:     '2025-04-20',
    category: 'ITA/IME',
    readTime: '6 min',
    excerpt:  'Não são erros de cálculo — são armadilhas conceituais. Referenciais não-inerciais, força centrípeta, objetos virtuais e mais.',
  },
  {
    slug:     'osciladores-acoplados-modos-normais',
    title:    'Osciladores acoplados e modos normais de vibração',
    date:     '2025-03-10',
    category: 'Mecânica',
    readTime: '10 min',
    excerpt:  'Derivação completa dos modos normais via determinante secular, batimentos e aplicações em provas da IPhO.',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Blog Olímpico
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.7 }}>
          Artigos sobre física olímpica, estratégias de prova e teoria aprofundada.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map(post => (
          <article key={post.slug} className="group p-8 rounded-xl transition-all"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(228,173,65,0.12)', color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>
                {post.category}
              </span>
              <time style={{ color: 'var(--color-muted)', fontSize: 13 }}>
                {new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span style={{ color: 'var(--color-muted)', fontSize: 13 }}>· {post.readTime}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              <Link className="hover-gold" href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                {post.title}
              </Link>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: '1.25rem' }}>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>
              Ler artigo →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
