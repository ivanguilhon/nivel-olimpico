'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, ShieldAlert, ShieldCheck } from 'lucide-react'

interface Profile {
  id: string
  display_name: string | null
  email: string | null
  city: string | null
  aura_balance: number | null
  role: string
  is_banned: boolean
  created_at: string
}

export default function AdminUsersTable({ initialProfiles }: { initialProfiles: Profile[] }) {
  const supabase = createClient()
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [edits, setEdits] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ id: string; text: string; ok: boolean } | null>(null)

  function handleChange(id: string, value: string) {
    setEdits(prev => ({ ...prev, [id]: value }))
  }

  async function handleSave(id: string) {
    const raw = edits[id]
    if (raw === undefined) return
    const value = parseInt(raw, 10)
    if (isNaN(value)) { setMsg({ id, text: 'Valor inválido.', ok: false }); return }

    setSavingId(id)
    const { error } = await supabase.from('profiles').update({ aura_balance: value }).eq('id', id)
    setSavingId(null)

    if (error) {
      setMsg({ id, text: error.message, ok: false })
      return
    }

    setProfiles(prev => prev.map(p => p.id === id ? { ...p, aura_balance: value } : p))
    setEdits(prev => { const next = { ...prev }; delete next[id]; return next })
    setMsg({ id, text: 'Salvo!', ok: true })
    setTimeout(() => setMsg(null), 2500)
  }

  const th: React.CSSProperties = {
    textAlign: 'left', padding: '10px 14px', fontFamily: 'var(--font-display)', fontSize: 11,
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted)',
    borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap',
  }
  const td: React.CSSProperties = {
    padding: '12px 14px', fontSize: 13, color: 'var(--color-text)',
    borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap',
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>E-mail</th>
              <th style={th}>Cidade</th>
              <th style={th}>Aura</th>
              <th style={th}>Role</th>
              <th style={th}>Status</th>
              <th style={th}>Criado em</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(p => (
              <tr key={p.id}>
                <td style={td}>{p.display_name ?? '—'}</td>
                <td style={td}>{p.email ?? '—'}</td>
                <td style={td}>{p.city ?? '—'}</td>
                <td style={td}>
                  <input
                    type="number"
                    value={edits[p.id] ?? p.aura_balance ?? 0}
                    onChange={e => handleChange(p.id, e.target.value)}
                    style={{ width: 90, background: 'var(--color-surface2)', border: '1px solid var(--color-border)',
                      borderRadius: 6, padding: '6px 8px', color: 'var(--color-text)', fontSize: 13 }}
                  />
                </td>
                <td style={td}>
                  <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 11, fontFamily: 'var(--font-display)',
                    background: p.role === 'admin' ? 'rgba(228,173,65,0.15)' : p.role === 'moderator' ? 'rgba(96,165,250,0.15)' : 'var(--color-surface2)',
                    color: p.role === 'admin' ? 'var(--color-gold)' : p.role === 'moderator' ? '#60A5FA' : 'var(--color-muted)' }}>
                    {p.role}
                  </span>
                </td>
                <td style={td}>
                  {p.is_banned ? (
                    <span className="flex items-center gap-1" style={{ color: '#F87171', fontSize: 12 }}>
                      <ShieldAlert size={13} /> Banido
                    </span>
                  ) : (
                    <span className="flex items-center gap-1" style={{ color: '#34D399', fontSize: 12 }}>
                      <ShieldCheck size={13} /> Ativo
                    </span>
                  )}
                </td>
                <td style={td}>{new Date(p.created_at).toLocaleDateString('pt-BR')}</td>
                <td style={td}>
                  <button onClick={() => handleSave(p.id)} disabled={savingId === p.id || edits[p.id] === undefined}
                    className="flex items-center gap-1"
                    style={{ padding: '6px 12px', borderRadius: 6, border: 'none',
                      cursor: (savingId === p.id || edits[p.id] === undefined) ? 'not-allowed' : 'pointer',
                      background: edits[p.id] === undefined ? 'var(--color-surface2)' : 'var(--color-gold)',
                      color: edits[p.id] === undefined ? 'var(--color-muted)' : '#000',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12 }}>
                    <Save size={12} /> {savingId === p.id ? 'Salvando...' : 'Salvar'}
                  </button>
                  {msg && msg.id === p.id && (
                    <span style={{ marginLeft: 8, fontSize: 11, color: msg.ok ? '#34D399' : '#F87171' }}>{msg.text}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
