'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, RotateCcw, BookOpen } from 'lucide-react'
import 'katex/dist/katex.min.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Explique conservação de energia com um exemplo olímpico',
  'Como resolver circuitos RC no regime transitório?',
  'Qual a diferença entre modos normais e batimentos em osciladores acoplados?',
  'Derive a fórmula do período do pêndulo simples',
]

// Renders text with LaTeX: $inline$ and $$block$$
function MathText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    import('katex').then(katex => {
      if (!ref.current) return
      const html = text
        .replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
          try {
            return katex.default.renderToString(expr.trim(), { displayMode: true, throwOnError: false })
          } catch { return expr }
        })
        .replace(/\$([^\n$]+?)\$/g, (_, expr) => {
          try {
            return katex.default.renderToString(expr.trim(), { displayMode: false, throwOnError: false })
          } catch { return expr }
        })
        // Basic markdown: **bold**, `code`, line breaks
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(201,162,39,0.12);padding:1px 5px;border-radius:3px;font-size:0.9em">$1</code>')
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
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
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

      if (!res.ok || !res.body) throw new Error('Erro na resposta')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        full += chunk
        setStreamingText(full)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: full }])
      setStreamingText('')
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Verifique sua conexão e tente novamente.',
      }])
      setStreamingText('')
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const reset = () => {
    setMessages([])
    setStreamingText('')
    setInput('')
  }

  const isEmpty = messages.length === 0 && !streamingText

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>

      {/* Header */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '12px 24px' }}
        className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(201,162,39,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
            <BookOpen size={18} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>
              Tutor Olímpico
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>
              Física ITA · IME · OBF · IPhO
            </p>
          </div>
        </div>
        <button onClick={reset} title="Nova conversa"
          className="flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors"
          style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          <RotateCcw size={14} /> Nova conversa
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* Welcome */}
          {isEmpty && (
            <div className="text-center py-12">
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,162,39,0.1)',
                border: '1px solid rgba(201,162,39,0.3)', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                ⚛
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Olá! Sou o Tutor Olímpico.
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: 15, maxWidth: 420, margin: '0 auto 2rem' }}>
                Tire dúvidas, resolva problemas e explore física em nível olímpico. Suporte a LaTeX incluso.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="p-3 rounded-lg text-left text-sm transition-all"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  marginRight: 10, marginTop: 4, fontSize: 14 }}>
                  ⚛
                </div>
              )}
              <div className="max-w-[80%] px-4 py-3 rounded-2xl"
                style={{
                  background: msg.role === 'user' ? 'var(--color-gold)' : 'var(--color-surface)',
                  color: msg.role === 'user' ? '#0D0D1A' : 'var(--color-text)',
                  border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                  fontSize: 15, lineHeight: 1.7,
                }}>
                {msg.role === 'assistant'
                  ? <MathText text={msg.content} />
                  : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
                }
              </div>
            </div>
          ))}

          {/* Streaming response */}
          {streamingText && (
            <div className="flex justify-start">
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                marginRight: 10, marginTop: 4, fontSize: 14 }}>
                ⚛
              </div>
              <div className="max-w-[80%] px-4 py-3 rounded-2xl"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text)', fontSize: 15, lineHeight: 1.7 }}>
                <MathText text={streamingText} />
                <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--color-gold)',
                  marginLeft: 2, borderRadius: 2, animation: 'pulse 1s infinite' }} />
              </div>
            </div>
          )}

          {/* Loading dots */}
          {loading && !streamingText && (
            <div className="flex justify-start">
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                marginRight: 10, fontSize: 14 }}>⚛</div>
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-muted)', fontSize: 20, letterSpacing: 4 }}>···</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '16px 24px' }}>
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Faça uma pergunta de física... (Enter para enviar, Shift+Enter para nova linha)"
            rows={1}
            style={{
              flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-border)',
              color: 'var(--color-text)', borderRadius: 12, padding: '12px 16px', fontSize: 15,
              resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: 200, overflowY: 'auto',
              fontFamily: 'var(--font-body)',
            }}
            onInput={e => {
              const t = e.currentTarget
              t.style.height = 'auto'
              t.style.height = Math.min(t.scrollHeight, 200) + 'px'
            }}
          />
          <button onClick={() => send(input)} disabled={loading || !input.trim()}
            style={{
              background: input.trim() && !loading ? 'var(--color-gold)' : 'var(--color-surface2)',
              color: input.trim() && !loading ? '#0D0D1A' : 'var(--color-muted)',
              border: 'none', borderRadius: 12, width: 48, height: 48, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
            }}>
            <Send size={18} />
          </button>
        </div>
        <p className="text-center mt-2" style={{ color: 'var(--color-muted)', fontSize: 11 }}>
          Suporta LaTeX: use $...$ para fórmulas inline e $$...$$ para equações em destaque
        </p>
      </div>
    </div>
  )
}
