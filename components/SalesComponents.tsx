'use client'
import { useState } from 'react'
import { ChevronDown, Check, ShieldCheck, Star } from 'lucide-react'

const GITLAB = 'https://ivanguilhonn.gitlab.io/meusite/files'
export const IMG = {
  perfil:       `${GITLAB}/perfil.jpg`,
  estudoEficaz: `${GITLAB}/estudoEficaz3D.png`,
  fno:          `${GITLAB}/FNO3D.jpg`,
  latex:        `${GITLAB}/latex-site.png`,
  cife:         `${GITLAB}/cife.png`,
}

export function CtaButton({ href, children, size = 'lg' }: { href: string; children: React.ReactNode; size?: 'sm' | 'lg' }) {
  const pad = size === 'lg' ? '18px 40px' : '12px 24px'
  const fs  = size === 'lg' ? 17 : 14
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: pad, borderRadius: 8,
        background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)',
        fontWeight: 700, fontSize: fs, textDecoration: 'none',
        boxShadow: '0 4px 24px rgba(228,173,65,0.35)', transition: 'all 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold-lt)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.transform = 'translateY(0)' }}>
      {children}
    </a>
  )
}

export function GuaranteeBadge() {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl" style={{ background: 'rgba(228,173,65,0.06)', border: '1px solid rgba(228,173,65,0.2)' }}>
      <ShieldCheck size={40} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 3 }}>Garantia de 7 dias</p>
        <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.5 }}>
          Se em 7 dias você não estiver satisfeito, devolvemos 100% do valor. Sem burocracia, sem perguntas.
        </p>
      </div>
    </div>
  )
}

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={14} fill="#E4AD41" style={{ color: '#E4AD41' }} />)}
    </div>
  )
}

export function Testimonial({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <Stars />
      <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, margin: '12px 0' }}>"{text}"</p>
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 14 }}>{name}</p>
        <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>{role}</p>
      </div>
    </div>
  )
}

export function Module({ num, icon, title, items }: { num: string; icon: string; title: string; items: string[] }) {
  return (
    <div className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-start gap-4">
        <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(228,173,65,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
          {icon}
        </div>
        <div className="flex-1">
          <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 3 }}>
            Módulo {num}
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10 }}>{title}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map(item => (
              <li key={item} className="flex items-start gap-2 mb-1">
                <Check size={13} style={{ color: 'var(--color-gold)', marginTop: 3, flexShrink: 0 }} />
                <span style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, paddingRight: 16 }}>{q}</span>
        <ChevronDown size={18} style={{ color: 'var(--color-gold)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, paddingBottom: 20 }}>{a}</p>}
    </div>
  )
}

export function Instructor() {
  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start p-8 rounded-xl"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      {/* Real photo */}
      <img src={IMG.perfil} alt="Prof. Dr. Ivan Guilhon"
        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover',
          border: '2px solid var(--color-gold)', flexShrink: 0 }} />
      <div>
        <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
          Seu professor
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
          Prof. Dr. Ivan Guilhon
        </h3>
        <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 12 }}>
          Engenheiro Eletrônico pelo ITA (<em>Magna Cum Laude</em>, 2014) e Doutor em Física Atômica e Molecular pelo ITA (2017, aos 25 anos).
          15 artigos em periódicos internacionais, 4 livros publicados. Aprovado em 1º lugar no concurso público para professor de Física do ITA aos 26 anos.
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            'Medalha de Prata — IPhO',
            'Medalha de Ouro — OBF',
            '1º lugar — IME (2º ano do EM)',
            'Coordenador — IYPT Brasil',
          ].map(cred => (
            <span key={cred} style={{ background: 'rgba(228,173,65,0.08)', border: '1px solid rgba(228,173,65,0.2)',
              borderRadius: 20, padding: '3px 12px', fontSize: 12, color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>
              {cred}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
