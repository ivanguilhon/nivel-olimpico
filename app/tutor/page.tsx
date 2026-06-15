'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, RotateCcw, BookOpen, LogIn } from 'lucide-react'
import Link from 'next/link'
import 'katex/dist/katex.min.css'

interface Message { role: 'user' | 'assistant'; content: string }
interface Usage { remaining: number; used: number; limit: number }

const SUGGESTIONS = [
  'Conservação de energia em um pêndulo simples',
  'Como resolver circuitos RC no transitório?',
  'Modos normais de osciladores acoplados',
  'Princípio de Arquimedes — exemplo olímpico',
]

// Parses the \x00{json}\x00 usage header that comes no início do stream
function extractUsage(chunk: string): { usage: Usage | null; text: string } {
  const match = chunk.match(/\x00(\{[^\x00]+\})\x00([\s\S]*)/)
  if (match) {
    try { return { usage: JSON.parse(match[1]), text: match[2] } }
    catch { /* ignore */ }
  }
  return { usage: null, text: chunk }
}

function MathText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    import('katex').then(katex => {
      if (!ref.current) return
      const html = text
        .replace(/\$\$([\s\S]+?)\$\$/g, (_, e) => {
          try { return katex.default.renderToString(e.trim(), { displayMode: true, throwOnError: false }) }
          catch { return e }
        })
        .replace(/\$([^\n$]+?)\$/g, (_, e) => {
          try { return katex.default.renderToString(e.trim(), { displayMode: false, throwOnError: false }) }
          catch { return e }
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

function UsageBar({ usage }: { usage: Usage }) {
  const pct = Math.round((usage.used / usage.limit) * 100)
  const color = pct >= 90 ? '#ff6b6b' : pct >= 70 ? '#ffa94d' : 'var(--color-gold)'
  return (
    <div className="flex items-center gap-3">
      <div style={{ flex: 1, height: 4, background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.4s' }} />
      </div>
      <span style={{ color: 'var(--color-muted)', fontSize: 11, whiteSpace: 'nowrap', fontFamily: 'var(--font-display)' }}>
        {usage.used}/{usage.limit} hoje
      </span>
    </div>
  )
}

export default function TutorPage() {
  const [messages, setMessages]       = useState<Message[]>([])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [streamingText, setStreaming] = useState('')
  const [error, setError]             = useState<string | null>(null)
  const [errorCode, setErrorCode]     = useState<string | null>(null)
  const [usage, setUsage]             = useState<Usage | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, streamingText])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    setError(null); setErrorCode(null)
    const userMsg: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setStreaming('')

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const ct = res.headers.get('content-type') ?? ''

      if (ct.includes('application/json') || !res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erro desconhecido.')
        setErrorCode(data.code ?? null)
        setMessages(prev => prev.slice(0, -1))
        setLoading(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''
      let usageParsed = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        if (!usageParsed) {
          const { usage: u, text } = extractUsage(full + chunk)
          if (u) { setUsage(u); full = text; usageParsed = true }
          else { full += chunk }
        } else {
          full += chunk
        }
        setStreaming(full)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: full }])
      setStreaming('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  const isUnauth   = errorCode === 'UNAUTHENTICATED'
  const isLimited  = errorCode === 'RATE_LIMITED'

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>

      {/* Header */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '12px 24px' }}
        className="flex items-center gap-4">
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(228,173,65,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>
          <BookOpen size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--color-text)' }}>
            Tutor Olímpico
          </p>
          {usage
            ? <UsageBar usage={usage} />
            : <p style={{ color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-display)' }}>ITA · IME · OBF · IPhO</p>
          }
        </div>
        <button onClick={() => { setMessages([]); setStreaming(''); setInput(''); setError(null); setErrorCode(null) }}
          className="flex items-center gap-2 px-3 py-2 rounded text-sm flex-shrink-0"
          style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-display)' }}>
          <RotateCcw size={13} /> Nova
        </button>
      </div>

      {/* Error / status banners */}
      {error && (
        <div className="px-6 py-3" style={{ background: isLimited ? 'rgba(228,173,65,0.08)' : 'rgba(220,50,50,0.08)', borderBottom: `1px solid ${isLimited ? 'rgba(228,173,65,0.2)' : 'rgba(220,50,50,0.2)'}` }}>
          {isUnauth ? (
            <div className="flex items-center justify-between gap-4">
              <p style={{ color: 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-display)' }}>
                Faça login para usar o Tutor Olímpico.
              </p>
              <Link href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold flex-shrink-0"
                style={{ background: 'var(--color-gold)', color: '#000', fontFamily: 'var(--font-display)' }}>
                <LogIn size={14} /> Entrar
              </Link>
            </div>
          ) : (
            <p style={{ color: isLimited ? 'var(--color-gold)' : '#ff6b6b', fontSize: 14, fontFamily: 'var(--font-display)' }}>
              {isLimited ? '🔒 ' : '⚠ '}{error}
            </p>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {messages.length === 0 && !streamingText && !isUnauth && (
            <div className="text-center py-12">
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(228,173,65,0.1)',
                border: '1px solid rgba(228,173,65,0.25)', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={28} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Tutor Olímpico
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: 15, maxWidth: 380, margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Pergunte qualquer coisa de física. Resolvo com LaTeX, passo a passo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="p-3 rounded-lg text-left text-sm"
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
                  background:  msg.role === 'user' ? 'var(--color-gold)' : 'var(--color-surface)',
                  color:       msg.role === 'user' ? '#000' : 'var(--color-text)',
                  border:      msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                  fontSize: 15, lineHeight: 1.7,
                }}>
                {msg.role === 'assistant'
                  ? <MathText text={msg.content} />
                  : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
                }
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
                <span style={{ display: 'inline-block', width: 7, height: 14, background: 'var(--color-gold)', marginLeft: 2, borderRadius: 2 }} />
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
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder={isUnauth ? 'Faça login para usar o tutor…' : isLimited ? 'Limite diário atingido. Volte amanhã.' : 'Pergunta de física… (Enter envia, Shift+Enter quebra linha)'}
            disabled={isUnauth || isLimited}
            rows={1}
            style={{ flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-border)',
              color: 'var(--color-text)', borderRadius: 10, padding: '12px 16px', fontSize: 15,
              resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: 180, overflowY: 'auto',
              fontFamily: 'var(--font-body)', opacity: (isUnauth || isLimited) ? 0.5 : 1 }}
            onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 180) + 'px' }}
          />
          <button onClick={() => send(input)}
            disabled={loading || !input.trim() || isUnauth || isLimited}
            style={{ background: (input.trim() && !loading && !isUnauth && !isLimited) ? 'var(--color-gold)' : 'var(--color-surface2)',
              color:  (input.trim() && !loading && !isUnauth && !isLimited) ? '#000' : 'var(--color-muted)',
              border: 'none', borderRadius: 10, width: 46, height: 46,
              cursor: (loading || !input.trim() || isUnauth || isLimited) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
            <Send size={17} />
          </button>
        </div>
        <p className="text-center mt-2" style={{ color: 'var(--color-muted)', fontSize: 11, fontFamily: 'var(--font-display)' }}>
          LaTeX: $inline$ · $$bloco$$ · Limite: {20} msg/dia por usuário
        </p>
      </div>
    </div>
  )
}
