import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Simulações',
  description: 'Simulações interativas de física para olimpíadas — PhysSim por Prof. Dr. Ivan Guilhon.',
}

const BASE = 'https://ivanguilhon.github.io/PhysSim'
const WIX = 'https://static.wixstatic.com/media'

const sims = [
  {
    id:       'mru-mruv',
    title:    'MRU e MRUV',
    subtitle: 'Cinemática',
    desc:     'Visualize movimento retilíneo uniforme e uniformemente variado. Controle velocidade inicial, aceleração e tempo — veja posição e velocidade em tempo real.',
    href:     `${BASE}/MRU-MRUV/MRU-MRUV.html`,
    img:      `${WIX}/7b20c6_a4897c521ed94f43832e4c087ecca0e4~mv2.png`,
  },
  {
    id:       'lancamento-obliquo',
    title:    'Lançamento Oblíquo',
    subtitle: 'Cinemática 2D',
    desc:     'Simule projéteis com controle de ângulo, velocidade inicial e gravidade. Observe a trajetória parabólica e o alcance máximo interativamente.',
    href:     `${BASE}/myCannon/MyCannon.html`,
    img:      `${WIX}/7b20c6_bc2b261171a24ffead7e9c421f1fa541~mv2.png`,
  },
  {
    id:       'campo-eletrico',
    title:    'Campo Elétrico & Potencial',
    subtitle: 'Eletrostática',
    desc:     'Distribua cargas pontuais e visualize as linhas de campo elétrico e superfícies equipotenciais em tempo real. Ferramenta essencial para ITA/IME.',
    href:     `${BASE}/eletrostatica/electric_sim.html`,
    img:      `${WIX}/8dc56f_2288510e35084ea4ba4bec1c437762dc~mv2.png`,
  },
  {
    id:       'luz-cores',
    title:    'Luz e Cores',
    subtitle: 'Óptica / Fotônica',
    desc:     'Explore síntese aditiva (RGB) e subtrativa (CMY) de cores. Misture luzes coloridas e pigmentos e observe os resultados — perfeito para compreender fotônica.',
    href:     `${BASE}/luz-cores/LuzECores.html`,
    img:      `${WIX}/8dc56f_6a9816824dbe4129ad7c4c629a6c0032~mv2.png`,
  },
  {
    id:       'ondas-sonoras',
    title:    'Ondas Sonoras',
    subtitle: 'Ondulatória',
    desc:     'Visualize a superposição de ondas sonoras, batimentos e interferência. Controle frequência, amplitude e fase de múltiplas fontes.',
    href:     `${BASE}/waveSound/waveSound.html`,
    img:      `${WIX}/8dc56f_07f9b31d7e5349acb7b4a6f04cb6f029~mv2.png`,
  },
  {
    id:       'gases-ideais',
    title:    'Gases Ideais',
    subtitle: 'Termodinâmica',
    desc:     'Simulação molecular de transformações isotérmicas, isobáricas e adiabáticas. Veja as moléculas e os gráficos p-V simultaneamente.',
    href:     `${BASE}/ideal%20gas/gases_ideais.html`,
    img:      `${WIX}/7b20c6_5aa4000d7f5f416d9609d34a7aba3ff5~mv2.png`,
  },
  {
    id:       'poco-infinito',
    title:    'Poço Quântico Infinito',
    subtitle: 'Física Moderna',
    desc:     'Visualize as funções de onda e níveis de energia de uma partícula em poço infinito. Explore a quantização de energia — conteúdo IPhO avançado.',
    href:     `${BASE}/QuantumWell/infiniteWell.html`,
    img:      `${WIX}/7b20c6_b6899c6a96b14a16bf7007c41f747992~mv2.png`,
  },
  {
    id:       'poco-finito',
    title:    'Poço Quântico Finito',
    subtitle: 'Física Moderna',
    desc:     'Versão com paredes de potencial finito: observe tunelamento quântico e compare com o caso infinito. Estados ligados e espalhamento visualizados.',
    href:     `${BASE}/QuantumWell/finiteWell.html`,
    img:      `${WIX}/7b20c6_b6899c6a96b14a16bf7007c41f747992~mv2.png`,
  },
]

const topicos = ['Cinemática', 'Cinemática 2D', 'Eletrostática', 'Óptica / Fotônica', 'Ondulatória', 'Termodinâmica', 'Física Moderna']

export default function SimulacoesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p style={{ color: 'var(--color-gold)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
          PhysSim — ivanguilhon.github.io/PhysSim
        </p>
        <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
          Simulações Interativas
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: 16, maxWidth: 580, lineHeight: 1.7 }}>
          Controle variáveis diretamente e observe fenômenos físicos em tempo real.
          Todas as simulações abrem diretamente no navegador — sem instalação.
        </p>
        {/* Topic tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {topicos.map(t => (
            <span key={t} className="px-3 py-1 rounded-full text-xs"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-display)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sims.map(sim => (
          <div key={sim.id} className="group flex flex-col rounded-xl overflow-hidden"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {/* Visual header */}
            <div className="relative overflow-hidden"
              style={{ height: 160, borderBottom: '1px solid var(--color-border)' }}>
              <Image src={sim.img} alt={sim.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            </div>
            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <p style={{ color: 'var(--color-gold)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem', fontFamily: 'var(--font-display)' }}>
                {sim.subtitle}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                {sim.title}
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.6, flex: 1 }}>{sim.desc}</p>
              <a href={sim.href} target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>
                Abrir simulação <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 rounded-xl text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: '0.75rem' }}>
          Tem uma sugestão de simulação?
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="mailto:nivel.olimpico@gmail.com"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            nivel.olimpico@gmail.com
          </a>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <a href="/contato"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Página de contato
          </a>
        </div>
      </div>
    </div>
  )
}
