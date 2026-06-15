import type { Metadata } from 'next'
import Link from 'next/link'
import { IMG } from '@/components/SalesComponents'

export const metadata: Metadata = { title: 'Livros' }

const livros = [
  {
    img: IMG.fno,
    tag: 'Volumes 1, 2 e 3',
    title: 'Física em Nível Olímpico',
    desc: 'Vasta coletânea de problemas para OBF, OIbF, EuPhO e IPhO. Todos com dicas e soluções detalhadas. Co-autoria com Prof. Dr. Gustavo Melo (Vol. 3).',
    links: [
      { label: 'Livros Físicos', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon' },
      { label: 'Ebook Vol. 1',   href: 'https://pay.hotmart.com/L94437942W' },
      { label: 'Ebook Vol. 2',   href: 'https://pay.hotmart.com/V94457853L' },
    ],
  },
  {
    img: IMG.estudoEficaz,
    tag: 'Inteligência, Virtudes e Provas',
    title: 'Estudo Eficaz',
    desc: 'Reflexões sobre desenvolvimento da inteligência, formação de virtudes e desempenho em provas e exames. O livro que todo estudante olímpico deveria ler.',
    links: [
      { label: 'Ebook',        href: 'https://pay.hotmart.com/X72216388W' },
      { label: 'Livro Físico', href: 'https://vestseller.com.br/estudo%20eficaz' },
    ],
  },
]

export default function LivrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-text)', marginBottom: '3rem' }}>
        Livros
      </h1>
      <div className="flex flex-col gap-8">
        {livros.map(l => (
          <div key={l.title} className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

            {/* Book cover */}
            <div style={{ width: 200, flexShrink: 0, background: 'var(--color-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, minHeight: 200 }}>
              <img src={l.img} alt={l.title}
                style={{ maxWidth: '100%', maxHeight: 220, objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }} />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <p style={{ color: 'var(--color-gold)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                {l.tag}
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                {l.title}
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: '1.75rem', flex: 1 }}>{l.desc}</p>
              <div className="flex flex-wrap gap-3">
                {l.links.map(lk => (
                  <a key={lk.label} href={lk.href} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '10px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                      border: '1px solid var(--color-gold)', color: 'var(--color-gold)', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>
                    {lk.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Author note */}
      <div className="mt-12 p-6 rounded-xl text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>
          Todos os livros disponíveis também na{' '}
          <a href="https://www.amazon.com.br/shop/prof.ivanguilhon" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--color-gold)' }}>Amazon</a>
          {' '}e aceitam pagamento em{' '}
          <a href="https://www.nivelolimpico.com.br/post/como-comprar-seus-livros-com-criptomoedas" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--color-gold)' }}>criptomoedas (BTC, ETH, SOL)</a>.
        </p>
      </div>
    </div>
  )
}
