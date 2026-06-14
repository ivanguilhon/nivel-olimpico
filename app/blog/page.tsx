import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Blog Olímpico' }

const posts = [
  { slug: 'como-resolver-problemas-de-mecanica', title: 'Como resolver problemas de mecânica olímpica', date: '2024-11-10', category: 'Mecânica', excerpt: 'Estratégias e ferramentas matemáticas para atacar problemas de dinâmica e cinemática em olimpíadas.' },
  { slug: 'entropia-e-a-segunda-lei',            title: 'Entropia e a Segunda Lei da Termodinâmica',   date: '2024-10-28', category: 'Termodinâmica', excerpt: 'Uma introdução rigorosa ao conceito de entropia para estudantes de olimpíadas.' },
  { slug: 'erros-classicos-no-ita',              title: 'Erros clássicos que derrubam candidatos no ITA', date: '2024-09-15', category: 'ITA/IME', excerpt: 'Análise dos erros mais comuns nas provas do ITA e como evitá-los.' },
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-text)', marginBottom: '3rem' }}>
        Blog Olímpico
      </h1>
      <div className="flex flex-col gap-8">
        {posts.map(post => (
          <article key={post.slug} className="p-8 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'rgba(201,162,39,0.12)', color: 'var(--color-gold)' }}>{post.category}</span>
              <time style={{ color: 'var(--color-muted)', fontSize: 13 }}>{new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
              <Link className="hover-gold" href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                {post.title}
              </Link>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7 }}>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--color-gold)' }}>
              Ler artigo →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
