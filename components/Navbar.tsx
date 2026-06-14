'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const cursosLinks = [
  { label: 'Física Olímpica',    href: 'https://militares.estrategia.com/concursos/cursos/fisica-olimpica' },
  { label: 'Física Experimental',href: '/cursos/experimental' },
  { label: 'LaTeX para Todos',   href: '/cursos/latex' },
  { label: 'Turma de Ciências',  href: 'https://militares.estrategia.com/concursos/cursos/ciencias-mirim' },
]

const navLinks = [
  { label: 'Home',           href: '/' },
  { label: 'Livros',         href: '/livros' },
  { label: 'Cursos',         href: '#',         dropdown: cursosLinks },
  { label: 'Simulações',     href: '/simulacoes' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Grupos',         href: '/grupos' },
  { label: 'Links Úteis',    href: '/links' },
  { label: 'Contato',        href: '/contato' },
  { label: 'Tutor IA',       href: '/tutor' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)

  return (
    <header style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--color-gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0D0D1A', fontSize: 14
          }}>NO</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--color-text)', letterSpacing: '0.01em' }}>
            Nível Olímpico
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onMouseEnter={() => setCoursesOpen(true)}
                  onMouseLeave={() => setCoursesOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  onFocus={() => setCoursesOpen(true)}
                  onBlur={() => setCoursesOpen(false)}
                >
                  {link.label} <ChevronDown size={14} />
                </button>
                {coursesOpen && (
                  <div
                    onMouseEnter={() => setCoursesOpen(true)}
                    onMouseLeave={() => setCoursesOpen(false)}
                    className="absolute top-full left-0 mt-1 rounded shadow-xl z-50 min-w-[200px]"
                    style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}
                  >
                    {link.dropdown.map(sub => (
                      <Link key={sub.href} href={sub.href}
                        className="block px-4 py-3 text-sm transition-colors"
                        style={{ color: 'var(--color-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                      >{sub.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href}
                className="px-3 py-2 rounded text-sm transition-colors"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
              >{link.label}</Link>
            )
          )}
          <Link href="/login"
            className="ml-3 px-4 py-2 rounded text-sm font-medium transition-all"
            style={{ background: 'var(--color-gold)', color: '#0D0D1A' }}
          >Entrar</Link>
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--color-text)' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-4 pb-4" style={{ background: 'var(--color-surface)' }}>
          {navLinks.map(link =>
            link.dropdown ? (
              <div key={link.label}>
                <span className="block px-2 py-3 text-sm font-medium" style={{ color: 'var(--color-gold)' }}>{link.label}</span>
                {link.dropdown.map(sub => (
                  <Link key={sub.href} href={sub.href} onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                    — {sub.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                {link.label}
              </Link>
            )
          )}
          <Link href="/login" onClick={() => setOpen(false)}
            className="mt-2 block w-full text-center px-4 py-2 rounded text-sm font-medium"
            style={{ background: 'var(--color-gold)', color: '#0D0D1A' }}>
            Entrar
          </Link>
        </div>
      )}
    </header>
  )
}
