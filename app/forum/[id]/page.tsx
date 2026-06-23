import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import TagPill from '@/components/TagPill'
import QuestionInteractions from './QuestionInteractions'

export const revalidate = 30

async function getQuestion(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('questions')
    .select(`id, title, body, image_url, vote_count, view_count, is_solved, is_pinned, created_at, author_id, author:profiles(id, display_name), question_tags(tags(id, name, color, category)), answers(id, body, vote_count, is_accepted, created_at, author_id, author:profiles(id, display_name))`)
    .eq('id', id)
    .single() as any

  if (error || !data) return null
  const q: any = data

  // Increment view count (fire and forget)
  supabase.from('questions').update({ view_count: (q.view_count ?? 0) + 1 }).eq('id', id)

  // Sort answers: accepted first, then by votes
  if (q.answers) {
    q.answers.sort((a: any, b: any) => {
      if (a.is_accepted && !b.is_accepted) return -1
      if (!a.is_accepted && b.is_accepted) return 1
      return b.vote_count - a.vote_count
    })
  }

  return q
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const q = await getQuestion(id)
  return { title: q?.title ?? 'Pergunta não encontrada' }
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60)  return `${mins}min atrás`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs}h atrás`
  const days = Math.floor(hrs / 24)
  if (days < 30)  return `${days}d atrás`
  return new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const question = await getQuestion(id)
  if (!question) notFound()

  const tags = question.question_tags?.map((qt: any) => qt.tags).filter(Boolean) ?? []
  const answers = question.answers ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back */}
      <a href="/forum" style={{ color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-display)',
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 24 }}>
        ← Fórum
      </a>

      {/* Question */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((t: any) => <TagPill key={t.id} name={t.name} color={t.color} />)}
          {question.is_solved && (
            <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'var(--font-display)',
              background: 'rgba(52,211,153,0.12)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}>
              ✓ Resolvida
            </span>
          )}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700,
          color: 'var(--color-text)', lineHeight: 1.25, marginBottom: 16 }}>
          {question.title}
        </h1>
        <div className="flex items-center gap-4 text-xs mb-6" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-display)' }}>
          <span>por <strong style={{ color: 'var(--color-text)' }}>{(Array.isArray(question.author) ? question.author[0]?.display_name : question.author?.display_name) ?? 'Anônimo'}</strong></span>
          <span>{timeAgo(question.created_at)}</span>
          <span>{question.view_count} views</span>
          <span>{answers.length} {answers.length === 1 ? 'resposta' : 'respostas'}</span>
        </div>
      </div>

      {/* Interactive content (voting, body, answers, form) */}
      <QuestionInteractions question={question} answers={answers} />
    </div>
  )
}
