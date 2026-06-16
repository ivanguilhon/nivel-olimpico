import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import TagPill from '@/components/TagPill'
import { CheckCircle, MessageSquare, ChevronUp, Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fórum de Física',
  description: 'Fórum de dúvidas sobre física olímpica, ITA, IME, OBF e IPhO.',
}

export const revalidate = 60 // revalidate every minute

async function getQuestions(sort: string, tag: string | null) {
  const supabase = await createClient()

  let query = supabase
    .from('questions')
    .select(`
      id, title, body, vote_count, view_count, is_solved, created_at,
      author:profiles(display_name),
      question_tags(tags(id, name, color, category)),
      answers(count)
    `)

  if (sort === 'votos')     query = query.order('vote_count', { ascending: false })
  else if (sort === 'views') query = query.order('view_count', { ascending: false })
  else                       query = query.order('created_at', { ascending: false })

  const { data, error } = await query.limit(50)
  if (error) return []

  // Filter by tag client-side (simpler than complex SQL join filter)
  if (tag) {
    return (data ?? []).filter((q: any) =>
      q.question_tags?.some((qt: any) => qt.tags?.name === tag)
    )
  }

  return data ?? []
}

async function getTags() {
  const supabase = await createClient()
  const { data } = await supabase.from('tags').select('*').order('category').order('name')
  return data ?? []
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60)  return `${mins}min atrás`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs}h atrás`
  const days = Math.floor(hrs / 24)
  if (days < 30)  return `${days}d atrás`
  return new Date(date).toLocaleDateString('pt-BR')
}

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; tag?: string }>
}) {
  const params  = await searchParams
  const sort    = params.sort ?? 'recente'
  const tagFilter = params.tag ?? null

  const [questions, tags] = await Promise.all([
    getQuestions(sort, tagFilter),
    getTags(),
  ])

  const assuntos    = tags.filter((t: any) => t.category === 'assunto')
  const competicoes = tags.filter((t: any) => t.category === 'competição')
  const niveis      = tags.filter((t: any) => t.category === 'nível')

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
            Fórum de Física
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
            {questions.length} {questions.length === 1 ? 'pergunta' : 'perguntas'}
            {tagFilter ? ` com tag "${tagFilter}"` : ''}
          </p>
        </div>
        <Link href="/forum/nova"
          className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
          <Plus size={16} /> Nova pergunta
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          {/* Sort tabs */}
          <div className="flex gap-1 mb-6 p-1 rounded-lg w-fit" style={{ background: 'var(--color-surface)' }}>
            {[['recente','Recentes'],['votos','Mais votadas'],['views','Mais vistas']].map(([val, label]) => (
              <Link key={val} href={`/forum?sort=${val}${tagFilter ? `&tag=${encodeURIComponent(tagFilter)}` : ''}`}
                style={{
                  padding: '6px 14px', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-display)',
                  textDecoration: 'none', fontWeight: sort === val ? 600 : 400,
                  background: sort === val ? 'var(--color-gold)' : 'transparent',
                  color: sort === val ? '#000' : 'var(--color-muted)',
                }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Question list */}
          {questions.length === 0 ? (
            <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>
              <p style={{ fontSize: 18, marginBottom: 8 }}>Nenhuma pergunta ainda.</p>
              <p style={{ fontSize: 14 }}>Seja o primeiro a perguntar!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {questions.map((q: any) => {
                const answerCount = q.answers?.[0]?.count ?? 0
                const tags = q.question_tags?.map((qt: any) => qt.tags).filter(Boolean) ?? []
                const excerpt = q.body?.replace(/\$[^$]*\$/g, '…').replace(/##?#?\s/g, '').slice(0, 120)

                return (
                  <div key={q.id} className="p-5 rounded-xl transition-all"
                    style={{ background: 'var(--color-surface)', border: `1px solid ${q.is_solved ? 'rgba(52,211,153,0.25)' : 'var(--color-border)'}` }}>
                    <div className="flex gap-4">
                      {/* Stats */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-1" style={{ minWidth: 52 }}>
                        <div className="flex flex-col items-center">
                          <ChevronUp size={16} style={{ color: 'var(--color-muted)' }} />
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
                            color: q.vote_count > 0 ? 'var(--color-gold)' : 'var(--color-muted)' }}>
                            {q.vote_count}
                          </span>
                        </div>
                        <div className="flex flex-col items-center" title={`${answerCount} resposta(s)`}>
                          <MessageSquare size={14} style={{ color: q.is_solved ? '#34D399' : 'var(--color-muted)' }} />
                          <span style={{ fontSize: 13, color: q.is_solved ? '#34D399' : 'var(--color-muted)', fontWeight: q.is_solved ? 700 : 400 }}>
                            {answerCount}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap mb-1">
                          {q.is_solved && (
                            <CheckCircle size={16} style={{ color: '#34D399', flexShrink: 0, marginTop: 3 }} />
                          )}
                          <Link href={`/forum/${q.id}`} style={{ textDecoration: 'none' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
                              color: 'var(--color-text)', lineHeight: 1.3 }}
                              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text)')}>
                              {q.title}
                            </h2>
                          </Link>
                        </div>
                        <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>
                          {excerpt}…
                        </p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex flex-wrap gap-1">
                            {tags.map((t: any) => (
                              <Link key={t.id} href={`/forum?tag=${encodeURIComponent(t.name)}`} style={{ textDecoration: 'none' }}>
                                <TagPill name={t.name} color={t.color} />
                              </Link>
                            ))}
                          </div>
                          <span style={{ color: 'var(--color-muted)', fontSize: 12, whiteSpace: 'nowrap', fontFamily: 'var(--font-display)' }}>
                            {q.author?.display_name ?? 'Anônimo'} · {timeAgo(q.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ width: 240, flexShrink: 0 }} className="hidden lg:block">
          {tagFilter && (
            <div className="mb-4">
              <Link href="/forum" style={{ color: 'var(--color-gold)', fontSize: 13, fontFamily: 'var(--font-display)' }}>
                ← Ver todas as perguntas
              </Link>
            </div>
          )}
          {[
            { label: 'Assunto',     items: assuntos },
            { label: 'Competição',  items: competicoes },
            { label: 'Nível',       items: niveis },
          ].map(section => (
            <div key={section.label} className="mb-6">
              <p style={{ color: 'var(--color-muted)', fontSize: 11, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                {section.label}
              </p>
              <div className="flex flex-wrap gap-1">
                {section.items.map((t: any) => (
                  <Link key={t.id} href={`/forum?tag=${encodeURIComponent(t.name)}`} style={{ textDecoration: 'none' }}>
                    <TagPill name={t.name} color={t.color} selected={tagFilter === t.name} />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl mt-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>
              Dicas para perguntar bem
            </p>
            <ul style={{ paddingLeft: '1rem', color: 'var(--color-muted)', fontSize: 12, lineHeight: 1.7 }}>
              <li>Use LaTeX: <code style={{ color: 'var(--color-gold)', fontSize: 11 }}>$F=ma$</code></li>
              <li>Mostre o que já tentou</li>
              <li>Adicione as tags de assunto e nível</li>
              <li>Um problema por pergunta</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
