import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Links Úteis' }

const categorias = [
  {
    cat: 'Olimpíadas',
    links: [
      { label: 'OBF — Olimpíada Brasileira de Física', href: 'https://www.sbfisica.org.br/v1/olimpiada/' },
      { label: 'IPhO — International Physics Olympiad', href: 'https://www.ipho-new.org/' },
      { label: 'EuPhO — European Physics Olympiad', href: 'https://eupho.ee/' },
      { label: 'OIbF — Olimpíada Ibero-Americana', href: 'https://www.oibf.es/' },
    ],
  },
  {
    cat: 'Exames de Ingresso',
    links: [
      { label: 'ITA — Instituto Tecnológico de Aeronáutica', href: 'http://www.ita.br/' },
      { label: 'IME — Instituto Militar de Engenharia', href: 'https://www.ime.eb.br/' },
    ],
  },
  {
    cat: 'Recursos de Física',
    links: [
      { label: 'PhysicsClassroom', href: 'https://www.physicsclassroom.com/' },
      { label: 'HyperPhysics (Georgia State)', href: 'http://hyperphysics.phy-astr.gsu.edu/' },
      { label: 'MIT OpenCourseWare — Physics', href: 'https://ocw.mit.edu/courses/physics/' },
    ],
  },
]

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-text)', marginBottom: '3rem' }}>
        Links Úteis
      </h1>
      <div className="flex flex-col gap-10">
        {categorias.map(cat => (
          <div key={cat.cat}>
            <h2 style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>{cat.cat}</h2>
            <div className="flex flex-col gap-2">
              {cat.links.map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg transition-all"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)', textDecoration: 'none', fontSize: 15 }}>
                  {l.label}
                  <span style={{ color: 'var(--color-muted)', fontSize: 12 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
