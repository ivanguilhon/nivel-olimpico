import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = { title: 'Simulações' }

const sims = [
  { id: 'pendulo-simples',       title: 'Pêndulo Simples',         desc: 'Controle comprimento, amplitude e gravidade. Observe período e trajetória em tempo real.' },
  { id: 'osciladores-acoplados', title: 'Osciladores Acoplados',   desc: 'Dois osciladores ligados por mola. Visualize modos normais e batimentos.' },
  { id: 'queda-livre',           title: 'Queda Livre',             desc: 'Cinemática da queda com e sem resistência do ar.' },
  { id: 'campo-eletrico',        title: 'Campo Elétrico',          desc: 'Linhas de campo e potencial de distribuições de cargas pontuais.' },
  { id: 'optica-geometrica',     title: 'Óptica Geométrica',       desc: 'Refração e reflexão em lentes e espelhos com raios interativos.' },
  { id: 'gas-ideal',             title: 'Gás Ideal',               desc: 'Simulação molecular de transformações termodinâmicas.' },
]

export default function SimulacoesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--color-gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>PhysSim</p>
        <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Simulações Interativas
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: 16, maxWidth: 560, lineHeight: 1.7 }}>
          Controle variáveis diretamente e observe fenômenos físicos em tempo real. Desenvolvidas para sala de aula e estudo autônomo.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sims.map(sim => (
          <div key={sim.id} className="p-6 rounded-lg flex flex-col" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="rounded mb-5 flex items-center justify-center" style={{ height: 120, background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 32, color: 'var(--color-gold)' }}>⚛</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{sim.title}</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.6, flex: 1 }}>{sim.desc}</p>
            <Link href={`/simulacoes/${sim.id}`} className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-gold)' }}>
              Abrir simulação <ExternalLink size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
