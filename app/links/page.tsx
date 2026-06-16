import type { Metadata } from 'next'
import { ExternalLink, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Links Úteis',
  description: 'Links para olimpíadas de física, física experimental, LaTeX e recomendações do Prof. Dr. Ivan Guilhon.',
}

const WIX = 'https://www.nivelolimpico.com.br/_files/ugd'

const categorias = [
  {
    cat:  'Física Experimental',
    icon: '🔬',
    desc: 'Materiais de apoio para o curso e para provas experimentais de olimpíadas.',
    links: [
      { label: 'Playlist YouTube — Física Experimental', href: 'https://www.youtube.com/playlist?list=PL-LGczTAgjXmHsDISCJ74ke7qVJ0q-YZi', ext: true },
      { label: 'Curso: Introdução à Física Experimental', href: '/cursos/fisica-experimental', ext: false },
      { label: 'Papel Monolog (PDF)', href: `${WIX}/8dc56f_954428f0141b46419c4e2ae973f9918c.pdf`, ext: true, download: true },
      { label: 'Papel Dilog (PDF)',   href: `${WIX}/8dc56f_ea04b161fe374ed68a029eadef320325.pdf`, ext: true, download: true },
      { label: 'Papel Milimetrado (PDF)', href: `${WIX}/8dc56f_fb51f5606afa492d841f8713aafa0e13.pdf`, ext: true, download: true },
    ],
  },
  {
    cat:  'Olimpíadas Científicas',
    icon: '🏆',
    desc: 'Sites oficiais das principais competições de física nacionais e internacionais.',
    links: [
      { label: 'OBF — Olimpíada Brasileira de Física', href: 'https://app.graxaim.org/obf/2024/home', ext: true },
      { label: 'IYPT Brasil',                         href: 'https://iyptbrasil.com/', ext: true },
      { label: 'IPT Brasil',                          href: 'https://brazil.iptnet.info/', ext: true },
      { label: 'IPhO — International Physics Olympiad', href: 'https://www.ipho-new.org/', ext: true },
      { label: 'EuPhO — European Physics Olympiad',   href: 'https://eupho.ee/', ext: true },
      { label: 'OIbF — Olimpíada Ibero-Americana',    href: 'https://www.oibf.es/', ext: true },
      { label: 'Histórias Olímpicas (PDF)',            href: `${WIX}/7b20c6_a7444ea66b7b4b6ea4035c3a0a6e81d6.pdf`, ext: true, download: true },
    ],
  },
  {
    cat:  'LaTeX e Computação',
    icon: '💻',
    desc: 'Recursos para aprender LaTeX e produzir documentos científicos de qualidade.',
    links: [
      { label: 'Playlist YouTube — LaTeX para Todos', href: 'https://www.youtube.com/playlist?list=PL-LGczTAgjXl_YyoMv9LkPL_e016aLG6w', ext: true },
      { label: 'Curso: LaTeX para Todos',             href: '/cursos/latex', ext: false },
      { label: 'Overleaf (editor online gratuito)',   href: 'https://www.overleaf.com', ext: true },
    ],
  },
  {
    cat:  'Amostras dos Livros',
    icon: '📖',
    desc: 'Capítulos gratuitos dos livros do Prof. Ivan Guilhon para avaliar antes de comprar.',
    links: [
      { label: 'Amostra — FNO Volume 1 (PDF)', href: `${WIX}/8dc56f_eaa108d549454fa3915c5cdd5039490f.pdf`, ext: true, download: true },
      { label: 'Amostra — FNO Volume 2 (PDF)', href: `${WIX}/8dc56f_bdfe82b82a1b41d2ba3976d3fd25fadc.pdf`, ext: true, download: true },
      { label: 'Amostra — FNO Volume 3 (PDF)', href: `${WIX}/8dc56f_c4691e103fd140f984772868eb7c662d.pdf`, ext: true, download: true },
      { label: 'Amostra — Estudo Eficaz (PDF)', href: `${WIX}/8dc56f_28b1a723f4f2466e99bd689b8b0420a4.pdf`, ext: true, download: true },
    ],
  },
  {
    cat:  'Recomendações',
    icon: '⭐',
    desc: 'Seleções de livros e materiais recomendados pelo professor.',
    links: [
      { label: 'Lista de Recomendações — Amazon', href: 'https://www.amazon.com.br/shop/prof.ivanguilhon', ext: true },
      { label: 'HyperPhysics (Georgia State)',    href: 'http://hyperphysics.phy-astr.gsu.edu/', ext: true },
      { label: 'MIT OpenCourseWare — Physics',   href: 'https://ocw.mit.edu/courses/physics/', ext: true },
    ],
  },
]

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
        Links Úteis
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 16, marginBottom: '3rem' }}>
        Materiais de apoio, olimpíadas, ferramentas e amostras gratuitas dos livros.
      </p>

      <div className="flex flex-col gap-8">
        {categorias.map(cat => (
          <div key={cat.cat}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-text)' }}>{cat.cat}</h2>
                <p style={{ color: 'var(--color-muted)', fontSize: 13 }}>{cat.desc}</p>
              </div>
            </div>
            {/* Links */}
            <div className="flex flex-col gap-2 pl-9">
              {cat.links.map(link => (
                <a key={link.label} href={link.href}
                  target={link.ext ? '_blank' : undefined}
                  rel={link.ext ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between p-4 rounded-lg transition-all group"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', textDecoration: 'none' }}
>
                  <span style={{ color: 'var(--color-text)', fontSize: 14, fontFamily: 'var(--font-display)' }}>{link.label}</span>
                  {'download' in link && link.download
                    ? <Download size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                    : <ExternalLink size={14} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
                  }
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
