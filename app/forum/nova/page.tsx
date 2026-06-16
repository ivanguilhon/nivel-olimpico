'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MathText from '@/components/MathText'
import TagPill from '@/components/TagPill'
import { Eye, Edit3, AlertCircle } from 'lucide-react'

interface Tag { id: string; name: string; color: string; category: string }

export default function NovaPerguntaPage() {
  const router  = useRouter()
  const [title, setTitle]               = useState('')
  const [body, setBody]                 = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags]           = useState<Tag[]>([])
  const [preview, setPreview]           = useState(false)
  const [submitting, setSubmitting]     = useState(false)
  const [error, setError]               = useState('')
  const [user, setUser]                 = useState<any>(null)
  const supabaseRef = useRef<any>(null)

  useEffect(() => {
    // Lazy-load supabase to avoid SSR issues
    import('@/lib/supabase/client').then(({ createClient }) => {
      const sb = createClient()
      supabaseRef.current = sb
      sb.auth.getUser().then(({ data }: { data: any }) => {
        if (!data.user) router.push('/login?next=/forum/nova')
        else setUser(data.user)
      })
      sb.from('tags').select('*').order('category').order('name').then(({ data }: { data: any }) => {
        if (data) setAllTags(data as Tag[])
      })
    })
  }, [router])

  const toggleTag = (id: string) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : prev.length < 5 ? [...prev, id] : prev
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const supabase = supabaseRef.current
    if (!supabase || !user) return
    if (selectedTags.length === 0) { setError('Selecione pelo menos uma tag.'); return }
    setError(''); setSubmitting(true)

    const { data: q, error: qErr } = await supabase
      .from('questions')
      .insert({ title: title.trim(), body: body.trim(), author_id: user.id })
      .select('id').single()

    if (qErr || !q) { setError(qErr?.message ?? 'Erro ao criar pergunta.'); setSubmitting(false); return }

    if (selectedTags.length > 0) {
      await supabase.from('question_tags').insert(
        selectedTags.map((tag_id: string) => ({ question_id: q.id, tag_id }))
      )
    }
    router.push(`/forum/${q.id}`)
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

  const tagsByCategory: Record<string, Tag[]> = {
    'Assunto':    allTags.filter(t => t.category === 'assunto'),
    'Competição': allTags.filter(t => t.category === 'competição'),
    'Nível':      allTags.filter(t => t.category === 'nível'),
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
        Nova pergunta
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 32 }}>
        Use LaTeX: <code style={{ color: 'var(--color-gold)', fontSize: 13 }}>$F=ma$</code> inline e{' '}
        <code style={{ color: 'var(--color-gold)', fontSize: 13 }}>$$E=mc^2$$</code> em destaque.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div>
          <label style={labelStyle}>Título da pergunta *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required minLength={10} maxLength={200}
            placeholder="Ex: Como calcular o período de um pêndulo para grandes ângulos?"
            style={inputStyle} />
          <p style={{ color: 'var(--color-muted)', fontSize: 11, marginTop: 4 }}>{title.length}/200</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label style={{ ...labelStyle, marginBottom: 0 }}>Descrição da dúvida *</label>
            <button type="button" onClick={() => setPreview(!preview)}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                color: 'var(--color-muted)', fontFamily: 'var(--font-display)', cursor: 'pointer' }}>
              {preview ? <><Edit3 size={12} /> Editar</> : <><Eye size={12} /> Preview</>}
            </button>
          </div>
          {preview ? (
            <div className="min-h-[200px] p-4 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {body ? <MathText text={body} /> : <p style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}>Escreva algo para ver o preview...</p>}
            </div>
          ) : (
            <textarea value={body} onChange={e => setBody(e.target.value)} required minLength={20} rows={10}
              placeholder={"Descreva sua dúvida com detalhes. Mostre o que já tentou.\n\nExemplo com LaTeX:\nAplicando a 2ª Lei de Newton: $$F = ma$$\nMas não consigo obter o período..."}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          )}
        </div>

        <div>
          <label style={labelStyle}>Tags * <span style={{ fontWeight: 400 }}>(até 5)</span></label>
          <div className="flex flex-col gap-4 p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {Object.entries(tagsByCategory).map(([cat, tags]) => (
              <div key={cat}>
                <p style={{ color: 'var(--color-muted)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 6 }}>{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <TagPill key={tag.id} name={tag.name} color={tag.color} size="md"
                      selected={selectedTags.includes(tag.id)} onClick={() => toggleTag(tag.id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <p style={{ color: 'var(--color-gold)', fontSize: 12, marginTop: 6, fontFamily: 'var(--font-display)' }}>
              {selectedTags.length} tag(s) selecionada(s)
            </p>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg"
            style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.25)' }}>
            <AlertCircle size={16} style={{ color: '#ff6b6b', flexShrink: 0 }} />
            <p style={{ color: '#ff6b6b', fontSize: 14 }}>{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" disabled={submitting}
            style={{ padding: '12px 28px', borderRadius: 8, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
              background: submitting ? 'var(--color-surface2)' : 'var(--color-gold)',
              color: submitting ? 'var(--color-muted)' : '#000',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
            {submitting ? 'Publicando...' : 'Publicar pergunta'}
          </button>
          <a href="/forum" style={{ padding: '12px 20px', borderRadius: 8, border: '1px solid var(--color-border)',
            color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 14,
            textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Cancelar
          </a>
        </div>
      </form>
    </div>
  )
}
