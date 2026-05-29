# Camarote Savaris — Redesign Visual Carnival

**Data:** 2026-05-28  
**Status:** Aprovado pelo usuário

## Direção Visual

Baseado nas imagens de referência dos flyers "40 Tons de Glitter" e "Camarote Savaris". Estilo: carnaval luxo neon — fundo preto puro, letras multicolor com partículas de glitter, dourado metálico 3D, ondas neon arco-íris animadas, fogos, poeira de glitter.

## Sistema de Fundo (Background Stack)

Todas as páginas compartilham o mesmo sistema de fundo fixo via `<GlitterBg />`:

1. **Wash de cor** — `position:fixed`, radial-gradients sobrepostos (pink/roxo/gold/cyan/verde)
2. **Ondas neon** — canvas animado, 6 linhas senoidais arco-íris com glow
3. **Fogos** — canvas animado, partículas explosivas coloridas a cada 900ms
4. **Poeira glitter** — canvas, 130 partículas subindo com fade in/out
5. **Feixes de prisma** — 3 `div` com gradiente linear rotacionado, animação translate

## Título "40 TONS DE GLITTER"

Componente `<GlitterTitle />` — canvas HTML2D:

- Fonte: **Titan One** (Google Fonts) + fallback Impact/serif
- Letras renderizadas via `fillText` com:
  - Sombra 3D (offset 3px preto)
  - Glow neon 2 passes (shadowBlur 28 + 10)
  - Partículas animadas dentro de cada letra via `source-atop` composite
  - Cores por letra arco-íris: `#00d4ff #7b61ff #ff3399 #ff1744 #ff6b35 #ffd700 #39ff14`
- Canvas responsivo, reescalado em resize
- Aguarda `document.fonts.ready` antes de renderizar

## Marca "CAMAROTE SAVARIS"

- **"Camarote"** — Cinzel 900, letter-spacing 0.7em, gradiente gold (`#836D30 → #FFE699 → #836D30`) via background-clip text
- **Coroa** — SVG inline, gradiente gold, gems coloridas (pink/cyan/roxo), filter drop-shadow animado
- **"SAVARIS"** — Cinzel 900, 76px, gradiente metálico 9-stop, filter drop-shadow

## Elementos Decorativos

- **"Brilhe sem moderação."** — Dancing Script 700, gradiente arco-íris animado (background-clip text)
- **Máscara carnaval** — SVG inline, plumas bezier em 7 cores, corpo dourado, gemas coloridas, animação float
- **Frame neon quote** — border 2px `rgba(255,51,153,0.6)`, box-shadow neon, backdrop-blur
- **Data neon** — cor `#ff3399`, text-shadow multi-camada, animação flickering
- **CTA** — gradiente arco-íris animado, border-radius 50px, box-shadow neon

## Componentes Novos / Modificados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/components/GlitterBg.tsx` | CRIAR | Canvas background stack (waves+fw+dust+prisms) |
| `src/components/GlitterTitle.tsx` | CRIAR | Canvas glitter text "40 TONS DE GLITTER" |
| `src/components/CrownSVG.tsx` | CRIAR | SVG coroa animada |
| `src/components/MaskSVG.tsx` | CRIAR | SVG máscara de carnaval |
| `src/app/globals.css` | ATUALIZAR | Vars CSS, @font-face Titan One, utilities neon |
| `src/app/layout.tsx` | ATUALIZAR | Incluir `<GlitterBg />` |
| `src/app/page.tsx` | REESCREVER | Hero com novos componentes, countdown, bandas |
| `src/components/NavBar.tsx` | ATUALIZAR | Aplicar visual system (neon, gold) |
| `src/components/Footer.tsx` | ATUALIZAR | Aplicar visual system |
| `src/components/GlitterParticles.tsx` | DEPRECAR | Substituído por GlitterBg |
| `src/app/presentes/page.tsx` | ATUALIZAR | Cards com glass + border neon, header style |
| `src/app/inscricao/page.tsx` | ATUALIZAR | Form com glass + border neon |
| `src/app/admin/page.tsx` | ATUALIZAR | Tabela dark com accents neon |

## Fonte Glitter

Arquivo `glitter_font/GLITF___.TTF` disponível localmente. Copiar para `public/fonts/`. Uso limitado — nome da fonte simples sem textura real. Usar para elementos secundários se quiser estilo diferente.

## Paleta

```
--neon-pink:   #ff3399
--neon-cyan:   #00d4ff
--neon-purple: #7b61ff
--neon-green:  #39ff14
--neon-orange: #ff6b35
--neon-yellow: #ffd700
--neon-red:    #ff1744
--gold:        #C9A84C
--gold-light:  #FFE699
--gold-dark:   #836D30
--dark-bg:     #000000
--dark-card:   rgba(10,10,10,0.85)
```

## Fontes

- **Titan One** — Google Fonts — títulos glitter canvas
- **Cinzel 900** — Google Fonts — CAMAROTE / SAVARIS
- **Dancing Script 700** — Google Fonts — taglines cursivas
- **Inter** — Google Fonts — corpo, UI
- **GlitterFont** — local `public/fonts/GLITF___.TTF` — decorativo

## Responsividade

- Canvas title: escala pelo `clientWidth` do container
- SAVARIS: `font-size: clamp(48px, 12vw, 76px)`
- Grid presentes: 1 col mobile → 2 col tablet → 3 col desktop
- NavBar: hamburger em mobile (já implementado)

## Não mudar

- Lógica RSVP e API route (`/api/confirm`)
- Dados de presentes e bandas
- Estrutura de páginas App Router
- Admin table logic
