import type { Metadata } from 'next'
import { Check, FileText, ArrowRight } from 'lucide-react'
import {CtaButton, GuaranteeBadge, Stars, Instructor} from '@/components/SalesComponents'
import { IMG } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Física em Nível Olímpico — Coleção completa OBF, IPhO, ITA e IME',
  description: 'Coleção de 3 volumes com problemas comentados para olimpíadas de Física. OBF, IPhO, OIbF, EuPhO. Com dicas e soluções. Prof. Dr. Ivan Guilhon.',
}

const WIX = 'https://www.nivelolimpico.com.br/_files/ugd'

const volumes = [
  {
    num:    'Volume I',
    img:    IMG.fnoVol1,
    tag:    'Mecânica · Termologia · Óptica · Ondulatória',
    pages:  327,
    desc:   '85 desafios de Física para OBF, OBFEP, SOIF, TBF, OIbF e IPhO. Todos com dicas e soluções completas.',
    topics: ['Cinemática e Dinâmica da partícula', 'Termologia e Gases ideais', 'Termodinâmica e Teoria cinética', 'Óptica geométrica e física', 'Ondulatória'],
    sample: `${WIX}/8dc56f_eaa108d549454fa3915c5cdd5039490f.pdf`,
    ebook:  'https://pay.hotmart.com/L94437942W',
    fisico: 'https://vestseller.com.br/fisica-em-nivel-olimpico-volume-1-ivan-guilhon.html',
  },
  {
    num:    'Volume II',
    img:    IMG.fnoVol2,
    tag:    'Eletromagnetismo · Relatividade · Física Quântica',
    pages:  351,
    desc:   'Continuação da coleção com foco em eletromagnetismo e física moderna. Nível de dificuldade indicado em cada problema.',
    topics: ['Mecânica do corpo rígido', 'Eletrostática e Eletrodinâmica', 'Magnetismo e Indução', 'Relatividade restrita', 'Física Quântica'],
    sample: `${WIX}/8dc56f_bdfe82b82a1b41d2ba3976d3fd25fadc.pdf`,
    ebook:  'https://pay.hotmart.com/V94457853L',
    fisico: 'https://vestseller.com.br/fisica-em-nivel-olimpico-volume-ll-ivan-guilhon-mitoso-rocha-1374.html',
  },
  {
    num:    'Volume III',
    img:    IMG.fnoVol3,
    tag:    'Física Experimental · co-autoria Prof. Dr. Gustavo Melo',
    pages:  260,
    desc:   'Física experimental para olimpíadas: medidas, incertezas, análise de dados e mais de 30 experimentos propostos com materiais de baixo custo.',
    topics: ['Incertezas e erros de medida', 'Análise estatística de dados', 'Construção e linearização de gráficos', 'Regressão com calculadora científica', 'Mais de 30 experimentos (formato OBF/IPhO)'],
    sample: `${WIX}/8dc56f_c4691e103fd140f984772868eb7c662d.pdf`,
    ebook:  'https://pay.hotmart.com/G101483968F?sck=HOTMART_PRODUCT_PAGE&hotfeature=32&_gl=1*khryx4*_gcl_au*MTU2MzY0OTg4MS4xNzc0NTU2MTYx*_ga*MTA1NzcyNDM1Ni4xNzU2NzI3MDkx*_ga_2J9NLPEWPF*czE3ODE4MDI3MjIkbzY4JGcxJHQxNzgxODAyNzI2JGo1NiRsMCRoMA..&bid=1781802732137',
    fisico: 'https://vestseller.com.br/catalogsearch/result/?q=fisica+em+nivel+olimpico+volume+3',
    coauthor: true,
  },
]

const testimonials = [
  {
    name: 'Matheus Borges',
    role: 'Medalha de prata na IPhO · Aluno do ITA',
    text: 'Os dois Física em Nível Olímpico foram partes importantes na minha trajetória até o prata na IPhO. É uma ótima coletânea de problemas que passa pelos conteúdos de forma excepcional. Os problemas são muito bem escolhidos — ainda consigo lembrar o tanto de energia que gastei para entender alguns problemas de relatividade, mas valeu bastante a pena no fim.',
  },
  {
    name: 'Luigi Dantas',
    role: 'Estudante',
    text: 'No ramo das olimpíadas de física, é difícil encontrar materiais de qualidade em português, ainda mais trazendo questões de alto nível com soluções e dicas. É aquele tipo de material indispensável que faz a maior diferença na preparação. Não existe livro como esse no ramo de física olímpica atualmente.',
  },
  {
    name: 'Carlos Eduardo (Fisicadu)',
    role: 'Professor de Física — 14 anos de experiência em olimpíadas',
    text: 'Mesmo já tendo experiência com a área, o livro do Ivan ainda traz situações surpreendentes e ideias que facilitam a forma de eu passar os ensinamentos para meus alunos. Recomendo fortemente aos alunos de olimpíadas.',
  },
  {
    name: 'Caio Cardoso',
    role: 'Estudante',
    text: 'O contato com seu livro tem sido uma prática excelente de exercícios pesados. Abriu meu horizonte para resolver questões e utilização de alguns métodos. Tenho grande admiração e inspiração pelo senhor — também gostaria de fazer pós-graduação no ramo da física pelo próprio ITA.',
  },
  {
    name: 'José Pedro',
    role: 'Estudante — 1º ano do Ensino Médio',
    text: 'Estou no primeiro ano do ensino médio e utilizo seu livro como auxílio na minha preparação para as seletivas das olimpíadas internacionais de física. O livro se trata de um compilado de questões clássicas — um bom livro para ter ideias de resolução de questões.',
  },
]

export default function FNOPage() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* ── HERO ── */}
      <section style={{...({ background: 'linear-gradient(160deg, #000 0%, #0a0800 60%, #120f00 100%)', borderBottom: '1px solid var(--color-nav-border)', position: 'relative', overflow: 'hidden', '--color-text': '#F0EDE8', '--color-muted': '#9A9A9A' } as React.CSSProperties)}}>
        <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(228,173,65,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-6xl mx-auto px-4 py-20 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1">
              <span style={{ display: 'inline-block', background: 'rgba(228,173,65,0.12)', border: '1px solid rgba(228,173,65,0.3)', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Coleção · 3 Volumes
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: 20 }}>
                Física em<br />
                <em style={{ color: 'var(--color-gold)' }}>Nível Olímpico</em>
              </h1>
              <p style={{ color: 'var(--color-muted)', fontSize: 17, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
                A coleção de referência para olimpíadas de física em português. Centenas de problemas comentados — do nível OBF à IPhO — com dicas e soluções completas.
              </p>
              <div className="flex flex-wrap gap-4">
                <CtaButton href="https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon">Comprar livros físicos →</CtaButton>
                <a href="#volumes" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '15px 24px', borderRadius: 8, border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 15, textDecoration: 'none' }}>
                  Ver os 3 volumes
                </a>
              </div>
              <p style={{ color: 'var(--color-muted)', fontSize: 13, marginTop: 16 }}>
                ✓ OBF · IPhO · OIbF · EuPhO · ITA · IME &nbsp;·&nbsp; ✓ Amostras gratuitas em PDF
              </p>
            </div>
            {/* Books visual */}
            <div className="flex gap-4 items-end flex-shrink-0">
              <img src={IMG.fnoVol2} alt="FNO Vol II"
                style={{ height: 260, objectFit: 'contain', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.7))', transform: 'rotate(-3deg)' }} />
              <img src={IMG.fnoVol3} alt="FNO Vol III"
                style={{ height: 280, objectFit: 'contain', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.7))', transform: 'rotate(2deg)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🥇', label: 'OBF — todas as fases' },
              { icon: '🌍', label: 'IPhO · OIbF · EuPhO' },
              { icon: '🎓', label: 'ITA · IME' },
              { icon: '📐', label: 'Universitários de Física e Engenharia' },
            ].map(({ icon, label }) => (
              <div key={label} className="p-4 rounded-xl" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOLUMES ── */}
      <section id="volumes" className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--color-text)', marginBottom: '3rem' }}>
          Os 3 volumes da coleção
        </h2>
        <div className="flex flex-col gap-8">
          {volumes.map(vol => (
            <div key={vol.num} className="rounded-2xl overflow-hidden flex flex-col md:flex-row"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {/* Cover */}
              <div style={{ width: 180, flexShrink: 0, background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28, minHeight: 200 }}>
                <img src={vol.img} alt={`FNO ${vol.num}`}
                  style={{ maxWidth: '100%', maxHeight: 220, objectFit: 'contain', filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.6))' }} />
              </div>
              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <p style={{ color: 'var(--color-gold)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 3 }}>{vol.tag}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>
                      Física em Nível Olímpico — {vol.num}
                    </h3>
                    {vol.coauthor && <p style={{ color: 'var(--color-muted)', fontSize: 12, marginTop: 2 }}>co-autoria: Prof. Dr. Gustavo Antônio Ferreira de Melo</p>}
                  </div>
                  <span style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '4px 10px', fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
                    {vol.pages} páginas
                  </span>
                </div>
                <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{vol.desc}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5">
                  {vol.topics.map(t => (
                    <span key={t} className="flex items-center gap-1" style={{ color: 'var(--color-muted)', fontSize: 13 }}>
                      <Check size={11} style={{ color: 'var(--color-gold)', flexShrink: 0 }} /> {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a href={vol.sample} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    style={{ padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: '1px solid var(--color-border)', color: 'var(--color-muted)', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>
                    <FileText size={13} /> Amostra grátis (PDF)
                  </a>
                  <a href={vol.ebook} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: '1px solid var(--color-gold)', color: 'var(--color-gold)', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>
                    Ebook
                  </a>
                  <a href={vol.fisico} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, background: 'var(--color-gold)', color: '#000', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>
                    Livro Físico
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>
            O que dizem quem já usou
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="p-6 rounded-xl" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <Stars />
                <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.7, margin: '12px 0', fontStyle: 'italic' }}>"{t.text}"</p>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', fontSize: 14 }}>{t.name}</p>
                  <p style={{ color: 'var(--color-gold)', fontSize: 12 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR ── */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <Instructor />
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>
            Comece pelo volume que faz mais sentido para você
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 32 }}>
            Baixe a amostra gratuita de qualquer volume antes de comprar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton href="https://vestseller.com.br/catalogsearch/result/?q=ivan+guilhon">
              Comprar livros físicos →
            </CtaButton>
            <a href="https://www.amazon.com.br/shop/prof.ivanguilhon" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '15px 24px', borderRadius: 8, border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 15, textDecoration: 'none' }}>
              Ver na Amazon <ArrowRight size={15} />
            </a>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginTop: 16 }}>
            Aceitamos BTC, ETH e SOL · Também disponível na Amazon
          </p>
        </div>
      </section>

    </div>
  )
}
