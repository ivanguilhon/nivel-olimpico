'use client'
import { useEffect, useRef } from 'react'
import 'katex/dist/katex.min.css'

interface MathTextProps {
  text: string
  className?: string
}

export default function MathText({ text, className }: MathTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !text) return
    import('katex').then(katex => {
      if (!ref.current) return
      const html = text
        // Block math $$...$$
        .replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
          try { return katex.default.renderToString(expr.trim(), { displayMode: true, throwOnError: false }) }
          catch { return `<code>$$${expr}$$</code>` }
        })
        // Inline math $...$
        .replace(/\$([^\n$]+?)\$/g, (_, expr) => {
          try { return katex.default.renderToString(expr.trim(), { displayMode: false, throwOnError: false }) }
          catch { return `<code>$${expr}$</code>` }
        })
        // Markdown-lite
        .replace(/^### (.+)$/gm, '<h3 style="font-family:var(--font-display);font-size:17px;font-weight:700;color:var(--color-text);margin:1.5rem 0 0.5rem">$1</h3>')
        .replace(/^## (.+)$/gm,  '<h2 style="font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--color-text);margin:1.5rem 0 0.75rem">$1</h2>')
        .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--color-text)">$1</strong>')
        .replace(/\*(.+?)\*/g,     '<em>$1</em>')
        .replace(/`([^`]+)`/g,     '<code style="background:rgba(228,173,65,0.12);padding:1px 5px;border-radius:3px;font-size:0.88em;font-family:monospace">$1</code>')
        .replace(/^[-*] (.+)$/gm,  '<li style="margin-bottom:4px;color:var(--color-muted)">$1</li>')
        .replace(/(<li[^>]*>[\s\S]*?<\/li>(\n)?)+/g, s => `<ul style="padding-left:1.5rem;margin:0.75rem 0;list-style:disc">${s}</ul>`)
        .replace(/\n\n/g, '</p><p style="margin-bottom:0.75rem;color:var(--color-muted);font-size:15px;line-height:1.8">')
        .replace(/\n/g, '<br/>')

      ref.current.innerHTML = `<p style="margin-bottom:0.75rem;color:var(--color-muted);font-size:15px;line-height:1.8">${html}</p>`
    })
  }, [text])

  return <div ref={ref} className={className} />
}
