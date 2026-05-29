# Camarote Savaris — 40 Tons de Glitter

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Landing page extravagante em Next.js 15 + TypeScript para evento de casamento/festa. Seções: Home (hero + countdown + bandas), Presentes (cards com Pagar.me), Inscrição (RSVP simples), Admin (painel de confirmações). Dark luxury + gold glitter.

**Architecture:** Next.js 15 App Router, TypeScript, TailwindCSS. Páginas via App Router (/, /presentes, /inscricao, /admin). Dados de confirmação em JSON file (simples, sem BD). Presentes com lista estática + integração Pagar.me (PIX em produção). Partículas de glitter em canvas/CSS.

**Tech Stack:** Next.js 15, TypeScript, TailwindCSS, Lucide React (ícones), Canvas/Framer Motion (glitter).

---

### Task 1: Scaffolding do projeto

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/presentes/page.tsx`
- Create: `src/app/inscricao/page.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/confirmations.json`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "40-tons-deglitter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.469.0",
    "framer-motion": "^11.15.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.4.19",
    "eslint": "^9",
    "eslint-config-next": "15.1.0"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Create tsconfig.json, tailwind.config.ts, postcss.config.js** (standard config files)

- [ ] **Step 4: Create globals.css** with dark theme, gold variables, glitter keyframes

- [ ] **Step 5: Create layout.tsx** with NavBar component, font, metadata

- [ ] **Step 6: Create all page files** as stubs (empty export default)

- [ ] **Step 7: Create empty confirmations.json**

- [ ] **Step 8: Run `npm install`**

Run: `cd "D:/next/40tonsdeglitter" && npm install`
Expected: install completes, node_modules created

---

### Task 2: Componentes base — NavBar e Footer

**Files:**
- Create: `src/components/NavBar.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/GlitterParticles.tsx`

- [ ] **Step 1: Create NavBar.tsx**
  - Links: Home / Presentes / Inscrição / Admin (com ícone de cave senha)
  - Logo: "40 Tons de Glitter" com ícone de star/sparkle
  - Background: transparente → blur/solid no scroll
  - Mobile: hamburger menu
  - gold text, dark background

- [ ] **Step 2: Create Footer.tsx**
  - "CAMAROTE SAVARIS ✨"
  - Data: 08/02/2026 — Club Fundo de Quintal — Porto Velho
  - Link para site do casamento

- [ ] **Step 3: Create GlitterParticles.tsx**
  - Canvas ou div absoluta com partículas douradas
  - Partículas pequenas, brilho sutil, animadas com CSS
  - Random positions, fade in/out

---

### Task 3: Home — Hero + Countdown + Bandas

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/CountdownTimer.tsx`
- Create: `src/components/BandasSection.tsx`

- [ ] **Step 1: Create HeroSection.tsx**
  - Background: dark gradient + glitter particles
  - Título: "CAMAROTE SAVARIS" (grande, gold, animacao)
  - Subtítulo: "40 Tons de Glitter apresenta"
  - Data: 08/02/2027 às 15h
  - Local: Club Fundo de Quintal — Porto Velho
  - CTA: "Quero meu abadá" → scroll ou link para /inscricao
  - Ícones de sparkle/glow ao redor

- [ ] **Step 2: Create CountdownTimer.tsx**
  - Countdown para 08/02/2027 15:00 BRT
  - dias / horas / minutos / segundos
  - Números grandes, gold, estilo flip animation
  - Dark card com borda gold

- [ ] **Step 3: Create BandasSection.tsx**
  - Título: "A TRIBO VAI COMPLETAR 🎤"
  - Cards por banda (mock data):
    - 16h — Alexsa e Convidados
    - 19h — Escola de Samba
    - 20h — Edineide Souza
  - Estilo card dark com borda gold, hover glow
  - "Garanta seu abadá →"

---

### Task 4: Página Presentes — Cards + Pagar.me

**Files:**
- Create: `src/app/presentes/page.tsx`
- Create: `src/components/PresenteCard.tsx`
- Create: `src/data/presentes.ts`
- Create: `src/components/PagarMeModal.tsx`

- [ ] **Step 1: Create presentes.ts** — lista de presentes com mock data:
  - Presente físico (panelas Jeditab, eletrodommésticos, etc.)
  - Presente experiência (mensagem no palco R$200, chuva de glitter R$150, etc.)
  - Cada item: id, nome, descricao, preco, tipo ("fisico"|"experiencia"), imagem

- [ ] **Step 2: Create PresenteCard.tsx**
  - Card dark com imagem placeholder (gradiente gold)
  - Nome, descrição curta, preço
  - Badge "Experiência" ou "Presente"
  - Botão "Presentear" ou "Quero essa experiência"
  - Hover: glow dourado

- [ ] **Step 3: Create PagarMeModal.tsx**
  - Modal com valor personalizável (default do card)
  - Nome do presenteador (input)
  - Email (input)
  - Mensagem (textarea, opcional)
  - Botão "Pagar com PIX" (mock — abrir link Pagar.me)
  - Em produção: integração real Pagar.me API
  - States: idle, loading, success, error

- [ ] **Step 4: Create presentes/page.tsx**
  - Hero mini com título "LISTA DE PRESENTES 🎁"
  - Grid de PresenteCard
  - Filtro: Todos / Experiências / Presentes
  - Estilo: grid 3 colunas, responsivo

---

### Task 5: Página Inscrição — Formulário RSVP

**Files:**
- Create: `src/app/inscricao/page.tsx`
- Create: `src/components/RSVPForm.tsx`
- Create: `src/lib/saveConfirmation.ts`

- [ ] **Step 1: Create saveConfirmation.ts**
  - Função que lê/grava confirmations.json
  - Adiciona nova confirmação com timestamp
  - Validação básica de campos

- [ ] **Step 2: Create RSVPForm.tsx**
  - Campos: Nome completo, Email, Telefone, Quantos acompanhantes (0-5)
  - Botão: "Confirmar presença"
  - Validação: todos campos obrigatórios exceto acompanhantes
  - API route: `src/app/api/confirm/route.ts`
  - States: idle, loading, success (mensagem "Sua presença foi confirmada! ✨"), error

- [ ] **Step 3: Create inscricao/page.tsx**
  - Hero mini: "CONFIRME SUA PRESENÇA ✨"
  - Info do passaporte: "1000 sorrisos em até 10x"
  - RSVPForm centralizado
  - Dress code info: Abadá obrigatório, muito brilho

- [ ] **Step 4: Create API route** — `src/app/api/confirm/route.ts`
  - POST: receber dados, salvar em confirmations.json
  - GET: listar todas (para admin)
  - Retornar JSON com sucesso/erro

---

### Task 6: Página Admin — Painel de Confirmações

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/components/AdminTable.tsx`
- Create: `src/app/api/confirm/route.ts`

- [ ] **Step 1: Create AdminTable.tsx**
  - Tabela dark-style com lista de confirmações
  - Colunas: Nome, Email, Telefone, Acompanhantes, Data
  - Busca/filtragem por nome
  - Exportar CSV

- [ ] **Step 2: Create admin/page.tsx**
  - "PAINEL CAMAROTE SAVARIS 🔐"
  - Filtro de busca
  - AdminTable
  - Contador: "X confirmados"
  - Botão exportar CSV
  - Não é protected por enquanto (futuro: senha simples)

---

### Task 7: Polish — animações, responsividade, ajustes finais

**Files:**
- Modify: todos os arquivos acima conforme necessário

- [ ] **Step 1: Adicionar animações de entrada**
  - Framer Motion fade-in + slide-up em todas seções
  - Stagger entre cards

- [ ] **Step 2: Responsividade**
  - Mobile: menu hamburger, grid 1 coluna, hero menor
  - Tablet: grid 2 colunas

- [ ] **Step 3: Ajustes finais**
  - Favicon (emoji ⭐)
  - Meta tags (title, description, OG image)
  - 404 page customizada
  - Scroll suave entre seções
