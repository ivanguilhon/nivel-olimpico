import type { Metadata } from 'next'
import { Check, ArrowRight } from 'lucide-react'
import {CtaButton, GuaranteeBadge, Testimonial, Module, FaqItem, Instructor} from '@/components/SalesComponents'
import { IMG } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Física Experimental — Domine a prova experimental das olimpíadas',
  description: 'Curso Introdução à Física Experimental: medidas, erros, estatística, gráficos e ajustes. Para OBF, IPhO, OIbF, EuPhO. Prof. Dr. Ivan Guilhon.',
}

const HOTMART = 'https://pay.hotmart.com/I79968093W'

const modules = [
  { num: 'I',   icon: '🔬', title: 'Fundamentos da Física Experimental', items: ['O que é o Método Científico', 'O papel do experimento na Física', 'Diferença entre teoria e modelo físico', 'Como montar um protocolo experimental'] },
  { num: 'II',  icon: '📏', title: 'Medidas Físicas',                    items: ['Tipos de erros: sistemático e aleatório', 'Algarismos significativos e notação científica', 'Instrumentos: régua, paquímetro, cronômetro, balança', 'Como reportar uma medida corretamente: x ± Δx'] },
  { num: 'III', icon: '📊', title: 'Análise Estatística',                items: ['Média e dispersão de medidas repetidas', 'Desvio padrão e desvio padrão da média', 'Propagação de incertezas (fórmulas gerais)', 'Aplicações práticas com calculadora'] },
  { num: 'IV',  icon: '📈', title: 'Gráficos e Ajustes',                 items: ['Como montar um bom gráfico científico', 'Ajuste linear por mínimos quadrados', 'Linearização de funções não-lineares', 'Escalas log e log-log — quando e como usar'] },
  { num: 'V',   icon: '🏆', title: 'Considerações Finais',               items: ['Erros mais comuns em provas experimentais', 'Como redigir um relatório científico completo', 'Estratégia para a prova da OBF e IPhO', 'Materiais de referência e próximos passos'] },
]

const testimonials = [
  { name: 'Carlos Eduardo',   role: 'Fisicadu',                  text: 'O curso é bem completo, com assuntos que eu inclusive não cheguei a ver no meu curso de graduação. Ótima didática, com muitos exemplos e exercícios. Fiquei fã do curso!' },
  { name: 'Felipe Brandão',   role: 'Estudante — IPhO 24 & 25', text: 'Agradeço por ter tido treinamento experimental com o prof. Ivan. Suas aulas me ajudaram muito na conquista da medalha de prata na IPhO.' },
  { name: 'Heitor Marques',   role: 'Estudante',                 text: 'O Curso de Introdução à Física Experimental me ajudou muito a desenvolver de forma eficaz meus conhecimentos de física, permitindo que eu realizasse provas como a OBF com um nível de preparação muito superior. A didática foi o que me deixou mais impressionado, um conteúdo difícil, porém muito bem explicado.' },
]

const faqs = [
  { q: 'Preciso de laboratório para fazer o curso?',   a: 'Não. O curso ensina os conceitos e métodos com materiais de baixo custo disponíveis em casa. As atividades práticas são pensadas para o ambiente doméstico.' },
  { q: 'Serve para qual fase da OBF?',                 a: 'Principalmente para a Fase 3 da OBF, que tem prova experimental, e para as olimpíadas internacionais (IPhO, OIbF, EuPhO) que sempre incluem prova experimental.' },
  { q: 'Precisa de conhecimento prévio de física?',    a: 'Conhecimento básico de física do ensino médio é suficiente. O foco do curso é o método experimental, não a teoria dos fenômenos.' },
  { q: 'Quanto tempo tenho acesso?',                   a: 'Acesso vitalício. Você pode revisitar o conteúdo antes de cada competição e recebe todas as atualizações sem custo adicional.' },
  { q: 'Posso parcelar?',                              a: 'Sim, em até 12x sem juros no cartão, via Hotmart.' },
  { q: 'Tem garantia?',                                a: 'Sim. 7 dias de garantia incondicional. Se não estiver satisfeito, devolvemos 100% do valor sem perguntas.' },
]

export default function FisicaExperimentalPage() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* ── HERO ── */}
      <section style={{...({ background: 'linear-gradient(160deg, #000 0%, #001000 60%, #001a0d 100%)', borderBottom: '1px solid var(--color-nav-border)', position: 'relative', overflow: 'hidden', '--color-text': '#F0EDE8', '--color-muted': '#9A9A9A' } as React.CSSProperties)}}>
        <div style={{ position: 'absolute', top: '-40%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(228,173,65,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center" style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', background: 'rgba(228,173,65,0.12)', border: '1px solid rgba(228,173,65,0.3)', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            OBF · IPhO · OIbF · EuPhO
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: 20 }}>
            A prova experimental elimina.<br />
            <span style={{ color: 'var(--color-gold)' }}>Aprenda a dominar antes dos outros.</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 32px' }}>
            Medidas, erros, propagação de incertezas, gráficos e ajustes lineares — os tópicos que as escolas ignoram e as olimpíadas cobram na prova final.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton href={HOTMART}>Quero dominar a prova experimental →</CtaButton>
            <a href="#curriculo" style={{ color: 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)' }}>Ver os 5 módulos</a>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginTop: 16 }}>
            ✓ 5 módulos práticos &nbsp;·&nbsp; ✓ Sem laboratório &nbsp;·&nbsp; ✓ Garantia de 7 dias
          </p>
          <div className="mt-10 flex justify-center">
            <img src={IMG.cife} alt="Física Experimental — gráfico com ajuste linear"
              style={{ maxWidth: 440, width: '100%', borderRadius: 12, border: '1px solid var(--color-border)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </section>

      {/* ── O PROBLEMA REAL ── */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>
          O que ninguém te conta sobre a Fase 3 da OBF
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
          Candidatos que chegam à fase experimental geralmente dominam teoria. A diferença entre medalha e eliminação está na análise de dados.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { stat: '~70%', label: 'dos candidatos chegam à fase experimental sem nunca ter feito propagação de incertezas formalmente' },
            { stat: '3ª fase', label: 'da OBF inclui prova experimental obrigatória — e o mesmo vale para IPhO, OIbF e EuPhO' },
            { stat: '0 aulas', label: 'de física experimental a maioria dos alunos recebe no ensino médio e em cursinhos' },
          ].map(({ stat, label }) => (
            <div key={stat} className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 8 }}>{stat}</p>
              <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRANSFORMAÇÃO ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>
            Do "achismo" ao rigor científico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: 'rgba(220,50,50,0.06)', border: '1px solid rgba(220,50,50,0.2)' }}>
              <p style={{ color: '#ff6b6b', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16 }}>Sem o curso</p>
              {['Reportar medidas sem incerteza', 'Errar propagação de incerteza e perder pontos críticos', 'Gráficos sem escalas corretas ou ajuste adequado', 'Não saber linearizar relações não-lineares', 'Perder a fase experimental por falta de método'].map(i => (
                <p key={i} className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-muted)', fontSize: 14 }}><span style={{ color: '#ff6b6b' }}>✗</span> {i}</p>
              ))}
            </div>
            <div className="p-6 rounded-xl" style={{ background: 'rgba(228,173,65,0.06)', border: '1px solid rgba(228,173,65,0.2)' }}>
              <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16 }}>Com o curso</p>
              {['Medir e reportar qualquer grandeza com rigor científico', 'Propagar incertezas usando as fórmulas corretas', 'Construir gráficos que impressionam bancas e juízes', 'Linearizar qualquer lei física e fazer ajuste linear', 'Chegar na fase experimental com vantagem real'].map(i => (
                <p key={i} className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-muted)', fontSize: 14 }}><Check size={13} style={{ color: 'var(--color-gold)', flexShrink: 0 }} /> {i}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRÍCULO ── */}
      <section id="curriculo" className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
            5 módulos, do método ao domínio
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>O conteúdo exato cobrado pelas principais olimpíadas nacionais e internacionais.</p>
        </div>
        <div className="flex flex-col gap-4">
          {modules.map(m => <Module key={m.num} {...m} />)}
        </div>

        {/* Competition badges */}
        <div className="mt-10 p-6 rounded-xl text-center" style={{ background: 'var(--color-surface)', border: '1px solid rgba(228,173,65,0.2)' }}>
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 12 }}>
            Este curso cobre o conteúdo experimental de:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['OBF — Fase 3', 'OBFEP', 'IPhO', 'OIbF', 'EuPhO'].map(c => (
              <span key={c} style={{ background: 'rgba(228,173,65,0.1)', border: '1px solid rgba(228,173,65,0.25)', borderRadius: 20, padding: '4px 14px', fontSize: 13, color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>{c}</span>
            ))}
          </div>
        </div>
        <div className="text-center mt-10">
          <CtaButton href={HOTMART}>Quero esse diferencial →</CtaButton>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>O que esperar do curso?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => <Testimonial key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── PROFESSOR ── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <Instructor />
      </section>

      {/* ── CTA PRICING ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
            Invista no diferencial que elimina os outros
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16, marginBottom: 32 }}>Acesso imediato. Estude antes da próxima fase.</p>
          <div className="p-8 rounded-2xl mb-8" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <p style={{ color: 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)', marginBottom: 6 }}>Introdução à Física Experimental</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--color-muted)', textDecoration: 'line-through', marginBottom: 4 }}>De R$ 247</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>R$ 127</p>
            <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: 28 }}>em até 12x via Hotmart</p>
            <CtaButton href={HOTMART}>Garantir minha vaga →</CtaButton>
            <div className="mt-6">
              {['5 módulos com aulas detalhadas', 'Exercícios de tratamento de dados', 'Atividades com materiais de baixo custo', 'Professor com experiência em olimpíadas', 'Acesso vitalício + atualizações'].map(b => (
                <p key={b} className="flex items-center justify-center gap-2 mb-2" style={{ color: 'var(--color-muted)', fontSize: 14 }}>
                  <Check size={13} style={{ color: 'var(--color-gold)' }} /> {b}
                </p>
              ))}
            </div>
          </div>
          <GuaranteeBadge />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>Perguntas frequentes</h2>
        {faqs.map(f => <FaqItem key={f.q} {...f} />)}
        <div className="text-center mt-12">
          <p style={{ color: 'var(--color-muted)', marginBottom: 16 }}>Ainda tem dúvidas?</p>
          <a href="https://wa.me/5512988616486" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            Falar com o professor <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  )
}
