import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-nav)', borderTop: '1px solid var(--color-nav-border)' }} className="mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)', fontSize: 18, marginBottom: '0.75rem' }}>
            Nível Olímpico
          </h3>
          <p style={{ color: 'var(--color-nav-muted)', fontSize: 14, lineHeight: 1.7 }}>
            Preparação para olimpíadas de Física e exames de alto nível (ITA, IME, OBF).
            Conteúdo desenvolvido pelo Prof. Dr. Ivan Guilhon.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'var(--color-nav-text)', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Navegação</h4>
          {[['Home','/'],['Livros','/livros'],['Simulações','/simulacoes'],['Fórum','/forum'],['Blog','/blog'],['Contato','/contato']].map(([label, href]) => (
            <Link key={href} href={href} className="nav-hover-gold block py-1 text-sm" style={{ textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h4 style={{ color: 'var(--color-nav-text)', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Redes Sociais</h4>
          {[
            ['Instagram','https://www.instagram.com/prof.ivanguilhon/'],
            ['Facebook','https://www.facebook.com/nivel.olimpico/'],
            ['Amazon','https://www.amazon.com.br/shop/prof.ivanguilhon'],
            ['WhatsApp','https://wa.me/5512988616486'],
          ].map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="nav-hover-gold block py-1 text-sm" style={{ textDecoration: 'none' }}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--color-nav-border)' }} className="text-center py-4">
        <p style={{ color: 'var(--color-nav-muted)', fontSize: 12 }}>
          © {new Date().getFullYear()} Física em Nível Olímpico — Prof. Dr. Ivan Guilhon
        </p>
      </div>
    </footer>
  )
}
