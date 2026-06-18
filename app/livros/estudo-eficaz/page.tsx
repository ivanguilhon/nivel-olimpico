import type { Metadata } from 'next'
import { FileText, Check } from 'lucide-react'
import {CtaButton, GuaranteeBadge, Stars, Instructor} from '@/components/SalesComponents'
import { IMG } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Estudo Eficaz — Inteligência, Virtudes e Provas',
  description: 'O livro que todo estudante deveria ler. Desenvolvimento da inteligência, formação de virtudes e alto desempenho em provas. Prof. Dr. Ivan Guilhon. 140 páginas.',
}

const WIX = 'https://www.nivelolimpico.com.br/_files/ugd'
const EBOOK  = 'https://pay.hotmart.com/X72216388W'
const FISICO = 'https://vestseller.com.br/estudo%20eficaz%20-%20intelig%C3%AAncia,%20virtudes%20e%20provas%20-%20prof.%20dr.%20ivan%20guilhon%20mitoso%20rocha%20/1441.html'
const SAMPLE = `${WIX}/8dc56f_28b1a723f4f2466e99bd689b8b0420a4.pdf`

const testimonials = [
  {
    name: 'Nicholas Yukio',
    role: 'Professor do canal Domínio Elétrico',
    text: 'Muito do que acredito sobre como um estudante deve conduzir sua vida está de acordo com o que ele escreve. O livro reúne orientações práticas e bem fundamentadas. Muito do que você precisa para estudar não é ser um gênio, mas ter comprometimento, cuidar do sono, manter uma rotina saudável e criar bons hábitos de estudo.',
  },
  {
    name: 'Matheus Portella',
    role: 'Estudante',
    text: 'Fiz a compra há algum tempo e li de forma extremamente rápida. Um livro boníssimo, de linguagem simples, mas ainda sim polida; conteúdo excelente e trazido de forma leve. Extremamente ELEGANTE. Valeu muito o investimento e levarei comigo essa aprendizagem!',
  },
  {
    name: 'João Carlos',
    role: 'Estudante',
    text: 'Transformador. Fez eu ter uma visão da importância dos estudos como algo que dignifica o homem e não apenas como uma ferramenta para conseguir uma vaga em uma universidade.',
  },
  {
    name: 'Alícia',
    role: 'Estudante',
    text: 'Gostaria que todo estudante com sede de conhecimento tivesse a oportunidade de ler essa obra tão rica. Mais do que apenas dicas de estudo, o professor Ivan mostra a importância de uma boa formação acadêmica para a construção do indivíduo. Falta elogios para caracterizar o conhecimento contido nesse livro — é uma obra completa.',
  },
  {
    name: 'Victor',
    role: 'Estudante',
    text: 'Simplesmente um livro divisor de águas em minha vida. Sempre tive muitas dificuldades com estudar em si — após esse livro me vejo muito mais claro com a minha relação com os estudos.',
  },
  {
    name: 'Artur Henrique',
    role: 'Estudante',
    text: 'Muito bom! Ele mudou minha perspectiva com o estudo no seu fundamento. Comprei a versão PDF pra ficar relendo. É um livro que ajudou a clarear minha mente. Muito obrigado professor.',
  },
]

const topics = [
  'Como se tornar mais inteligente e melhorar a memória',
  'Como melhorar a concentração e o foco',
  'Como montar um cronograma de estudos eficaz',
  'Como lidar com provas e controlar a ansiedade',
  'Formação de virtudes e disciplina',
  'Para que serve o estudo — além das notas',
  'O que ser um bom estudante agrega como ser humano',
  'Hábitos de sono, rotina e saúde intelectual',
]

export default function EstudoEficazPage() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* ── HERO ── */}
      <section style={{...({ background: 'linear-gradient(160deg, #000 0%, #060606 60%, #0a0a0a 100%)', borderBottom: '1px solid var(--color-nav-border)', position: 'relative', overflow: 'hidden', '--color-text': '#F0EDE8', '--color-muted': '#9A9A9A' } as React.CSSProperties)}}>
        <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(228,173,65,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-6xl mx-auto px-4 py-20 relative">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Book */}
            <div className="flex-shrink-0 order-2 lg:order-1">
              <img src={IMG.estudoEficaz} alt="Estudo Eficaz — Inteligência, Virtudes e Provas"
                style={{ height: 300, objectFit: 'contain', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.7))' }} />
            </div>
            {/* Text */}
            <div className="flex-1 order-1 lg:order-2">
              <span style={{ display: 'inline-block', background: 'rgba(228,173,65,0.12)', border: '1px solid rgba(228,173,65,0.3)', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                140 páginas · Livro físico e ebook
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: 12 }}>
                Estudo Eficaz
              </h1>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-gold)', marginBottom: 20, fontStyle: 'italic' }}>
                Inteligência, Virtudes e Provas
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
                O livro que vai mudar sua relação com os estudos — não apenas como ferramenta para passar em provas, mas como caminho de desenvolvimento humano.
              </p>
              <div className="flex flex-wrap gap-4">
                <CtaButton href={EBOOK}>Comprar Ebook →</CtaButton>
                <a href={FISICO} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '15px 24px', borderRadius: 8, border: '1px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 15, textDecoration: 'none' }}>
                  Livro Físico
                </a>
                <a href={SAMPLE} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '15px 24px', borderRadius: 8, border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 15, textDecoration: 'none' }}>
                  <FileText size={15} /> Amostra grátis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── O LIVRO ── */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
              Sobre o livro
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Muitos estudantes não têm orientação adequada sobre como estudar, como se concentrar, como fazer um cronograma, como lidar com uma prova.
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Com anos de experiência com alunos de perfis diversos — de estudantes em vulnerabilidade social até participantes de competições científicas internacionais — o Prof. Ivan traz nesse livro lições de como tornar a atividade de estudos mais eficaz.
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.8 }}>
              A obra pode ser aproveitada por alunos e professores, de estudantes mais jovens até adultos que desejem cultivar uma vida intelectual.
            </p>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.25rem' }}>
              O que você vai encontrar
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {topics.map(t => (
                <li key={t} className="flex items-start gap-3 mb-3">
                  <Check size={14} style={{ color: 'var(--color-gold)', marginTop: 3, flexShrink: 0 }} />
                  <span style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-text)', marginBottom: 32 }}>Para quem é este livro?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { who: 'Estudantes do ensino médio', why: 'Desenvolver hábitos de estudo desde cedo e se preparar para vestibulares e olimpíadas.' },
              { who: 'Candidatos ITA e IME', why: 'Criar a disciplina e o método que as provas mais difíceis do Brasil exigem.' },
              { who: 'Universitários', why: 'Repensar a relação com o estudo e aumentar a eficiência nas disciplinas da graduação.' },
              { who: 'Professores', why: 'Entender como orientar melhor os alunos no processo de aprendizado e formação.' },
              { who: 'Pais e responsáveis', why: 'Compreender o que realmente faz diferença na vida acadêmica dos filhos.' },
              { who: 'Qualquer pessoa', why: 'Que queira cultivar uma vida intelectual mais rica e significativa.' },
            ].map(({ who, why }) => (
              <div key={who} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <Check size={14} style={{ color: 'var(--color-gold)', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 14 }}>{who}</p>
                  <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.5 }}>{why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>
          Transformando vidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <Stars />
              <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.7, margin: '12px 0', fontStyle: 'italic' }}>"{t.text}"</p>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', fontSize: 13 }}>{t.name}</p>
                <p style={{ color: 'var(--color-gold)', fontSize: 12 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROFESSOR ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Instructor />
        </div>
      </section>

      {/* ── CTA PRICING ── */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
          Invista na sua formação
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 32 }}>
          140 páginas que podem mudar sua relação com o estudo — para sempre.
        </p>
        <div className="p-8 rounded-2xl mb-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--color-muted)', marginBottom: 24 }}>Estudo Eficaz — Inteligência, Virtudes e Provas</p>
          <div className="flex justify-center gap-6 mb-8">
            <div>
              <p style={{ color: 'var(--color-muted)', fontSize: 12, marginBottom: 4, fontFamily: 'var(--font-display)' }}>Ebook</p>
              <CtaButton href={EBOOK}>Comprar Ebook</CtaButton>
            </div>
            <div>
              <p style={{ color: 'var(--color-muted)', fontSize: 12, marginBottom: 4, fontFamily: 'var(--font-display)' }}>Livro Físico</p>
              <a href={FISICO} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 24px', borderRadius: 8, border: '1px solid var(--color-gold)', color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Comprar Físico
              </a>
            </div>
          </div>
          <a href={SAMPLE} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
            <FileText size={14} /> Baixar amostra grátis (PDF)
          </a>
        </div>
        <GuaranteeBadge />
      </section>

    </div>
  )
}
