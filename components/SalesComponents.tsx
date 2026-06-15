'use client'
import { useState } from 'react'
import { ChevronDown, Check, ShieldCheck, Star } from 'lucide-react'

/* ─── CTA Button ─── */
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

/* ─── Guarantee Badge ─── */
export function GuaranteeBadge() {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl" style={{ background: 'rgba(228,173,65,0.06)', border: '1px solid rgba(228,173,65,0.2)' }}>
      <ShieldCheck size={40} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', marginBottom: 3 }}>
          Garantia de 7 dias
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.5 }}>
          Se em 7 dias você não estiver satisfeito, devolvemos 100% do valor. Sem burocracia, sem perguntas.
        </p>
      </div>
    </div>
  )
}

/* ─── Stars ─── */
export function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={14} fill="#E4AD41" style={{ color: '#E4AD41' }} />)}
    </div>
  )
}

/* ─── Testimonial card ─── */
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

/* ─── Module row ─── */
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

/* ─── FAQ item ─── */
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

/* ─── Section divider ─── */
export function Divider() {
  return <div style={{ height: 1, background: 'var(--color-border)', margin: '0 auto', maxWidth: 120 }} />
}

/* ─── Instructor block ─── */
export function Instructor() {
  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start p-8 rounded-xl"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(228,173,65,0.15)',
        border: '2px solid var(--color-gold)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
        👨‍🏫
      </div>
      <div>
        <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
          Seu professor
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
          Prof. Dr. Ivan Guilhon
        </h3>
        <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.7 }}>
          Doutor em Física, engenheiro eletrônico e professor com mais de 15 anos de experiência
          preparando alunos para olimpíadas (OBF, IPhO) e exames de alto nível (ITA, IME).
          Autor dos livros <em>Física em Nível Olímpico</em> e <em>Estudo Eficaz</em>.
          Professor no Estratégia Militar e criador da plataforma Nível Olímpico.
        </p>
      </div>
    </div>
  )
}
