"use client"


export default function ContatoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--color-text)', marginBottom: '0.75rem' }}>Contato</h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Dúvidas sobre cursos, livros ou parcerias? Envie uma mensagem.
      </p>

      <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
        {[
          { id: 'nome',     label: 'Nome',    type: 'text',  placeholder: 'Seu nome' },
          { id: 'email',    label: 'Email',   type: 'email', placeholder: 'seu@email.com' },
        ].map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} style={{ display: 'block', color: 'var(--color-muted)', fontSize: 13, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {field.label}
            </label>
            <input id={field.id} type={field.type} placeholder={field.placeholder}
              style={{ width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)',
                borderRadius: 6, padding: '10px 14px', fontSize: 15, outline: 'none' }} />
          </div>
        ))}
        <div>
          <label htmlFor="mensagem" style={{ display: 'block', color: 'var(--color-muted)', fontSize: 13, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Mensagem
          </label>
          <textarea id="mensagem" rows={6} placeholder="Escreva sua mensagem..."
            style={{ width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)',
              borderRadius: 6, padding: '10px 14px', fontSize: 15, outline: 'none', resize: 'vertical' }} />
        </div>
        <button type="submit"
          style={{ background: 'var(--color-gold)', color: '#0D0D1A', border: 'none', borderRadius: 6,
            padding: '12px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
          Enviar mensagem
        </button>
      </form>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: '0.5rem' }}>Ou pelo WhatsApp:</p>
        <a href="https://wa.me/5512988616486" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--color-gold)', fontSize: 16, fontWeight: 500 }}>
          +55 12 98861-6486
        </a>
      </div>
    </div>
  )
}
