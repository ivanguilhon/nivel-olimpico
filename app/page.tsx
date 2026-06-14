import Link from 'next/link'
import { BookOpen, Cpu, Users, BookMarked, ArrowRight } from 'lucide-react'

const books = [
  {
    title: 'Física em Nível Olímpico',
    subtitle: 'Volumes 1, 2 e 3',
    desc: 'Vasta coletânea de problemas para OBF, OIbF, EuPhO e IPhO. Todos com dicas e soluções detalhadas.',
    links: [
      { label: 'Livros Físicos', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon', external: true },
      { label: 'Ebooks', href: '/livros' },
    ],
  },
  {
    title: 'Estudo Eficaz',
    subtitle: 'Inteligência, Virtudes e Provas',
    desc: 'Reflexões sobre desenvolvimento da inteligência, formação de virtudes e desempenho em provas e exames.',
    links: [
      { label: 'Ebook', href: 'https://pay.hotmart.com/X72216388W', external: true },
      { label: 'Livro Físico', href: 'https://vestseller.com.br/estudo%20eficaz', external: true },
    ],
  },
]

const features = [
  { icon: BookOpen,    title: 'Conteúdo Olímpico',        desc: 'Problemas e teoria para OBF, IPhO, ITA e IME com soluções comentadas.' },
  { icon: Cpu,         title: 'Simulações Interativas',    desc: 'PhysSim: simulações em tempo real para visualizar fenômenos físicos.' },
  { icon: Users,       title: 'Grupos de Discussão',       desc: 'Comunidade ativa para tirar dúvidas e trocar experiências.' },
  { icon: BookMarked,  title: 'Blog Olímpico',             desc: 'Artigos, dicas de estudo e análise de problemas de competição.' },
]

const courses = [
  { label: 'Física Olímpica',     href: 'https://militares.estrategia.com/concursos/cursos/fisica-olimpica', tag: 'Estratégia Militar' },
  { label: 'Física Experimental', href: '/cursos/experimental', tag: 'Nível Olímpico' },
  { label: 'LaTeX para Todos',    href: '/cursos/latex',        tag: 'Nível Olímpico' },
  { label: 'Turma de Ciências',   href: 'https://militares.estrategia.com/concursos/cursos/ciencias-mirim', tag: 'Estratégia Militar' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #141428 60%, #1a1a35 100%)' }} className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, border: '1px solid rgba(201,162,39,0.12)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '5%', right: '8%', width: 320, height: 320, border: '1px solid rgba(201,162,39,0.08)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 400, height: 400, border: '1px solid rgba(201,162,39,0.06)', borderRadius: '50%' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-28 relative">
          <p style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Prof. Dr. Ivan Guilhon
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, maxWidth: 700, marginBottom: '1.5rem' }}>
            Física em<br />
            <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Nível Olímpico</em>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 18, maxWidth: 520, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Preparação completa para olimpíadas de Física e exames de alto nível — OBF, IPhO, ITA e IME.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/livros" className="flex items-center gap-2 px-6 py-3 rounded font-medium" style={{ background: 'var(--color-gold)', color: '#0D0D1A', fontSize: 15 }}>
              Ver Livros <ArrowRight size={16} />
            </Link>
            <Link href="/simulacoes" className="flex items-center gap-2 px-6 py-3 rounded font-medium" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)', fontSize: 15 }}>
              Simulações
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-text)', marginBottom: '3rem' }}>
          O que você encontra aqui
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}><Icon size={28} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Books */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-text)', marginBottom: '3rem' }}>Livros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map(book => (
              <div key={book.title} className="p-8 rounded-lg" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{book.subtitle}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{book.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: '1.5rem' }}>{book.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {book.links.map(l => (
                    <Link key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="px-4 py-2 rounded text-sm font-medium" style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)' }}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-text)', marginBottom: '3rem' }}>Cursos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map(c => (
            <Link key={c.label} href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center justify-between p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div>
                <p style={{ color: 'var(--color-text)', fontWeight: 500, fontSize: 16 }}>{c.label}</p>
                <p style={{ color: 'var(--color-muted)', fontSize: 12, marginTop: 2 }}>{c.tag}</p>
              </div>
              <ArrowRight size={18} style={{ color: 'var(--color-gold)' }} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
