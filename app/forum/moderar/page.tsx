'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Trash2, Pin, PinOff, Ban, ShieldCheck, AlertCircle, ExternalLink, Sparkles } from 'lucide-react'

interface Question {
  id: string; title: string; is_pinned: boolean; is_solved: boolean
  created_at: string; author: { id: string; display_name: string } | null
}
interface Profile {
  id: string; display_name: string; role: string; is_banned: boolean
  aura_balance?: number; aura_badge?: string | null
}

export default function ModerarPage() {
  const router = useRouter()
  const [loading, setLoading]   = useState(true)
  const [allowed, setAllowed]   = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [profiles, setProfiles]   = useState<Profile[]>([])
  const [tab, setTab]             = useState<'perguntas' | 'usuarios' | 'aura'>('perguntas')
  const [msg, setMsg]             = useState('')
  const [processingAura, setProcessingAura] = useState(false)
  const [auraResult, setAuraResult] = useState<any>(null)
  const supabaseRef = useRef<any>(null)

  useEffect(() => {
    import('@/lib/supabase/client').then(({ createClient }) => {
      const sb = createClient()
      supabaseRef.current = sb
      sb.auth.getUser().then(async ({ data }: { data: any }) => {
        if (!data.user) { router.push('/login?next=/forum/moderar'); return }
        const { data: profile } = await sb.from('profiles').select('role').eq('id', data.user.id).single()
        if (!profile || !['moderator', 'admin'].includes(profile.role)) {
          setLoading(false)
          return
        }
        setAllowed(true)
        await loadData(sb)
        setLoading(false)
      })
    })
  }, [router])

  async function loadData(sb: any) {
    const { data: qs } = await sb
      .from('questions')
      .select('id, title, is_pinned, is_solved, created_at, author:profiles(id, display_name)')
      .order('created_at', { ascending: false })
      .limit(100)
    setQuestions((qs ?? []).map((q: any) => ({ ...q, author: Array.isArray(q.author) ? q.author[0] : q.author })))

    const { data: ps } = await sb
      .from('profiles')
      .select('id, display_name, role, is_banned, aura_balance, aura_badge')
      .order('display_name')
    setProfiles(ps ?? [])
  }

  async function deleteQuestion(id: string) {
    if (!confirm('Excluir esta pergunta permanentemente? Isso também remove as respostas.')) return
    const sb = supabaseRef.current
    const { error } = await sb.from('questions').delete().eq('id', id)
    if (error) { setMsg('Erro: ' + error.message); return }
    setQuestions(prev => prev.filter(q => q.id !== id))
    setMsg('Pergunta excluída.')
  }

  async function togglePin(id: string, current: boolean) {
    const sb = supabaseRef.current
    const { error } = await sb.from('questions').update({ is_pinned: !current }).eq('id', id)
    if (error) { setMsg('Erro: ' + error.message); return }
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, is_pinned: !current } : q))
  }

  async function toggleBan(id: string, current: boolean) {
    if (!current && !confirm('Banir este usuário? Ele não conseguirá mais postar perguntas ou respostas.')) return
    const sb = supabaseRef.current
    const { error } = await sb.from('profiles').update({ is_banned: !current }).eq('id', id)
    if (error) { setMsg('Erro: ' + error.message); return }
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, is_banned: !current } : p))
  }

  async function runWeeklyAura() {
    if (!confirm('Rodar o processamento semanal de Aura agora? Isso converte votos pendentes em aura e recalcula badges.')) return
    setProcessingAura(true)
    const sb = supabaseRef.current
    const { data, error } = await sb.rpc('process_weekly_aura')
    setProcessingAura(false)
    if (error) { setMsg('Erro: ' + error.message); return }
    setAuraResult(data)
    setMsg('Processamento semanal de Aura concluído.')
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--color-muted)',
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center" style={{ color: 'var(--color-muted)' }}>Carregando…</div>
  }

  if (!allowed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <AlertCircle size={32} style={{ color: '#ff6b6b', margin: '0 auto 16px' }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-text)', marginBottom: 8 }}>
          Acesso restrito
        </h1>
        <p style={{ color: 'var(--color-muted)' }}>Esta página é exclusiva para moderadores do fórum.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck size={24} style={{ color: 'var(--color-gold)' }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)' }}>
          Moderação do Fórum
        </h1>
      </div>
      <p style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: 28 }}>
        Gerencie perguntas e usuários do fórum.
      </p>

      {msg && (
        <div className="mb-6 p-3 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-gold)', fontSize: 13 }}>
          {msg}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('perguntas')}
          style={{ padding: '8px 18px', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-display)', cursor: 'pointer',
            background: tab === 'perguntas' ? 'var(--color-gold)' : 'var(--color-surface)',
            color: tab === 'perguntas' ? '#000' : 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          Perguntas ({questions.length})
        </button>
        <button onClick={() => setTab('usuarios')}
          style={{ padding: '8px 18px', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-display)', cursor: 'pointer',
            background: tab === 'usuarios' ? 'var(--color-gold)' : 'var(--color-surface)',
            color: tab === 'usuarios' ? '#000' : 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          Usuários ({profiles.length})
        </button>
        <button onClick={() => setTab('aura')}
          style={{ padding: '8px 18px', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-display)', cursor: 'pointer',
            background: tab === 'aura' ? 'var(--color-gold)' : 'var(--color-surface)',
            color: tab === 'aura' ? '#000' : 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          Aura
        </button>
      </div>

      {tab === 'perguntas' && (
        <div className="flex flex-col gap-3">
          {questions.map(q => (
            <div key={q.id} className="flex items-center justify-between gap-4 p-4 rounded-lg"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {q.is_pinned && <Pin size={12} style={{ color: 'var(--color-gold)' }} />}
                  <Link href={`/forum/${q.id}`} target="_blank" style={{ color: 'var(--color-text)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                    {q.title}
                  </Link>
                  <ExternalLink size={11} style={{ color: 'var(--color-muted)' }} />
                </div>
                <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>
                  por {q.author?.display_name ?? 'Anônimo'} · {new Date(q.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => togglePin(q.id, q.is_pinned)} title={q.is_pinned ? 'Desafixar' : 'Fixar'}
                  style={{ padding: 8, borderRadius: 6, border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer' }}>
                  {q.is_pinned ? <PinOff size={14} style={{ color: 'var(--color-muted)' }} /> : <Pin size={14} style={{ color: 'var(--color-muted)' }} />}
                </button>
                <button onClick={() => deleteQuestion(q.id)} title="Excluir"
                  style={{ padding: 8, borderRadius: 6, border: '1px solid rgba(220,50,50,0.3)', background: 'rgba(220,50,50,0.08)', cursor: 'pointer' }}>
                  <Trash2 size={14} style={{ color: '#ff6b6b' }} />
                </button>
              </div>
            </div>
          ))}
          {questions.length === 0 && <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: 40 }}>Nenhuma pergunta ainda.</p>}
        </div>
      )}

      {tab === 'usuarios' && (
        <div className="flex flex-col gap-3">
          {profiles.map(p => (
            <div key={p.id} className="flex items-center justify-between gap-4 p-4 rounded-lg"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div>
                <p style={{ color: 'var(--color-text)', fontSize: 15, fontWeight: 600 }}>
                  {p.display_name} {p.is_banned && <span style={{ color: '#ff6b6b', fontSize: 11, fontFamily: 'var(--font-display)' }}>BANIDO</span>}
                </p>
                <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>role: {p.role}</p>
              </div>
              <button onClick={() => toggleBan(p.id, p.is_banned)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 6, fontSize: 13,
                  fontFamily: 'var(--font-display)', cursor: 'pointer',
                  border: p.is_banned ? '1px solid var(--color-border)' : '1px solid rgba(220,50,50,0.3)',
                  background: p.is_banned ? 'var(--color-surface2)' : 'rgba(220,50,50,0.08)',
                  color: p.is_banned ? 'var(--color-muted)' : '#ff6b6b' }}>
                <Ban size={13} />
                {p.is_banned ? 'Desbanir' : 'Banir'}
              </button>
            </div>
          ))}
        </div>
      )}
      {tab === 'aura' && (
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--color-text)' }}>
                Processamento semanal de Aura
              </h3>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: 16 }}>
              Roda automaticamente toda segunda-feira às 00:05 (UTC) via cron. Converte votos pendentes em aura
              e recalcula os badges (ouro/prata/bronze). Use o botão abaixo só se quiser forçar uma execução fora do horário.
            </p>
            <button onClick={runWeeklyAura} disabled={processingAura}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: processingAura ? 'not-allowed' : 'pointer',
                background: processingAura ? 'var(--color-surface2)' : 'var(--color-gold)',
                color: processingAura ? 'var(--color-muted)' : '#000', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>
              {processingAura ? 'Processando...' : 'Rodar agora'}
            </button>

            {auraResult && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg" style={{ background: 'var(--color-surface2)' }}>
                  <p style={{ color: 'var(--color-muted)', fontSize: 11 }}>Votos processados</p>
                  <p style={{ color: 'var(--color-text)', fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{auraResult.votes_processed}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'var(--color-surface2)' }}>
                  <p style={{ color: 'var(--color-muted)', fontSize: 11 }}>Usuários elegíveis (aura &gt; 10)</p>
                  <p style={{ color: 'var(--color-text)', fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{auraResult.eligible_count}</p>
                </div>
                <div className="p-3 rounded-lg col-span-2" style={{ background: 'var(--color-surface2)' }}>
                  <p style={{ color: 'var(--color-muted)', fontSize: 11 }}>Badges recalculados</p>
                  <p style={{ color: auraResult.badges_recalculated ? '#34D399' : 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)' }}>
                    {auraResult.badges_recalculated ? 'Sim' : `Não (precisa de 30+ usuários elegíveis, há ${auraResult.eligible_count})`}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p style={labelStyle}>Ranking de aura</p>
            {profiles.slice().sort((a: any, b: any) => (b.aura_balance ?? 0) - (a.aura_balance ?? 0)).map((p: any, i: number) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text)', fontSize: 14 }}>
                  {i + 1}. {p.display_name} {p.aura_badge === 'gold' ? '🥇' : p.aura_badge === 'silver' ? '🥈' : p.aura_badge === 'bronze' ? '🥉' : ''}
                </span>
                <span style={{ color: 'var(--color-gold)', fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {p.aura_balance ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
