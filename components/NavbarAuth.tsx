'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, User } from 'lucide-react'

export default function NavbarAuth() {
  const [user, setUser]   = useState<any>(null)
  const [ready, setReady] = useState(false)
  const [aura, setAura]   = useState<{ balance: number; badge: string | null } | null>(null)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // If env vars are missing, just show "Entrar" — don't crash
    if (!url || !key) {
      setReady(true)
      return
    }

    import('@/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient()
      if (!supabase) { setReady(true); return }

      supabase.auth.getUser().then(({ data }: { data: any }) => {
        setUser(data.user ?? null)
        setReady(true)
        if (data.user) {
          supabase.from('profiles').select('aura_balance, aura_badge').eq('id', data.user.id).single()
            .then(({ data: p }: { data: any }) => {
              if (p) setAura({ balance: p.aura_balance, badge: p.aura_badge })
            })
        }
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_: any, session: any) => {
        setUser(session?.user ?? null)
      })
      return () => subscription.unsubscribe()
    }).catch(() => setReady(true))
  }, [])

  const badgeEmoji: Record<string, string> = { gold: '🥇', silver: '🥈', bronze: '🥉' }

  // While loading, show a neutral placeholder
  if (!ready) return (
    <div style={{ width: 64, height: 32, borderRadius: 8, background: 'var(--color-nav-border)' }} />
  )

  if (user) return (
    <div className="flex items-center gap-2 ml-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
        style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
        <User size={14} style={{ color: 'var(--color-muted)' }} />
        <span style={{ color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)',
          maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0]}
        </span>
        {aura && (
          <span title={aura.badge ? `Aura de ${aura.badge === 'gold' ? 'Ouro' : aura.badge === 'silver' ? 'Prata' : 'Bronze'}` : 'Aura'}
            style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'var(--color-gold)', fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            {aura.badge && badgeEmoji[aura.badge]} {aura.balance}
          </span>
        )}
      </div>
      <form action="/auth/signout" method="POST">
        <button type="submit" title="Sair"
          style={{ background: 'none', border: '1px solid var(--color-nav-border)', borderRadius: 8,
            padding: '7px 10px', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex' }}>
          <LogOut size={14} />
        </button>
      </form>
    </div>
  )

  return (
    <Link href="/login" className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold"
      style={{ background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
      Entrar
    </Link>
  )
}
