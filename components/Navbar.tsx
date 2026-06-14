'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const cursosLinks = [
  { label: 'Física Olímpica',     href: 'https://militares.estrategia.com/concursos/cursos/fisica-olimpica' },
  { label: 'Física Experimental', href: '/cursos/experimental' },
  { label: 'LaTeX para Todos',    href: '/cursos/latex' },
  { label: 'Turma de Ciências',   href: 'https://militares.estrategia.com/concursos/cursos/ciencias-mirim' },
]

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'Livros',      href: '/livros' },
  { label: 'Cursos',      href: '#', dropdown: cursosLinks },
  { label: 'Simulações',  href: '/simulacoes' },
  { label: 'Tutor IA',    href: '/tutor' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Grupos',      href: '/grupos' },
  { label: 'Links',       href: '/links' },
  { label: 'Contato',     href: '/contato' },
]

/* Logo SVG — aproximação do isotipo FΩ com folhas */
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Laurel left */}
      <g fill="#E4AD41">
        <ellipse cx="18" cy="50" rx="5" ry="9" transform="rotate(-30 18 50)" />
        <ellipse cx="12" cy="38" rx="4" ry="8" transform="rotate(-50 12 38)" />
        <ellipse cx="14" cy="64" rx="4" ry="8" transform="rotate(-10 14 64)" />
        <ellipse cx="22" cy="74" rx="4" ry="7" transform="rotate(10 22 74)" />
        <ellipse cx="34" cy="80" rx="4" ry="7" transform="rotate(30 34 80)" />
        <ellipse cx="50" cy="83" rx="4" ry="6" transform="rotate(0 50 83)" />
        {/* right mirror */}
        <ellipse cx="82" cy="50" rx="5" ry="9" transform="rotate(30 82 50)" />
        <ellipse cx="88" cy="38" rx="4" ry="8" transform="rotate(50 88 38)" />
        <ellipse cx="86" cy="64" rx="4" ry="8" transform="rotate(10 86 64)" />
        <ellipse cx="78" cy="74" rx="4" ry="7" transform="rotate(-10 78 74)" />
        <ellipse cx="66" cy="80" rx="4" ry="7" transform="rotate(-30 66 80)" />
      </g>
      {/* F letter */}
      <rect x="26" y="18" width="10" height="52" fill="white" />
      <rect x="26" y="18" width="24" height="10" fill="white" />
      <rect x="26" y="38" width="20" height="9" fill="white" />
      {/* Ω / arc */}
      <path d="M52 18 A24 24 0 0 1 52 70" stroke="#3E3E3D" strokeWidth="14" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)

  return (
    <header style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={36} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--color-text)', letterSpacing: '0.08em', lineHeight: 1.1 }}>
              FÍSICA
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 400, color: 'var(--color-muted)', letterSpacing: '0.12em', lineHeight: 1 }}>
              EM NÍVEL OLÍMPICO
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link =>
            link.dropdown ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}>
                <button className="flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-display)' }}>
                  {link.label} <ChevronDown size={13} />
                </button>
                {coursesOpen && (
                  <div className="absolute top-full left-0 mt-1 rounded shadow-xl z-50 min-w-[210px]"
                    style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
                    {link.dropdown.map(sub => (
                      <Link key={sub.href} href={sub.href}
                        className="block px-4 py-3 text-sm hover-gold"
                        style={{ fontFamily: 'var(--font-display)' }}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href}
                className="px-3 py-2 rounded text-sm hover-gold transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}>
                {link.label}
              </Link>
            )
          )}
          <Link href="/login"
            className="ml-3 px-4 py-2 rounded text-sm font-semibold transition-all"
            style={{ background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)' }}>
            Entrar
          </Link>
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
                <span className="block px-2 py-3 text-sm font-semibold" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>{link.label}</span>
                {link.dropdown.map(sub => (
                  <Link key={sub.href} href={sub.href} onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                    — {sub.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-display)' }}>
                {link.label}
              </Link>
            )
          )}
          <Link href="/login" onClick={() => setOpen(false)}
            className="mt-2 block w-full text-center px-4 py-2 rounded text-sm font-semibold"
            style={{ background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)' }}>
            Entrar
          </Link>
        </div>
      )}
    </header>
  )
}
