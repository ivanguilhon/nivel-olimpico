'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, RotateCcw, BookOpen } from 'lucide-react'
import 'katex/dist/katex.min.css'

interface Message { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'Conservação de energia em um pêndulo simples',
  'Como resolver circuitos RC no regime transitório?',
  'Modos normais de osciladores acoplados',
  'Derive o período do pêndulo para grandes ângulos',
]

function MathText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    import('katex').then(katex => {
      if (!ref.current) return
      const html = text
        .replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
          try { return katex.default.renderToString(expr.trim(), { displayMode: true, throwOnError: false }) }
          catch { return expr }
        })
        .replace(/\$([^\n$]+?)\$/g, (_, expr) => {
          try { return katex.default.renderToString(expr.trim(), { displayMode: false, throwOnError: false }) }
          catch { return expr }
        })
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/^## (.+)$/gm, '<br><strong style="font-size:1.05em;color:var(--color-text)">$1</strong><br>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(228,173,65,0.12);padding:1px 5px;border-radius:3px;font-size:0.88em">$1</code>')
        .replace(/\n/g, '<br/>')
      ref.current.innerHTML = html
    })
  }, [text])
  return <div ref={ref} />
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    setError(null)
    const userMsg: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const contentType = res.headers.get('content-type') ?? ''

      // JSON = error response
      if (contentType.includes('application/json') || !res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erro desconhecido na API.')
        setMessages(prev => prev.slice(0, -1)) // remove user message on error
        setLoading(false)
        return
      }

      if (!res.body) throw new Error('Resposta sem corpo.')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setStreamingText(full)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: full }])
      setStreamingText('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>

      {/* Header */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '12px 24px' }}
        className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(228,173,65,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
            <BookOpen size={18} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>Tutor Olímpico</p>
            <p style={{ color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)' }}>ITA · IME · OBF · IPhO — com LaTeX</p>
          </div>
        </div>
        <button onClick={() => { setMessages([]); setStreamingText(''); setInput(''); setError(null) }}
          className="flex items-center gap-2 px-3 py-2 rounded text-sm"
          style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-display)' }}>
          <RotateCcw size={13} /> Nova conversa
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-6 py-3 text-sm" style={{ background: 'rgba(220,50,50,0.1)', borderBottom: '1px solid rgba(220,50,50,0.3)', color: '#ff6b6b' }}>
          ⚠ {error}
          {error.includes('ANTHROPIC_API_KEY') && (
            <span> — Adicione <code>ANTHROPIC_API_KEY</code> nas variáveis de ambiente do Vercel.</span>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {messages.length === 0 && !streamingText && (
            <div className="text-center py-12">
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(228,173,65,0.1)',
                border: '1px solid rgba(228,173,65,0.3)', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={28} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Tutor Olímpico
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: 15, maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Pergunte qualquer coisa de física. Resolvo com LaTeX, passo a passo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="p-3 rounded-lg text-left text-sm transition-all"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-display)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(228,173,65,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10, marginTop: 4 }}>
                  <BookOpen size={14} style={{ color: 'var(--color-gold)' }} />
                </div>
              )}
              <div className="max-w-[80%] px-4 py-3 rounded-2xl"
                style={{
                  background: msg.role === 'user' ? 'var(--color-gold)' : 'var(--color-surface)',
                  color: msg.role === 'user' ? '#000' : 'var(--color-text)',
                  border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                  fontSize: 15, lineHeight: 1.7,
                }}>
                {msg.role === 'assistant' ? <MathText text={msg.content} /> : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>}
              </div>
            </div>
          ))}

          {streamingText && (
            <div className="flex justify-start">
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(228,173,65,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10, marginTop: 4 }}>
                <BookOpen size={14} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div className="max-w-[80%] px-4 py-3 rounded-2xl"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)', fontSize: 15, lineHeight: 1.7 }}>
                <MathText text={streamingText} />
                <span style={{ display: 'inline-block', width: 7, height: 14, background: 'var(--color-gold)', marginLeft: 2, borderRadius: 2, opacity: 0.8 }} />
              </div>
            </div>
          )}

          {loading && !streamingText && (
            <div className="flex justify-start">
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(228,173,65,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 10 }}>
                <BookOpen size={14} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-muted)', fontSize: 22, letterSpacing: 6 }}>···</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '16px 24px' }}>
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea ref={textareaRef} value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Pergunta de física... (Enter envia, Shift+Enter quebra linha)"
            rows={1}
            style={{ flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-border)',
              color: 'var(--color-text)', borderRadius: 10, padding: '12px 16px', fontSize: 15,
              resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: 180, overflowY: 'auto',
              fontFamily: 'var(--font-body)' }}
            onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 180) + 'px' }}
          />
          <button onClick={() => send(input)} disabled={loading || !input.trim()}
            style={{ background: input.trim() && !loading ? 'var(--color-gold)' : 'var(--color-surface2)',
              color: input.trim() && !loading ? '#000' : 'var(--color-muted)',
              border: 'none', borderRadius: 10, width: 46, height: 46, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
            <Send size={17} />
          </button>
        </div>
        <p className="text-center mt-2" style={{ color: 'var(--color-muted)', fontSize: 11, fontFamily: 'var(--font-display)' }}>
          LaTeX: $inline$ · $$bloco$$
        </p>
      </div>
    </div>
  )
}
