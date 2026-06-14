import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const posts: Record<string, {
  title: string; date: string; category: string; readTime: string; content: string
}> = {
  'conservacao-energia-mecanica': {
    title: 'Conservação de Energia Mecânica: da teoria à prova do ITA',
    date: '2025-05-15',
    category: 'Mecânica',
    readTime: '8 min',
    content: `
A conservação de energia é uma das ferramentas mais poderosas da física olímpica. Enquanto a segunda lei de Newton exige que você rastreie todas as forças em cada instante, a conservação de energia permite ir diretamente do estado inicial ao final — sem se preocupar com o caminho.

## O princípio

Para um sistema conservativo, a energia mecânica total E = K + U é constante:

$$E = \\frac{1}{2}mv^2 + U(\\vec{r}) = \\text{const}$$

Isso funciona sempre que as únicas forças que realizam trabalho são conservativas (gravitação, mola elástica, força elétrica).

## Quando usar energia vs. Newton

**Use Newton quando:** você precisa da força ou aceleração em um instante específico.

**Use energia quando:** você precisa relacionar velocidades em dois pontos distintos, ou encontrar velocidade máxima/mínima.

**Exemplo clássico — ITA 2019:**

Uma esfera de massa $m$ está presa a um fio inextensível de comprimento $L$ e parte do repouso com o fio horizontal. Qual a tensão no fio no ponto mais baixo?

*Solução por energia:*

$$\\frac{1}{2}mv^2 = mgL \\implies v^2 = 2gL$$

No ponto mais baixo, a equação de movimento circular:

$$T - mg = \\frac{mv^2}{L} = \\frac{m \\cdot 2gL}{L} = 2mg$$

$$\\boxed{T = 3mg}$$

## Extensão: sistemas com múltiplos corpos

Para um sistema de partículas, a energia total é a soma das energias individuais mais a energia potencial de interação. Em colisões elásticas, a energia cinética total é conservada — e junto com a conservação do momento, você obtém um sistema de duas equações para duas incógnitas.

## Dica olímpica

Em problemas com superfícies curvas ou trilhos complexos, a conservação de energia reduz o problema a álgebra simples. Identifique os pontos de interesse, escreva $K_1 + U_1 = K_2 + U_2$, e resolva.
    `,
  },
  'erros-classicos-ita': {
    title: 'Os 5 erros que mais derrubam candidatos no ITA',
    date: '2025-04-20',
    category: 'ITA/IME',
    readTime: '6 min',
    content: `
Depois de anos acompanhando candidatos ao ITA, identifico padrões claros de erros. Não são falhas de conhecimento — são armadilhas conceituais que derrubam até quem estudou muito.

## 1. Confundir referencial inercial e não-inercial

O ITA adora colocar observadores em elevadores, carros e trens. Muitos candidatos aplicam $F = ma$ em referenciais acelerados sem adicionar a força fictícia $F_{fict} = -m\\vec{a}_{ref}$.

**Regra:** se o referencial acelera com $\\vec{a}_0$, adicione $-m\\vec{a}_0$ a todas as equações no referencial não-inercial.

## 2. Esquecer a reação normal em superfícies côncavas e convexas

Em pistas curvas, a normal não é simplesmente $mg\\cos\\theta$. Ela precisa fornecer a componente centrípeta. No topo de uma pista convexa:

$$mg - N = \\frac{mv^2}{R}$$

Candidatos esquecem o termo centrípeto e erram o cálculo de $N$ — e portanto da força de atrito máxima.

## 3. Sinais no trabalho de forças internas

Em sistemas de dois corpos, as forças internas formam pares ação-reação. O trabalho total das forças internas **não é zero** (só o impulso total é zero). Isso importa ao calcular energia em colisões parcialmente inelásticas.

## 4. Campo vs. potencial elétrico — confusão de sinais

$\\vec{E} = -\\nabla V$. O campo aponta no sentido de **queda** do potencial, não de crescimento. Uma carga positiva se move de alto para baixo potencial espontaneamente, ganhando energia cinética.

## 5. Óptica: confundir objeto real e virtual

Em sistemas de múltiplas lentes, a imagem de uma lente é o objeto da próxima. Se a imagem cai **depois** da segunda lente, o objeto para ela é **virtual** ($d_o < 0$ na convenção de sinais). Ignorar isso inverte o resultado.

## Conclusão

Esses erros têm uma coisa em comum: são conceituais, não algébricos. A melhor preparação é resolver problemas comentando em voz alta o raciocínio físico — não apenas o resultado.
    `,
  },
  'osciladores-acoplados-modos-normais': {
    title: 'Osciladores acoplados e modos normais de vibração',
    date: '2025-03-10',
    category: 'Mecânica',
    readTime: '10 min',
    content: `
Osciladores acoplados são um dos tópicos mais elegantes da mecânica clássica — e aparecem em olimpíadas internacionais com frequência crescente. A ideia central é que um sistema com $N$ graus de liberdade tem exatamente $N$ modos normais, cada um oscilando com frequência definida.

## Configuração do problema

Considere duas massas iguais $m$ conectadas por três molas: duas externas com constante $k$ e uma central com constante $k_c$.

As equações de movimento são:

$$m\\ddot{x}_1 = -kx_1 + k_c(x_2 - x_1)$$
$$m\\ddot{x}_2 = -kx_2 - k_c(x_2 - x_1)$$

## Modos normais

Tentamos soluções da forma $x_1 = A_1 e^{i\\omega t}$, $x_2 = A_2 e^{i\\omega t}$. O sistema torna-se:

$$\\begin{pmatrix} k + k_c & -k_c \\\\ -k_c & k + k_c \\end{pmatrix} \\begin{pmatrix} A_1 \\\\ A_2 \\end{pmatrix} = m\\omega^2 \\begin{pmatrix} A_1 \\\\ A_2 \\end{pmatrix}$$

As frequências naturais saem do determinante secular:

$$\\omega_1^2 = \\frac{k}{m} \\quad \\text{(modo simétrico: } A_1 = A_2\\text{)}$$

$$\\omega_2^2 = \\frac{k + 2k_c}{m} \\quad \\text{(modo antissimétrico: } A_1 = -A_2\\text{)}$$

## Batimentos

Se você excitar apenas uma das massas com amplitude $A$, o movimento resultante é uma superposição dos dois modos:

$$x_1(t) = A\\cos\\left(\\frac{\\omega_2 - \\omega_1}{2}t\\right)\\cos\\left(\\frac{\\omega_2 + \\omega_1}{2}t\\right)$$

A energia oscila entre as duas massas com período $T_{bat} = 2\\pi/(\\omega_2 - \\omega_1)$.

## Aplicações em olimpíadas

Esse problema apareceu na IPhO 2021 em versão 3D (rede cristalina). A estratégia é sempre a mesma: encontrar os modos normais, depois expressar o movimento inicial como combinação linear deles.

Use a simulação de [Osciladores Acoplados](/simulacoes) para visualizar os dois modos antes de resolver os problemas.
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  return { title: post?.title ?? 'Post não encontrado' }
}

// Simple markdown-to-HTML for the blog content
function renderContent(md: string) {
  const html = md
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--color-text);margin:2rem 0 0.75rem">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(228,173,65,0.12);padding:1px 6px;border-radius:3px;font-size:0.9em">$1</code>')
    .replace(/\$\$([\s\S]+?)\$\$/g, '<div class="katex-block" data-expr="$1" style="text-align:center;padding:12px;margin:16px 0;background:rgba(228,173,65,0.06);border-radius:8px;font-style:italic;color:var(--color-gold)">$1</div>')
    .replace(/\$([^\n$]+?)\$/g, '<span style="font-style:italic;color:var(--color-gold-lt)">$1</span>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--color-gold);text-decoration:underline">$1</a>')
    .replace(/\n\n/g, '</p><p style="margin-bottom:1rem;color:var(--color-muted);line-height:1.8;font-size:16px">')
  return `<p style="margin-bottom:1rem;color:var(--color-muted);line-height:1.8;font-size:16px">${html}</p>`
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-text)', marginBottom: '1rem' }}>Post não encontrado</h1>
      <Link href="/blog" style={{ color: 'var(--color-gold)' }}>← Voltar ao Blog</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-8 hover-gold"
        style={{ fontFamily: 'var(--font-display)' }}>
        <ArrowLeft size={14} /> Voltar ao Blog
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(228,173,65,0.12)', color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>
          {post.category}
        </span>
        <time style={{ color: 'var(--color-muted)', fontSize: 13 }}>
          {new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <span style={{ color: 'var(--color-muted)', fontSize: 13 }}>· {post.readTime} de leitura</span>
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.2, marginBottom: '2rem' }}>
        {post.title}
      </h1>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}
        dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />

      <div className="mt-12 p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>Escrito por</p>
        <p style={{ color: 'var(--color-text)', fontWeight: 600, fontFamily: 'var(--font-display)' }}>Prof. Dr. Ivan Guilhon</p>
        <p style={{ color: 'var(--color-muted)', fontSize: 13 }}>Física em Nível Olímpico</p>
      </div>
    </div>
  )
}
