import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export const metadata: Metadata = { title: 'Grupos de Discussão' }

const grupos = [
  { id: 'mecanica',         name: 'Mecânica Clássica',      desc: 'Dinâmica, cinemática, energia e momento linear.',            membros: 142 },
  { id: 'eletromagnetismo', name: 'Eletromagnetismo',        desc: 'Campos elétrico e magnético, indução, ondas EM.',            membros: 98 },
  { id: 'termodinamica',    name: 'Termodinâmica',           desc: 'Leis da termodinâmica, entropia e ciclos.',                  membros: 76 },
  { id: 'ita-ime',          name: 'Prep ITA/IME',            desc: 'Estratégias, provas antigas e discussão de gabaritos.',      membros: 215 },
  { id: 'obf',              name: 'OBF — Olimpíada Brasileira', desc: 'Preparação para as fases 1, 2 e 3 da OBF.',              membros: 187 },
  { id: 'fismod',           name: 'Física Moderna',          desc: 'Relatividade especial, quântica e física atômica.',          membros: 54 },
]

export default function GruposPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
            Grupos de Discussão
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>Participe das comunidades de estudo. Requer conta gratuita.</p>
        </div>
        <Link href="/login" className="px-4 py-2 rounded text-sm font-medium" style={{ background: 'var(--color-gold)', color: '#0D0D1A' }}>
          Entrar / Cadastrar
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {grupos.map(g => (
          <div key={g.id} className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-start justify-between mb-3">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-text)' }}>{g.name}</h3>
              <Lock size={14} style={{ color: 'var(--color-muted)', marginTop: 4 }} />
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: '1rem' }}>{g.desc}</p>
            <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>{g.membros} membros</p>
          </div>
        ))}
      </div>
    </div>
  )
}
