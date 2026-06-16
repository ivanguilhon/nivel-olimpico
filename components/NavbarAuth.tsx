'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LogOut, User } from 'lucide-react'

export default function NavbarAuth() {
  const [user, setUser] = useState<any>(undefined) // undefined = loading

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (user === undefined) return (
    <div style={{ width: 80, height: 36, borderRadius: 8, background: 'var(--color-surface2)' }} />
  )

  if (user) return (
    <div className="flex items-center gap-2 ml-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
        style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
        <User size={14} style={{ color: 'var(--color-muted)' }} />
        <span style={{ color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)', maxWidth: 100,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0]}
        </span>
      </div>
      <form action="/auth/signout" method="POST">
        <button type="submit" title="Sair"
          style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 8,
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
