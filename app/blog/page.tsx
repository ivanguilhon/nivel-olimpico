import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog Olímpico',
  description: 'Artigos sobre olimpíadas científicas, física e educação por Prof. Dr. Ivan Guilhon.',
}

export const posts = [
  {
    slug:     'olimpiada-brasileira-de-ciencias-obc-2026',
    title:    'Olimpíada Brasileira de Ciências (OBC) 2026',
    date:     '2026-03-26',
    category: 'Olimpíadas Científicas',
    readTime: '2 min',
    excerpt:  'A OBC reúne Física, Química e Biologia em um formato integrado — excelente porta de entrada para olimpíadas internacionais como a IJSO. Veja o calendário e como se inscrever.',
    image:    'https://static.wixstatic.com/media/8dc56f_eb6d82607e7f4236a8bbc652674f9187~mv2.png/v1/fill/w_600,h_400,al_c,q_85/8dc56f_eb6d82607e7f4236a8bbc652674f9187~mv2.png',
    author:   'Ivan Guilhon',
  },
  {
    slug:     'brasil-conquista-medalha-de-prata-iypt-2025',
    title:    'Brasil conquista medalha de prata na Copa do Mundo de Física — IYPT 2025',
    date:     '2025-07-11',
    category: 'Olimpíadas Científicas',
    readTime: '2 min',
    excerpt:  'A equipe brasileira conquistou a medalha de prata na 38ª edição do IYPT, realizada em Lund, na Suécia. O IYPT Brasil é coordenado pelo Prof. Dr. Ivan Guilhon.',
    image:    'https://static.wixstatic.com/media/8dc56f_a1f3ac6ca83549a28a7095b747c98cbe~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85/8dc56f_a1f3ac6ca83549a28a7095b747c98cbe~mv2.jpg',
    author:   'Ivan Guilhon',
  },
  {
    slug:     'comunidade-fisica-em-nivel-olimpico',
    title:    'Comunidade "Física em Nível Olímpico" no WhatsApp',
    date:     '2025-01-11',
    category: 'Educação',
    readTime: '2 min',
    excerpt:  'Criamos grupos de discussão segmentados por nível escolar — OBF Jr, Nível 1, 2, 3 e IYPT — para que estudantes se apoiem mutuamente na preparação para olimpíadas.',
    image:    'https://static.wixstatic.com/media/7b20c6_d82862b1aa304728ae8959c4bf1c080d~mv2.png/v1/fill/w_600,h_400,al_c,q_85/7b20c6_d82862b1aa304728ae8959c4bf1c080d~mv2.png',
    author:   'Ivan Guilhon',
  },
  {
    slug:     'resultado-1a-fase-iypt-brasil-2025',
    title:    'Resultado da 1ª fase da IYPT Brasil 2025',
    date:     '2024-12-28',
    category: 'Olimpíadas Científicas',
    readTime: '2 min',
    excerpt:  '24 equipes de sete estados brasileiros classificadas para a 2ª fase do IYPT Brasil 2025. Confira a lista completa e o formato da etapa de Physics Fights.',
    image:    'https://i.ytimg.com/vi/pd6uCkvW4mQ/maxresdefault.jpg',
    author:   'Ivan Guilhon',
  },
]

const categories = ['Todos', 'Olimpíadas Científicas', 'Física', 'Educação', 'Dicas de Estudo', 'OBF']

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
          Blog Olímpico
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>
          Olimpíadas científicas, física e educação por Prof. Dr. Ivan Guilhon.
        </p>
      </div>

      {/* Category filter — decorative for now */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c, i) => (
          <span key={c} style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontWeight: i === 0 ? 600 : 400,
            background: i === 0 ? 'var(--color-gold)' : 'var(--color-surface)',
            color:      i === 0 ? '#000' : 'var(--color-muted)',
            border: `1px solid ${i === 0 ? 'var(--color-gold)' : 'var(--color-border)'}`,
          }}>{c}</span>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <article key={post.slug} className={`rounded-2xl overflow-hidden flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

            {/* Cover image */}
            <div style={{ position: 'relative', height: i === 0 ? 280 : 200, background: 'var(--color-bg)', overflow: 'hidden' }}>
              <img src={post.image} alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <span style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 20,
                  padding: '4px 12px', fontSize: 11, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <time style={{ color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)' }}>
                  {new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span style={{ color: 'var(--color-muted)', fontSize: 12 }}>· {post.readTime} de leitura</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: i === 0 ? 24 : 19, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
                <Link className="hover-gold" href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.7, flex: 1 }}>{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(228,173,65,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                    IG
                  </div>
                  <span style={{ color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)' }}>{post.author}</span>
                </div>
                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--color-gold)', fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Ler →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
