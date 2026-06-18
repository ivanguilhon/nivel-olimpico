import type { Metadata } from 'next'
import {} from '@/components/SalesComponents'
import { IMG } from '@/lib/images'

export const metadata: Metadata = { title: 'Livros' }

const livros = [
  {
    img:   IMG.fnoVol1,
    tag:   'Volume I — Mecânica, Termologia & Óptica',
    title: 'Física em Nível Olímpico',
    desc:  '85 desafios de Física para OBF, OBFEP, SOIF, TBF, OIbF e IPhO: cinemática e dinâmica, termologia e gases ideais, termodinâmica, óptica geométrica e física, e ondulatória. Todos com dicas e soluções completas.',
    links: [
      { label: 'Livro Físico', href: 'https://vestseller.com.br/fisica-em-nivel-olimpico-volume-1-ivan-guilhon.html' },
      { label: 'Ebook Vol. 1', href: 'https://pay.hotmart.com/L94437942W' },
    ],
  },
  {
    img:   IMG.fnoVol2,
    tag:   'Volume II — Eletromagnetismo & Óptica',
    title: 'Física em Nível Olímpico',
    desc:  'Eletrostática, magnetismo, indução eletromagnética e óptica ondulatória em nível de olimpíadas internacionais. Todos os problemas com dicas e soluções detalhadas.',
    links: [
      { label: 'Livro Físico', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon' },
      { label: 'Ebook Vol. 2', href: 'https://pay.hotmart.com/V94457853L' },
    ],
  },
  {
    img:   IMG.fnoVol3,
    tag:   'Volume III — Física Moderna · co-autoria Prof. Dr. Gustavo Melo',
    title: 'Física em Nível Olímpico',
    desc:  'Relatividade especial, mecânica quântica elementar e física atômica para as provas mais avançadas da OBF e IPhO.',
    links: [
      { label: 'Livro Físico', href: 'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon' },
    ],
  },
  {
    img:   IMG.estudoEficaz,
    tag:   'Inteligência, Virtudes e Provas',
    title: 'Estudo Eficaz',
    desc:  'Reflexões sobre desenvolvimento da inteligência, formação de virtudes e desempenho em provas e exames. O livro que todo estudante olímpico deveria ler.',
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
        {livros.map((l, i) => (
          <div key={i} className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div style={{ width: 200, flexShrink: 0, background: 'var(--color-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, minHeight: 220 }}>
              <img src={l.img} alt={l.title}
                style={{ maxWidth: '100%', maxHeight: 240, objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }} />
            </div>
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
    </div>
  )
}
