# Nível Olímpico — Next.js + Supabase

Clone do [nivelolimpico.com.br](https://www.nivelolimpico.com.br) construído com:

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Supabase** (Auth, PostgreSQL, Storage)
- **Vercel** (deploy recomendado)

## Início rápido

### 1. Clone e instale

```bash
git clone <seu-repo>
cd nivel-olimpico
npm install
```

### 2. Configure o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e cole o conteúdo de `supabase/schema.sql`
3. Em **Settings → API**, copie a URL e a anon key

### 3. Variáveis de ambiente

```bash
cp .env.local.example .env.local
# Preencha com suas chaves do Supabase
```

### 4. Rode localmente

```bash
npm run dev
# http://localhost:3000
```

### 5. Deploy no Vercel

```bash
npx vercel
# Adicione as variáveis de ambiente no painel do Vercel
```

## Estrutura

```
app/
├── page.tsx           → Home
├── livros/            → Catálogo de livros
├── simulacoes/        → PhysSim
├── blog/              → Blog Olímpico
├── grupos/            → Grupos de discussão
├── links/             → Links úteis
├── contato/           → Formulário de contato
├── login/             → Autenticação
└── members/           → Área de membros (protegida)

components/
├── Navbar.tsx
└── Footer.tsx

lib/supabase/
├── client.ts          → Client-side Supabase
└── server.ts          → Server-side Supabase

supabase/
└── schema.sql         → Execute no Supabase SQL Editor

middleware.ts          → Proteção de rotas autenticadas
```

## Adicionar simulações PhysSim

Coloque os arquivos `.html` em `public/sims/` e ajuste os links em `app/simulacoes/page.tsx`.
No Vercel eles serão servidos como arquivos estáticos — muito mais rápido que no Wix.

## Próximos passos sugeridos

- [ ] Adicionar autenticação com magic link (sem senha)
- [ ] Integrar formulário de contato com [Resend](https://resend.com)
- [ ] Blog com suporte a LaTeX via KaTeX
- [ ] Tutor de física com Claude API
