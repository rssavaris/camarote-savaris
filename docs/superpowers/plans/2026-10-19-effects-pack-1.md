# Efeitos Pacote 1 — Plano

**Estado base (2026-10-19):** `npm run build` passa (7 rotas). `GlitterParticles.tsx` não é usado em lugar nenhum (código morto).

**Regras de todos os efeitos:**
- Respeitar `prefers-reduced-motion` (desligar ou simplificar).
- Efeitos de mouse (cursor, tilt, magnético) só com `(hover: hover) and (pointer: fine)`, ou seja, desktop. Mobile fica leve.
- Sem dependência nova além de `lenis`. O resto é React e CSS puros.
- Cada task termina com `npm run build` verde e commit.

---

### Task 1: Limpeza
- [ ] Remover `src/components/GlitterParticles.tsx`.
- [ ] Adicionar `camarote-savaris/` e `img/` ao `.gitignore` (cópias, não são fonte). Confirmar com o usuário antes de apagar qualquer coisa.
- [ ] `git checkout next-env.d.ts` se a mudança for só de formatação.

### Task 2: Scroll suave (Lenis)
- [ ] `npm i lenis`
- [ ] Criar `src/components/SmoothScroll.tsx` (client): instancia `Lenis`, loop em `requestAnimationFrame`, `destroy()` no cleanup. Não ativar com reduced-motion.
- [ ] Montar em `src/app/layout.tsx` dentro do `<body>`.
- [ ] Checar que `NavBar` fixa e âncoras continuam funcionando.

### Task 3: Cursor com trilha de brilho
- [ ] Criar `src/components/SparkleCursor.tsx`: canvas fixo `pointer-events:none`, `z-index` acima do conteúdo e abaixo de modais.
- [ ] Ao mover o mouse, gera estrelas de 4 pontas (mesmo desenho do `GlitterBg`) em cores arco-íris (`#00d4ff #7b61ff #ff3399 #ffd700 #39ff14`). Cada uma sobe um pouco e some em ~700ms. Limitar a ~60 partículas vivas.
- [ ] Só desktop (`pointer: fine`) e sem reduced-motion.
- [ ] Montar no `layout.tsx`.

### Task 4: Marquee neon
- [ ] Criar `src/components/NeonMarquee.tsx`: faixa infinita em CSS puro (duas cópias do conteúdo + `@keyframes` com `translateX(-50%)`). Texto: `✦ 08.02.2027 ✦ CAMAROTE SAVARIS ✦ 40 TONS DE GLITTER ✦ BRILHE SEM MODERAÇÃO`.
- [ ] Visual: texto com gradiente arco-íris, glow, bordas finas douradas. Pausa no hover. Reduced-motion: estático.
- [ ] Inserir em `src/app/page.tsx` entre o Hero e a próxima seção.

### Task 5: Botões magnéticos
- [ ] Criar `src/components/Magnetic.tsx`: wrapper que move o filho até ~8px em direção ao cursor (`mousemove` no wrapper, volta com transição no `mouseleave`).
- [ ] Aplicar nos dois CTAs do `Hero.tsx` e no CTA final de `presentes/page.tsx`.

### Task 6: Tilt 3D + brilho holográfico nos cards
- [ ] Criar `src/components/TiltCard.tsx`: `perspective(800px) rotateX/rotateY` (máx ±8°) conforme o mouse. Camada de brilho: `conic-gradient` arco-íris com `mix-blend-mode: color-dodge` e baixa opacidade, posicionada pela posição do mouse via variáveis CSS `--mx/--my`.
- [ ] Em `presentes/page.tsx`, trocar os handlers inline `onMouseEnter/Leave` do card por `TiltCard`. Manter o `translateY` e o glow atuais.
- [ ] Usar também nos 4 info-cards do `Hero.tsx` (sem exagero: rotação máx ±5°).

### Task 7: Verificação final
- [ ] `npm run build` verde.
- [ ] `npm run dev` e olhar no navegador: home, presentes, inscrição e admin. Console sem erros, FPS ok.
- [ ] Testar viewport mobile (375px): efeitos de mouse desligados, sem scroll horizontal.
- [ ] Testar com `prefers-reduced-motion: reduce`.

---

## Fica para depois (Pacote 2)
- Aurora WebGL (OGL) substituindo parte do `GlitterBg`.
- Reveal de texto com GSAP ScrollTrigger nos títulos.
- Campo de partículas Three.js no Hero (só se o canvas atual não bastar).
