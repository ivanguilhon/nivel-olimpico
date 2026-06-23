'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle, User as UserIcon, Camera } from 'lucide-react'

const MAX_AVATAR_MB = 3

interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  birth_date: string | null
  city: string | null
  olympic_medal: string | null
  email: string | null
  phone: string | null
}

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser]           = useState<any>(null)
  const [profile, setProfile]     = useState<Profile | null>(null)
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')
  const [avatarFile, setAvatarFile]       = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabaseRef = useRef<any>(null)

  // Form fields
  const [displayName, setDisplayName]   = useState('')
  const [birthDate, setBirthDate]       = useState('')
  const [city, setCity]                 = useState('')
  const [olympicMedal, setOlympicMedal] = useState('')
  const [email, setEmail]               = useState('')
  const [phone, setPhone]               = useState('')

  useEffect(() => {
    import('@/lib/supabase/client').then(({ createClient }) => {
      const sb = createClient()
      supabaseRef.current = sb
      sb.auth.getUser().then(async ({ data }: { data: any }) => {
        if (!data.user) { router.push('/login?next=/perfil'); return }
        setUser(data.user)

        const { data: p } = await sb
          .from('profiles')
          .select('id, display_name, avatar_url, birth_date, city, olympic_medal, email, phone')
          .eq('id', data.user.id)
          .single()

        if (p) {
          setProfile(p)
          setDisplayName(p.display_name ?? '')
          setBirthDate(p.birth_date ?? '')
          setCity(p.city ?? '')
          setOlympicMedal(p.olympic_medal ?? '')
          setEmail(p.email ?? data.user.email ?? '')
          setPhone(p.phone ?? '')
        }
        setLoading(false)
      })
    })
  }, [router])

  function handleAvatarSelect(file: File | null) {
    setError('')
    if (!file) { setAvatarFile(null); setAvatarPreview(null); return }
    if (!file.type.startsWith('image/')) { setError('Selecione um arquivo de imagem válido.'); return }
    if (file.size > MAX_AVATAR_MB * 1024 * 1024) { setError(`Imagem muito grande (máx. ${MAX_AVATAR_MB}MB).`); return }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const supabase = supabaseRef.current
    if (!supabase || !user) return
    setError(''); setSuccess(''); setSaving(true)

    let avatar_url = profile?.avatar_url ?? null

    if (avatarFile) {
      setUploadingAvatar(true)
      const ext = avatarFile.name.split('.').pop()
      const path = `${user.id}/${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from('avatars').upload(path, avatarFile, { upsert: true })
      setUploadingAvatar(false)
      if (upErr) { setError('Erro ao enviar foto: ' + upErr.message); setSaving(false); return }
      const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path)
      avatar_url = pub.publicUrl
    }

    const { error: updErr } = await supabase
      .from('profiles')
      .update({
        display_name:  displayName.trim() || null,
        avatar_url,
        birth_date:    birthDate || null,
        city:          city.trim() || null,
        olympic_medal: olympicMedal.trim() || null,
        email:         email.trim() || null,
        phone:         phone.trim() || null,
      })
      .eq('id', user.id)

    setSaving(false)

    if (updErr) { setError(updErr.message); return }

    setProfile(prev => prev ? { ...prev, avatar_url, birth_date: birthDate, city, olympic_medal: olympicMedal, email, phone, display_name: displayName } : prev)
    setAvatarFile(null)
    setAvatarPreview(null)
    setSuccess('Perfil atualizado com sucesso!')
    setTimeout(() => setSuccess(''), 4000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)',
    color: 'var(--color-text)', borderRadius: 8, padding: '11px 14px', fontSize: 15,
    outline: 'none', fontFamily: 'var(--font-body)',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--color-muted)', fontSize: 12, marginBottom: 6,
    textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-display)',
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p style={{ color: 'var(--color-muted)' }}>Carregando perfil...</p>
      </div>
    )
  }

  const currentAvatar = avatarPreview ?? profile?.avatar_url

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
        Meu Perfil
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 32 }}>
        Atualize suas informações pessoais e foto de perfil.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* Avatar */}
        <div>
          <label style={labelStyle}>Foto de perfil</label>
          <div className="flex items-center gap-5">
            <div className="relative" style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden',
              background: 'var(--color-surface2)', border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {currentAvatar ? (
                <img src={currentAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UserIcon size={36} style={{ color: 'var(--color-muted)' }} />
              )}
            </div>
            <label className="flex items-center gap-2 cursor-pointer"
              style={{ border: '1px dashed var(--color-border)', borderRadius: 8, padding: '10px 16px',
                color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-display)' }}>
              <Camera size={15} />
              Escolher foto
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleAvatarSelect(e.target.files?.[0] ?? null)} />
            </label>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: 11, marginTop: 6 }}>PNG, JPG ou WEBP — até {MAX_AVATAR_MB}MB.</p>
        </div>

        <div>
          <label style={labelStyle}>Nome de exibição</label>
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
            placeholder="Como você quer ser chamado no fórum" style={inputStyle} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>Data de nascimento</label>
            <input type="date" value={birthDate ?? ''} onChange={e => setBirthDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Cidade</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)}
              placeholder="Ex: São José dos Campos" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Medalha olímpica <span style={{ fontWeight: 400 }}>(opcional)</span></label>
          <input type="text" value={olympicMedal} onChange={e => setOlympicMedal(e.target.value)}
            placeholder="Ex: Medalha de Prata na OBF 2023" style={inputStyle} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle}>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Telefone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="(12) 91234-5678" style={inputStyle} />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg"
            style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.25)' }}>
            <AlertCircle size={16} style={{ color: '#ff6b6b', flexShrink: 0 }} />
            <p style={{ color: '#ff6b6b', fontSize: 14 }}>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-lg"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}>
            <CheckCircle size={16} style={{ color: '#34D399', flexShrink: 0 }} />
            <p style={{ color: '#34D399', fontSize: 14 }}>{success}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" disabled={saving}
            style={{ padding: '12px 28px', borderRadius: 8, border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              background: saving ? 'var(--color-surface2)' : 'var(--color-gold)',
              color: saving ? 'var(--color-muted)' : '#000',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
            {uploadingAvatar ? 'Enviando foto...' : saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </div>
  )
}
