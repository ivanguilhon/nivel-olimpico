import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminUsersTable from './AdminUsersTable'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: myProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!myProfile || myProfile.role !== 'admin') redirect('/')

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name, email, city, aura_balance, role, is_banned, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
        Painel Administrativo
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 32 }}>
        Gerenciamento de usuários da plataforma.
      </p>

      {/* Total users card */}
      <div className="mb-8 p-6 rounded-xl inline-block"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
          fontFamily: 'var(--font-display)', marginBottom: 6 }}>
          Total de usuários
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-gold)' }}>
          {totalUsers ?? 0}
        </p>
      </div>

      <AdminUsersTable initialProfiles={profiles ?? []} />
    </div>
  )
}
