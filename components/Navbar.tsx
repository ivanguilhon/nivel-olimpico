'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import NavbarAuth from '@/components/NavbarAuth'

const cursosLinks = [
  { label: 'Física Olímpica',     href: 'https://militares.estrategia.com/concursos/cursos/fisica-olimpica' },
  { label: 'Física Experimental', href: '/cursos/fisica-experimental' },
  { label: 'LaTeX para Todos',    href: '/cursos/latex' },
  { label: 'Turma de Ciências',   href: 'https://militares.estrategia.com/concursos/cursos/ciencias-mirim' },
]

const livrosLinks = [
  { label: 'Física em Nível Olímpico', href: '/livros/fisica-em-nivel-olimpico' },
  { label: 'Estudo Eficaz',            href: '/livros/estudo-eficaz' },
  { label: 'Ver todos os livros',      href: '/livros' },
]

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'Livros',      href: '/livros',       dropdown: livrosLinks },
  { label: 'Cursos',      href: '#',             dropdown: cursosLinks },
  { label: 'Simulações',  href: '/simulacoes' },
  { label: 'Tutor IA',    href: '/tutor' },
  { label: 'Fórum',       href: '/forum' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Links',       href: '/links' },
  { label: 'Contato',     href: '/contato' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header style={{ background: 'var(--color-nav)', borderBottom: '1px solid var(--color-nav-border)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo — imagem real */}
        <Link href="/" className="flex items-center gap-3">
          <div style={{ background: '#FFFFFF', borderRadius: 8, padding: '4px 6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/images/logo-full.png" alt="Física em Nível Olímpico"
              width={90} height={65} style={{ objectFit: 'contain' }} priority />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link =>
            link.dropdown ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button className="flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors"
                  style={{ color: 'var(--color-nav-muted)', fontFamily: 'var(--font-display)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {link.label} <ChevronDown size={13} />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 rounded-lg shadow-xl z-50 min-w-[210px]"
                    style={{ background: '#1a1a1a', border: '1px solid var(--color-nav-border)' }}>
                    {link.dropdown.map(sub => (
                      <Link key={sub.href} href={sub.href}
                        className="block px-4 py-3 text-sm hover-gold"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-muted)',
                          '--color-muted': 'var(--color-nav-muted)' } as React.CSSProperties}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href}
                className="px-3 py-2 rounded text-sm transition-colors"
                style={{ color: 'var(--color-nav-muted)', fontFamily: 'var(--font-display)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-nav-muted)')}>
                {link.label}
              </Link>
            )
          )}
          <NavbarAuth />
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}
          style={{ color: 'var(--color-nav-text)', background: 'none', border: 'none', cursor: 'pointer' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-4 pb-4" style={{ background: 'var(--color-nav)' }}>
          {navLinks.map(link =>
            link.dropdown ? (
              <div key={link.label}>
                <span className="block px-2 py-3 text-sm font-semibold"
                  style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>{link.label}</span>
                {link.dropdown.map(sub => (
                  <Link key={sub.href} href={sub.href} onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm"
                    style={{ color: 'var(--color-nav-muted)', fontFamily: 'var(--font-display)' }}>
                    — {sub.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="block px-2 py-3 text-sm"
                style={{ color: 'var(--color-nav-muted)', fontFamily: 'var(--font-display)' }}>
                {link.label}
              </Link>
            )
          )}
          <div className="mt-2"><NavbarAuth /></div>
        </div>
      )}
    </header>
  )
}
