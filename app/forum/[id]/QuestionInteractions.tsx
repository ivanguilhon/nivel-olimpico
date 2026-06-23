'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import MathText from '@/components/MathText'
import QuestionForm from '@/components/QuestionForm'
import { ChevronUp, ChevronDown, CheckCircle, Eye, Edit3, AlertCircle, Pencil } from 'lucide-react'

interface VoteButtonsProps {
  id: string
  type: 'question' | 'answer'
  initialCount: number
  onVote?: (newCount: number) => void
}

function VoteButtons({ id, type, initialCount }: VoteButtonsProps) {
  const supabase = createClient()
  const [count, setCount]     = useState(initialCount)
  const [myVote, setMyVote]   = useState<1 | -1 | 0>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: any }) => {
      if (!data.user) return
      const col = type === 'question' ? 'question_id' : 'answer_id'
      supabase.from('votes').select('value').eq(col, id).eq('user_id', data.user.id).single()
        .then(({ data: v }: { data: any }) => { if (v) setMyVote(v.value as 1 | -1) })
    })
  }, [id, type])

  const vote = useCallback(async (val: 1 | -1) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('Faça login para votar.'); return }
    if (loading) return
    setLoading(true)

    const col = type === 'question' ? 'question_id' : 'answer_id'

    if (myVote === val) {
      // Remove vote
      await supabase.from('votes').delete().eq(col, id).eq('user_id', user.id)
      setCount(c => c - val)
      setMyVote(0)
    } else {
      if (myVote !== 0) {
        // Change vote: delete old then insert new
        await supabase.from('votes').delete().eq(col, id).eq('user_id', user.id)
        setCount(c => c - myVote)
      }
      const { error } = await supabase.from('votes').insert({
        user_id: user.id, [col]: id, value: val,
      })
      if (!error) { setCount(c => c + val); setMyVote(val) }
    }
    setLoading(false)
  }, [myVote, loading, id, type])

  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={() => vote(1)} title="Upvote" disabled={loading}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          color: myVote === 1 ? 'var(--color-gold)' : 'var(--color-muted)', transition: 'color 0.15s' }}>
        <ChevronUp size={22} />
      </button>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, minWidth: 28, textAlign: 'center',
        color: count > 0 ? 'var(--color-gold)' : count < 0 ? '#F87171' : 'var(--color-muted)' }}>
        {count}
      </span>
      <button onClick={() => vote(-1)} title="Downvote" disabled={loading}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          color: myVote === -1 ? '#F87171' : 'var(--color-muted)', transition: 'color 0.15s' }}>
        <ChevronDown size={22} />
      </button>
    </div>
  )
}

interface AnswerFormProps {
  questionId: string
  onSubmitted: (answer: any) => void
}

function AnswerForm({ questionId, onSubmitted }: AnswerFormProps) {
  const supabase = createClient()
  const [body, setBody]         = useState('')
  const [preview, setPreview]   = useState(false)
  const [submitting, setSub]    = useState(false)
  const [error, setError]       = useState('')
  const [user, setUser]         = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: any }) => setUser(data.user))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) { setError('Faça login para responder.'); return }
    setSub(true); setError('')

    const { data, error: err } = await supabase
      .from('answers')
      .insert({ question_id: questionId, author_id: user.id, body: body.trim() })
      .select('*, author:profiles(display_name)')
      .single()

    if (err || !data) { setError(err?.message ?? 'Erro ao enviar resposta.'); setSub(false); return }

    onSubmitted(data)
    setBody('')
    setSub(false)
  }

  if (!user) return (
    <div className="p-5 rounded-xl text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <p style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: 12 }}>Faça login para responder esta pergunta.</p>
      <a href="/login" style={{ padding: '10px 24px', borderRadius: 8, background: 'var(--color-gold)', color: '#000',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
        Entrar
      </a>
    </div>
  )

  return (
    <form onSubmit={submit} className="mt-4">
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>
        Sua resposta
      </h3>
      <div className="mb-4">
        <div className="flex justify-end mb-2">
          <button type="button" onClick={() => setPreview(!preview)}
            className="flex items-center gap-1 text-xs px-3 py-1 rounded"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              color: 'var(--color-muted)', fontFamily: 'var(--font-display)', cursor: 'pointer' }}>
            {preview ? <><Edit3 size={12} /> Editar</> : <><Eye size={12} /> Preview</>}
          </button>
        </div>
        {preview ? (
          <div className="min-h-[160px] p-4 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {body ? <MathText text={body} /> : <p style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}>Escreva algo para ver o preview...</p>}
          </div>
        ) : (
          <textarea value={body} onChange={e => setBody(e.target.value)} required minLength={10} rows={8}
            placeholder="Escreva sua resposta. Use LaTeX para fórmulas: $E=mc^2$ ou $$F=ma$$"
            style={{ width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              color: 'var(--color-text)', borderRadius: 8, padding: '11px 14px', fontSize: 15,
              outline: 'none', fontFamily: 'var(--font-body)', resize: 'vertical', lineHeight: 1.6 }} />
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 p-3 rounded mb-3"
          style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.25)' }}>
          <AlertCircle size={14} style={{ color: '#ff6b6b' }} />
          <p style={{ color: '#ff6b6b', fontSize: 13 }}>{error}</p>
        </div>
      )}
      <button type="submit" disabled={submitting}
        style={{ padding: '11px 28px', borderRadius: 8, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
          background: submitting ? 'var(--color-surface2)' : 'var(--color-gold)',
          color: submitting ? 'var(--color-muted)' : '#000',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
        {submitting ? 'Enviando...' : 'Publicar resposta'}
      </button>
    </form>
  )
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

export default function QuestionInteractions({ question, answers: initialAnswers }: {
  question: any
  answers: any[]
}) {
  const supabase = createClient()
  const [answers, setAnswers] = useState(initialAnswers)
  const [user, setUser]       = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: any }) => setUser(data.user))
  }, [])

  const addAnswer = (answer: any) => {
    setAnswers(prev => [...prev, answer])
  }

  const [bountyMsg, setBountyMsg] = useState<string | null>(null)
  const [bountyAmount, setBountyAmount] = useState(question.bounty_amount || 0)
  const [showBountyForm, setShowBountyForm] = useState(false)
  const [offeringBounty, setOfferingBounty] = useState(false)
  const [bountyInput, setBountyInput] = useState('50')

  const offerBounty = async () => {
    const amount = parseInt(bountyInput, 10)
    if (!amount || amount <= 0) { setBountyMsg('Informe um valor válido de aura.'); return }
    setOfferingBounty(true)
    const { data, error } = await supabase.rpc('offer_bounty', { p_question_id: question.id, p_amount: amount })
    setOfferingBounty(false)
    if (error || !data?.success) {
      setBountyMsg(data?.error ?? 'Erro ao oferecer recompensa.')
      return
    }
    setBountyAmount(amount)
    setShowBountyForm(false)
    setBountyMsg(`Recompensa de ${amount} de aura oferecida! Vale por 14 dias.`)
  }

  const acceptAnswer = async (answerId: string) => {
    const { data, error } = await supabase.rpc('accept_answer_with_bounty', { p_answer_id: answerId })
    if (error || !data?.success) {
      setBountyMsg(data?.error ?? 'Erro ao aceitar resposta.')
      return
    }
    setAnswers(prev => prev.map(a => ({ ...a, is_accepted: a.id === answerId })))
    if (data.bounty_paid > 0) {
      setBountyMsg(`Recompensa de ${data.bounty_paid} de aura paga ao autor da resposta!`)
    }
  }

  const isQuestionAuthor = user?.id === question.author_id

  return (
    <>
      {bountyMsg && (
        <div className="mb-6 p-3 rounded-lg flex items-center justify-between gap-3"
          style={{ background: 'rgba(228,173,65,0.1)', border: '1px solid rgba(228,173,65,0.3)' }}>
          <p style={{ color: 'var(--color-gold)', fontSize: 13, fontFamily: 'var(--font-display)' }}>{bountyMsg}</p>
          <button onClick={() => setBountyMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>×</button>
        </div>
      )}

      {bountyAmount > 0 && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(228,173,65,0.15), rgba(228,173,65,0.05))',
            border: '1px solid rgba(228,173,65,0.35)' }}>
          <span style={{ fontSize: 28 }}>💰</span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--color-gold)' }}>
              Recompensa: {bountyAmount} de aura
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>
              {question.bounty_awarded
                ? 'Recompensa já paga.'
                : question.bounty_deadline
                  ? `Quem tiver a resposta aceita até ${new Date(question.bounty_deadline).toLocaleDateString('pt-BR')} leva a recompensa.`
                  : 'Aguardando aceite do autor.'}
            </p>
          </div>
        </div>
      )}

      {isQuestionAuthor && bountyAmount === 0 && !question.is_solved && (
        <div className="mb-6">
          {showBountyForm ? (
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Oferecer</span>
              <input type="number" min={1} value={bountyInput} onChange={e => setBountyInput(e.target.value)}
                style={{ width: 80, background: 'var(--color-surface2)', border: '1px solid var(--color-border)',
                  borderRadius: 6, padding: '6px 10px', color: 'var(--color-text)', fontSize: 14 }} />
              <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>de aura por uma resposta aceita</span>
              <button onClick={offerBounty} disabled={offeringBounty}
                style={{ padding: '7px 16px', borderRadius: 6, border: 'none', background: 'var(--color-gold)',
                  color: '#000', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                {offeringBounty ? 'Enviando...' : 'Confirmar'}
              </button>
              <button onClick={() => setShowBountyForm(false)}
                style={{ padding: '7px 12px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'none',
                  color: 'var(--color-muted)', fontSize: 13, cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={() => setShowBountyForm(true)}
              className="flex items-center gap-2"
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px dashed rgba(228,173,65,0.4)',
                background: 'rgba(228,173,65,0.06)', color: 'var(--color-gold)', fontSize: 13,
                fontFamily: 'var(--font-display)', cursor: 'pointer' }}>
              💰 Oferecer recompensa em aura
            </button>
          )}
        </div>
      )}

      {/* Question body */}
      <div className="flex gap-5 mb-10">
        <VoteButtons id={question.id} type="question" initialCount={question.vote_count} />
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>
                Editar pergunta
              </h3>
              <QuestionForm
                mode="edit"
                questionId={question.id}
                initialTitle={question.title}
                initialBody={question.body}
                initialImageUrl={question.image_url}
                initialTagIds={(question.question_tags ?? []).map((qt: any) => qt.tags?.id).filter(Boolean)}
                onCancel={() => setIsEditing(false)}
                onSaved={() => { setIsEditing(false); router.refresh() }}
              />
            </div>
          ) : (
            <div className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {isQuestionAuthor && (
                <div className="flex justify-end mb-3">
                  <button onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 text-xs px-3 py-1 rounded"
                    style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)',
                      color: 'var(--color-muted)', fontFamily: 'var(--font-display)', cursor: 'pointer' }}>
                    <Pencil size={12} /> Editar
                  </button>
                </div>
              )}
              <MathText text={question.body} />
              {question.image_url && (
                <img src={question.image_url} alt="Imagem da pergunta"
                  style={{ maxWidth: '100%', borderRadius: 8, marginTop: 16, border: '1px solid var(--color-border)' }} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Answers */}
      {answers.length > 0 && (
        <div className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
            color: 'var(--color-text)', marginBottom: 16 }}>
            {answers.length} {answers.length === 1 ? 'Resposta' : 'Respostas'}
          </h2>
          <div className="flex flex-col gap-5">
            {answers.map((answer: any) => (
              <div key={answer.id} className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <VoteButtons id={answer.id} type="answer" initialCount={answer.vote_count} />
                  {answer.is_accepted ? (
                    <CheckCircle size={24} style={{ color: '#34D399' }} />
                  ) : isQuestionAuthor && !question.is_solved ? (
                    <button onClick={() => acceptAnswer(answer.id)} title="Marcar como aceita"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                      <CheckCircle size={24} style={{ color: 'var(--color-border)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#34D399')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-border)')} />
                    </button>
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="p-6 rounded-xl" style={{
                    background: 'var(--color-surface)',
                    border: `1px solid ${answer.is_accepted ? 'rgba(52,211,153,0.3)' : 'var(--color-border)'}`,
                  }}>
                    <MathText text={answer.body} />
                    <div className="mt-4 pt-3 flex items-center gap-3"
                      style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)' }}>
                      {answer.is_accepted && (
                        <span style={{ color: '#34D399', fontWeight: 600 }}>✓ Aceita</span>
                      )}
                      <span>{answer.author?.display_name ?? 'Anônimo'}</span>
                      <span>{timeAgo(answer.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Answer form */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
        <AnswerForm questionId={question.id} onSubmitted={addAnswer} />
      </div>
    </>
  )
}
