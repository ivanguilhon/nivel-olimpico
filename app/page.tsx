import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import {CtaButton} from '@/components/SalesComponents'
import { IMG } from '@/lib/images'

const features = [
  { icon: '🏆', title: 'Cursos olímpicos',        desc: 'LaTeX, Física Experimental e Física Olímpica. Do zero ao nível internacional.' },
  { icon: '📚', title: 'Livros de referência',     desc: '3 volumes com problemas comentados para OBF, IPhO, ITA e IME.' },
  { icon: '⚛',  title: 'Simulações PhysSim',       desc: '8 simulações interativas: do lançamento oblíquo ao poço quântico.' },
]

const courses = [
  {
    tag: 'MAIS VENDIDO',
    title: 'LaTeX para Todos',
    desc: 'Do zero ao avançado: documentos, equações, apresentações e IA. Acaba com as horas perdidas no Word.',
    benefits: ['8 módulos, zero instalação', 'Módulo exclusivo de IA + LaTeX', 'Acesso por 1 ano + atualizações'],
    price: 'R$ 97',
    from: 'R$ 197',
    href: '/cursos/latex',
    hotmart: 'https://pay.hotmart.com/M89748555U',
    color: 'rgba(228,173,65,0.08)',
    border: 'rgba(228,173,65,0.3)',
  },
  {
    tag: 'PARA OLIMPÍADAS',
    title: 'Física Experimental',
    desc: 'Medidas, erros, propagação de incertezas, gráficos e ajustes. O conteúdo que elimina candidatos na Fase 3.',
    benefits: ['Cobre OBF, IPhO, OIbF, EuPhO', 'Sem laboratório necessário', 'Professor com experiência em olimpíadas'],
    price: 'R$ 97',
    from: 'R$ 147',
    href: '/cursos/fisica-experimental',
    hotmart: 'https://pay.hotmart.com/I79968093W',
    color: 'rgba(228,173,65,0.04)',
    border: 'var(--color-border)',
  },
]

const stats = [
  { n: '20+', label: 'premiações olímpicas' },
  { n: '4',   label: 'livros publicados' },
  { n: '8',   label: 'simulações interativas' },
  { n: '2',   label: 'cursos online com acesso por 1 ano' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{...({ background: 'linear-gradient(135deg, #000 0%, #0a0a00 60%, #111100 100%)', position: 'relative', overflow: 'hidden', '--color-text': '#F0EDE8', '--color-muted': '#9A9A9A' } as React.CSSProperties)}}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, border: '1px solid rgba(228,173,65,0.1)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '5%',  right: '8%',  width: 380, height: 380, border: '1px solid rgba(228,173,65,0.06)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 400, height: 400, border: '1px solid rgba(228,173,65,0.05)', borderRadius: '50%' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24 relative">
          <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
            Prof. Dr. Ivan Guilhon
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700,
            color: 'var(--color-text)', lineHeight: 1.08, maxWidth: 700, marginBottom: '1.25rem' }}>
            Física em<br />
            <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Nível Olímpico</em>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 18, maxWidth: 500, lineHeight: 1.7, marginBottom: '2rem' }}>
            Preparação completa para OBF, IPhO, ITA e IME — com cursos, livros e simulações.
          </p>
          <div className="flex flex-wrap gap-4">
            <CtaButton href="/cursos/latex">Ver cursos →</CtaButton>
            <Link href="/simulacoes"
              className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              Simulações grátis
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ n, label }) => (
            <div key={n} className="text-center">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--color-gold)' }}>{n}</p>
              <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.4 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURSOS EM DESTAQUE ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--color-text)' }}>
            Cursos
          </h2>
          <Link href="/cursos/latex" style={{ color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-display)' }}>
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(c => (
            <div key={c.title} className="p-8 rounded-2xl flex flex-col"
              style={{ background: c.color, border: `1px solid ${c.border}` }}>
              <div className="flex items-center justify-between mb-4">
                <span style={{ background: 'rgba(228,173,65,0.15)', border: '1px solid rgba(228,173,65,0.3)', borderRadius: 20,
                  padding: '3px 12px', fontSize: 10, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}>
                  {c.tag}
                </span>
                <div className="text-right">
                  <p style={{ color: 'var(--color-muted)', fontSize: 12, textDecoration: 'line-through' }}>{c.from}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>{c.price}</p>
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>{c.desc}</p>
              <ul style={{ marginBottom: '1.5rem' }}>
                {c.benefits.map(b => (
                  <li key={b} className="flex items-center gap-2 mb-1">
                    <Check size={13} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-muted)', fontSize: 13 }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <a href={c.hotmart} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 22px', borderRadius: 8,
                    background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                    textDecoration: 'none', boxShadow: '0 2px 12px rgba(228,173,65,0.2)' }}>
                  Comprar agora
                </a>
                <Link href={c.href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 18px', borderRadius: 8,
                    border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 14,
                    textDecoration: 'none' }}>
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: '3rem' }}>
            Tudo que você precisa em um lugar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 28, marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVROS ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--color-text)' }}>
            Livros
          </h2>
          <Link href="/livros" style={{ color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-display)' }}>Ver todos →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { img: IMG.fnoVol2, subtitle: 'Volumes I, II e III', title: 'Física em Nível Olímpico', desc: 'Vasta coletânea de problemas para OBF, OIbF, EuPhO e IPhO — com dicas e soluções detalhadas.', links: [{l:'Ver livros', h:'/livros'},{l:'Livro Físico',h:'https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon'}] },
            { img: IMG.estudoEficaz, subtitle: 'Inteligência, Virtudes e Provas', title: 'Estudo Eficaz', desc: 'Como desenvolver inteligência, cultivar virtudes e ter alto desempenho em provas e exames.', links: [{l:'Ebook',h:'https://pay.hotmart.com/X72216388W'},{l:'Livro Físico',h:'https://vestseller.com.br/estudo%20eficaz'}] },
          ].map(book => (
            <div key={book.title} className="rounded-2xl overflow-hidden flex flex-col sm:flex-row" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: 160, flexShrink: 0, background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <img src={book.img} alt={book.title} style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'contain' }} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p style={{ color: 'var(--color-gold)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{book.subtitle}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{book.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>{book.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {book.links.map(lk => (
                    <a key={lk.l} href={lk.h} target={lk.h.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: '1px solid var(--color-gold)', color: 'var(--color-gold)', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>
                      {lk.l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── SOBRE O PROFESSOR ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Photo */}
            <div className="flex-shrink-0 relative">
              <div style={{ width: 320, height: 400, borderRadius: 16, overflow: 'hidden',
                border: '2px solid var(--color-border)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
                <img src={IMG.ivanMedalha} alt="Prof. Dr. Ivan Guilhon"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%' }} />
              </div>
              {/* Medal badge */}
              <div style={{ position: 'absolute', bottom: -16, right: -16, background: 'var(--color-gold)',
                borderRadius: 12, padding: '10px 16px', boxShadow: '0 8px 24px rgba(228,173,65,0.4)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#000', letterSpacing: '0.05em' }}>
                  🥈 IPhO · 🥇 OBF
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'var(--font-display)', marginBottom: 12 }}>
                Quem é o professor
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700,
                color: 'var(--color-text)', lineHeight: 1.15, marginBottom: 20 }}>
                Prof. Dr. Ivan Guilhon
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                Engenheiro Eletrônico pelo ITA (<em>Magna Cum Laude</em>, 2014) e Doutor em Física Atômica e Molecular
                pelo ITA (2017, aos 25 anos). Professor no Departamento de Física do ITA e coordenador do IYPT Brasil.
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                Aprovado em 1º lugar no concurso para professor do ITA aos 26 anos. Autor de 4 livros e 15 artigos
                científicos internacionais. Como estudante, conquistou medalha de Prata na IPhO e Ouro na OBF.
              </p>

              {/* Credentials grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { n: '🥈', label: 'Prata IPhO' },
                  { n: '🥇', label: 'Ouro OBF' },
                  { n: '4',  label: 'Livros publicados' },
                  { n: '15', label: 'Artigos internacionais' },
                ].map(({ n, label }) => (
                  <div key={label} className="text-center p-3 rounded-lg"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-gold)' }}>{n}</p>
                    <p style={{ color: 'var(--color-muted)', fontSize: 12, lineHeight: 1.4 }}>{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://www.instagram.com/prof.ivanguilhon/" target="_blank" rel="noopener noreferrer"
                  style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--color-border)',
                    color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 14, textDecoration: 'none' }}>
                  Instagram
                </a>
                <a href="https://wa.me/5512988616486" target="_blank" rel="noopener noreferrer"
                  style={{ padding: '10px 20px', borderRadius: 8, background: 'var(--color-gold)',
                    color: '#000', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>
            Pronto para subir de nível?
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Escolha o curso que faz mais sentido para o seu objetivo agora.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton href="/cursos/latex">LaTeX para Todos →</CtaButton>
            <CtaButton href="/cursos/fisica-experimental">Física Experimental →</CtaButton>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginTop: 16 }}>
            Ambos com garantia de 7 dias · Acesso vitalício · 12x sem juros
          </p>
        </div>
      </section>
    </>
  )
}
