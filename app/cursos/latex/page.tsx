import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { CtaButton, GuaranteeBadge, Testimonial, Module, FaqItem, Instructor } from '@/components/SalesComponents'

export const metadata: Metadata = {
  title: 'LaTeX para Todos — Domine a escrita acadêmica e profissional',
  description: 'Aprenda LaTeX do zero: documentos, equações, apresentações e IA. 8 módulos, acesso vitalício. Por Prof. Dr. Ivan Guilhon.',
}

const HOTMART = 'https://pay.hotmart.com/M89748555U'

const modules = [
  { num: 'I',    icon: '⚙️', title: 'Introdução ao LaTeX',             items: ['O que é LaTeX e por que usar', 'Overleaf: escreva sem instalar nada', 'Estrutura básica de um documento', 'Seu primeiro arquivo .tex funcionando'] },
  { num: 'II',   icon: '📝', title: 'Edição de Textos',                items: ['Formatação e estrutura de parágrafos', 'Listas, itens e numeração', 'Títulos, seções e sumário automático', 'Cabeçalhos, rodapés e layout de página'] },
  { num: 'III',  icon: '📊', title: 'Figuras e Tabelas',               items: ['Inserção e posicionamento de imagens', 'Tabelas simples e avançadas', 'Legenda e referência automática', 'Múltiplas figuras lado a lado'] },
  { num: 'IV',   icon: '🧮', title: 'Equações Matemáticas',            items: ['Modo matemático inline e display', 'Frações, integrais, somatórios e limites', 'Alinhamento de sistemas de equações', 'Numeração e referência de equações'] },
  { num: 'V',    icon: '🎤', title: 'Apresentações com Beamer',        items: ['Criar slides profissionais do zero', 'Temas, cores e layouts', 'Animações e transições', 'Slides para defesa de dissertação e conferências'] },
  { num: 'VI',   icon: '📚', title: 'Citações e Referências Cruzadas', items: ['BibTeX e Zotero: bibliografias automáticas', 'Estilos de citação (ABNT, APA, IEEE)', 'Referências cruzadas a figuras, tabelas e seções', 'Índice remissivo e lista de símbolos'] },
  { num: 'VII',  icon: '🤖', title: 'IA e Automatização',              items: ['Usar ChatGPT e Claude para gerar LaTeX', 'Scripts Python para documentos em lote', 'Templates avançados reutilizáveis', 'Fluxo de trabalho moderno: IA + LaTeX'] },
  { num: 'VIII', icon: '🏁', title: 'Considerações Finais',            items: ['Revisão dos principais comandos', 'Pacotes indispensáveis para cada área', 'Onde buscar ajuda e continuar evoluindo', 'Portfólio: documente sua jornada em LaTeX'] },
]

const testimonials = [
  { name: 'Ana Clara M.',    role: 'Mestranda em Física — USP',          text: 'Minha dissertação ficou pronta 3x mais rápido. O módulo de BibTeX sozinho já valeu o curso.' },
  { name: 'Lucas F.',        role: 'Candidato ITA 2024',                  text: 'Aprendi a escrever relatórios de física experimental com qualidade profissional. O professor explica de forma extremamente clara.' },
  { name: 'Profa. Beatriz',  role: 'Docente universitária — SP',          text: 'Finalmente um curso que vai além do básico. O módulo de IA + LaTeX é o diferencial que eu precisava.' },
]

const faqs = [
  { q: 'Preciso instalar algum software?',        a: 'Não. O curso usa o Overleaf, que funciona diretamente no navegador. Você escreve LaTeX online sem instalar nada.' },
  { q: 'Funciona para quem não é da área exata?', a: 'Sim. O curso foi desenvolvido para ser acessível a qualquer pessoa — engenheiros, humanas, saúde, direito. LaTeX é útil para qualquer documento profissional.' },
  { q: 'Por quanto tempo terei acesso?',           a: 'Acesso vitalício. Você também recebe todas as atualizações futuras do curso sem pagar nada a mais.' },
  { q: 'Posso parcelar?',                          a: 'Sim, em até 12x sem juros no cartão de crédito, via Hotmart.' },
  { q: 'E se eu não gostar?',                      a: 'Você tem 7 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, devolvemos 100% do valor.' },
  { q: 'Qual o nível exigido?',                    a: 'Zero. Começamos do absoluto início: o que é LaTeX, como abrir o Overleaf e escrever o primeiro "Olá, Mundo". Sem pré-requisitos técnicos.' },
]

export default function LatexPage() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(160deg, #000 0%, #0d0d00 60%, #1a1200 100%)', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative glow */}
        <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(228,173,65,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center" style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', background: 'rgba(228,173,65,0.12)', border: '1px solid rgba(228,173,65,0.3)', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            Curso Online · Acesso vitalício
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: 20 }}>
            Chega de perder horas<br />formatando documentos no Word.
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 580, margin: '0 auto 32px' }}>
            Aprenda LaTeX do zero e produza documentos, equações e apresentações com qualidade profissional — usando IA para acelerar ainda mais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton href={HOTMART}>Quero aprender LaTeX →</CtaButton>
            <a href="#curriculo" style={{ color: 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)' }}>Ver o currículo completo</a>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginTop: 16 }}>
            ✓ Sem instalação &nbsp;·&nbsp; ✓ 8 módulos &nbsp;·&nbsp; ✓ Garantia de 7 dias
          </p>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>
          Você já passou por isso?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
          {[
            'Passou horas ajustando margens, fontes e espaçamentos no Word — e ficou feio mesmo assim.',
            'Tentou escrever uma equação e desistiu porque o editor de fórmulas é um pesadelo.',
            'Sua tese ou artigo foi rejeitado por não seguir o template da revista.',
            'Perdeu referências bibliográficas por não ter um sistema organizado.',
            'Tentou criar slides profissionais e não conseguiu o resultado que queria.',
            'Ouviu falar de LaTeX, tentou aprender sozinho e travou nos primeiros erros de compilação.',
          ].map(p => (
            <div key={p} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span style={{ color: 'var(--color-gold)', fontSize: 16, flexShrink: 0, marginTop: 1 }}>→</span>
              <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6 }}>{p}</p>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--color-text)', fontSize: 18, marginTop: 32, fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          O LaTeX para Todos foi feito exatamente para quem está nesse ponto.
        </p>
      </section>

      {/* ── TRANSFORMAÇÃO ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>
            O que muda depois do curso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: 'rgba(220,50,50,0.06)', border: '1px solid rgba(220,50,50,0.2)' }}>
              <p style={{ color: '#ff6b6b', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16 }}>Antes</p>
              {['Horas ajustando formatação manualmente', 'Equações difíceis de escrever e feias', 'Bibliografias desorganizadas', 'Slides amadores no PowerPoint', 'LaTeX parece inacessível e difícil'].map(i => (
                <p key={i} className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-muted)', fontSize: 14 }}>
                  <span style={{ color: '#ff6b6b' }}>✗</span> {i}
                </p>
              ))}
            </div>
            <div className="p-6 rounded-xl" style={{ background: 'rgba(228,173,65,0.06)', border: '1px solid rgba(228,173,65,0.2)' }}>
              <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16 }}>Depois</p>
              {['Documentos formatados automaticamente e impecáveis', 'Equações e fórmulas belíssimas com poucos comandos', 'Referências automáticas com BibTeX', 'Slides profissionais com Beamer', 'IA gerando LaTeX por você quando necessário'].map(i => (
                <p key={i} className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-muted)', fontSize: 14 }}>
                  <Check size={13} style={{ color: 'var(--color-gold)', flexShrink: 0 }} /> {i}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRÍCULO ── */}
      <section id="curriculo" className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
            8 módulos do zero ao avançado
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>Do seu primeiro documento até IA gerando LaTeX por você.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map(m => <Module key={m.num} {...m} />)}
        </div>
        <div className="text-center mt-10">
          <CtaButton href={HOTMART}>Quero começar agora →</CtaButton>
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>Para quem é este curso?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { who: 'Estudantes de exatas', why: 'Relatórios, listas de exercícios e TCCs com qualidade de publicação.' },
              { who: 'Pesquisadores e mestrandos', why: 'Artigos e teses no formato exigido por revistas e bancas.' },
              { who: 'Candidatos ITA/IME', why: 'Documentação experimental e relatórios com apresentação impecável.' },
              { who: 'Professores e docentes', why: 'Provas, listas e material didático gerados de forma rápida e consistente.' },
              { who: 'Profissionais de qualquer área', why: 'Propostas, relatórios e apresentações que impressionam clientes.' },
              { who: 'Iniciantes completos', why: 'Partimos do zero absoluto — você não precisa saber nada de programação.' },
            ].map(({ who, why }) => (
              <div key={who} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <Check size={16} style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 15 }}>{who}</p>
                  <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.5 }}>{why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 40 }}>
          O que os alunos dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => <Testimonial key={t.name} {...t} />)}
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
          Comece hoje, aprenda no seu ritmo
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 16, marginBottom: 32 }}>Acesso imediato após a compra. Disponível 24h/dia, para sempre.</p>

        <div className="p-8 rounded-2xl mb-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)', marginBottom: 6 }}>LaTeX para Todos</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--color-muted)', textDecoration: 'line-through', marginBottom: 4 }}>De R$ 197</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>
            R$ 97
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: 28 }}>ou 12x de R$ 9,49 · Via Hotmart</p>
          <CtaButton href={HOTMART}>Garantir minha vaga →</CtaButton>
          <div className="mt-6">
            {['Acesso vitalício + atualizações', '8 módulos com aulas detalhadas', 'Templates e arquivos prontos para usar', 'Módulo de IA + LaTeX exclusivo', 'Garantia de 7 dias sem perguntas'].map(b => (
              <p key={b} className="flex items-center justify-center gap-2 mb-2" style={{ color: 'var(--color-muted)', fontSize: 14 }}>
                <Check size={13} style={{ color: 'var(--color-gold)' }} /> {b}
              </p>
            ))}
          </div>
        </div>

        <GuaranteeBadge />
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
            Perguntas frequentes
          </h2>
          {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          <div className="text-center mt-12">
            <p style={{ color: 'var(--color-muted)', marginBottom: 16 }}>Ainda tem dúvidas?</p>
            <a href="https://wa.me/5512988616486" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              Falar com o professor <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
