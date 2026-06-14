import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Livros' }

const livros = [
  {
    title: 'Física em Nível Olímpico — Vol. 1',
    tag: 'Mecânica & Termodinâmica',
    desc: 'Problemas desafiadores de mecânica clássica e termodinâmica para OBF e IPhO, todos com dicas e soluções completas.',
    links: [{ label: 'Comprar livro físico', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon' }, { label: 'Ebook (PDF)', href: '#' }],
  },
  {
    title: 'Física em Nível Olímpico — Vol. 2',
    tag: 'Eletromagnetismo & Óptica',
    desc: 'Eletrostática, magnetismo, indução e óptica ondulatória em nível de olimpíadas internacionais.',
    links: [{ label: 'Comprar livro físico', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon' }, { label: 'Ebook (PDF)', href: '#' }],
  },
  {
    title: 'Física em Nível Olímpico — Vol. 3',
    tag: 'Física Moderna',
    desc: 'Relatividade especial, mecânica quântica elementar e física atômica para as provas mais avançadas.',
    links: [{ label: 'Comprar livro físico', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon' }, { label: 'Ebook (PDF)', href: '#' }],
  },
  {
    title: 'Estudo Eficaz',
    tag: 'Método de Estudo',
    desc: 'Inteligência, virtudes e provas. Reflexões sobre como estudar de forma realmente eficiente.',
    links: [{ label: 'Ebook (Hotmart)', href: 'https://pay.hotmart.com/X72216388W' }, { label: 'Livro físico', href: 'https://vestseller.com.br/estudo%20eficaz' }],
  },
]

export default function LivrosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-text)', marginBottom: '3rem' }}>Livros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {livros.map(l => (
          <div key={l.title} className="p-8 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{l.tag}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{l.title}</h2>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: '1.5rem' }}>{l.desc}</p>
            <div className="flex flex-wrap gap-3">
              {l.links.map(lk => (
                <Link key={lk.label} href={lk.href} target={lk.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="px-4 py-2 rounded text-sm font-medium" style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)' }}>
                  {lk.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
