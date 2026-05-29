# Visual Redesign — Carnival Neon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign full site visual to carnival luxury neon style — canvas glitter title, neon waves bg, SVG crown + mask, gold metallic SAVARIS, rainbow animations throughout.

**Architecture:** GlitterBg (fixed canvas layers) in layout.tsx shared across all pages. GlitterTitle canvas component for "40 TONS DE GLITTER" on home hero. CrownSVG + MaskSVG as reusable SVG components. CSS vars + keyframes in globals.css. All pages updated to use glass-card + neon border system.

**Tech Stack:** Next.js 15 App Router, TypeScript, TailwindCSS, Canvas API, Google Fonts (Titan One, Cinzel, Dancing Script), SVG inline.

---

### Task 1: Copy font + update globals.css

**Files:**
- Create: `public/fonts/GLITF___.TTF` (copy from glitter_font/)
- Modify: `src/app/globals.css`

- [ ] **Step 1: Copy font file**

Run: `cp "D:/next/40tonsdeglitter/glitter_font/GLITF___.TTF" "D:/next/40tonsdeglitter/public/fonts/GLITF___.TTF"`

Create dir if needed: `mkdir -p "D:/next/40tonsdeglitter/public/fonts"`

- [ ] **Step 2: Replace globals.css entirely**

```css
@import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Cinzel:wght@900&family=Dancing+Script:wght@700&family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

@font-face {
  font-family: 'GlitterFont';
  src: url('/fonts/GLITF___.TTF') format('truetype');
}

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --neon-pink:   #ff3399;
  --neon-cyan:   #00d4ff;
  --neon-purple: #7b61ff;
  --neon-green:  #39ff14;
  --neon-orange: #ff6b35;
  --neon-yellow: #ffd700;
  --neon-red:    #ff1744;
  --gold:        #C9A84C;
  --gold-light:  #FFE699;
  --gold-dark:   #836D30;
  --dark-bg:     #000;
  --dark-card:   rgba(10,10,10,0.85);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: #000;
  color: #f5f5f5;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* Fonts */
.font-playfair { font-family: 'Playfair Display', serif; }
.font-cinzel   { font-family: 'Cinzel', serif; }
.font-dancing  { font-family: 'Dancing Script', cursive; }
.font-titan    { font-family: 'Titan One', cursive; }
.font-glitter  { font-family: 'GlitterFont', sans-serif; }

/* Gold text */
.text-gold       { color: var(--gold); }
.text-gold-light { color: var(--gold-light); }
.bg-gold         { background-color: var(--gold); }
.border-gold     { border-color: var(--gold); }

/* Gold gradient text */
.gold-gradient-text {
  background: linear-gradient(135deg, #C9A84C 0%, #FFE699 40%, #C9A84C 60%, #836D30 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Savaris metallic text */
.savaris-text {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  background: linear-gradient(135deg,
    #4a3208 0%, #836D30 12%, #C9A84C 26%, #FFE699 42%,
    #fffae0 50%, #FFE699 58%, #C9A84C 74%, #836D30 88%, #4a3208 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(201,168,76,0.7));
}

/* Camarote text */
.camarote-text {
  font-family: 'Cinzel', serif;
  font-weight: 900;
  background: linear-gradient(90deg, #836D30, #C9A84C, #FFE699, #C9A84C, #836D30);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Rainbow animated text */
.rainbow-text {
  background: linear-gradient(90deg, #ff3399, #ffd700, #00ffcc, #7b61ff, #ff3399);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbowShift 4s ease infinite;
}

/* Glass card */
.glass-card {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 51, 153, 0.2);
  position: relative;
}
.glass-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg,
    rgba(255,51,153,0.3), rgba(255,215,0,0.3),
    rgba(0,255,204,0.3), rgba(123,97,255,0.3));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s;
}
.glass-card:hover::before { opacity: 1; }

/* Gold border glow */
.gold-border-glow {
  border: 1px solid rgba(201,168,76,0.3);
  box-shadow: 0 0 15px rgba(201,168,76,0.1), inset 0 0 15px rgba(201,168,76,0.05);
}
.gold-border-glow:hover {
  border-color: rgba(201,168,76,0.6);
  box-shadow: 0 0 25px rgba(201,168,76,0.25), inset 0 0 20px rgba(201,168,76,0.1);
}

/* Neon pink border */
.neon-pink-border {
  border: 2px solid rgba(255,51,153,0.6);
  box-shadow: 0 0 25px rgba(255,51,153,0.3), inset 0 0 25px rgba(255,51,153,0.06);
}

/* Neon text shadows */
.neon-pink   { text-shadow: 0 0 10px rgba(255,51,153,0.8),  0 0 20px rgba(255,51,153,0.5),  0 0 40px rgba(255,51,153,0.3); }
.neon-gold   { text-shadow: 0 0 10px rgba(255,215,0,0.8),   0 0 20px rgba(255,215,0,0.5),   0 0 40px rgba(255,215,0,0.3); }
.neon-cyan   { text-shadow: 0 0 10px rgba(0,212,255,0.8),   0 0 20px rgba(0,212,255,0.5),   0 0 40px rgba(0,212,255,0.3); }
.neon-purple { text-shadow: 0 0 10px rgba(123,97,255,0.8),  0 0 20px rgba(123,97,255,0.5),  0 0 40px rgba(123,97,255,0.3); }

/* Date neon */
.date-neon {
  color: var(--neon-pink);
  text-shadow: 0 0 20px rgba(255,51,153,1), 0 0 40px rgba(255,51,153,0.7), 0 0 80px rgba(255,51,153,0.3);
  animation: neonFlicker 5s ease-in-out infinite;
}

/* Section divider */
.gold-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
}

/* CTA rainbow button */
.cta-rainbow {
  background: linear-gradient(90deg, #ff3399, #ff9f43, #ffd700, #00ffcc, #7b61ff, #ff3399);
  background-size: 300% 300%;
  animation: rainbowShift 4s ease infinite;
  box-shadow: 0 0 35px rgba(255,51,153,0.6), 0 0 70px rgba(255,215,0,0.3);
  color: #000;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  border-radius: 50px;
}

/* Background wash (used by GlitterBg) */
.bg-wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 15% 18%, rgba(255,51,153,0.35)  0%, transparent 45%),
    radial-gradient(ellipse at 85% 22%, rgba(123,97,255,0.35)  0%, transparent 45%),
    radial-gradient(ellipse at 50% 105%,rgba(255,215,0,0.28)   0%, transparent 50%),
    radial-gradient(ellipse at 0%  80%, rgba(0,212,255,0.22)   0%, transparent 40%),
    radial-gradient(ellipse at 100% 72%,rgba(57,255,20,0.18)   0%, transparent 40%);
  animation: washPulse 8s ease-in-out infinite;
}

/* Prism light streaks (used by GlitterBg) */
.prism {
  position: absolute;
  width: 250%;
  height: 3px;
  filter: blur(2px);
  opacity: 0.45;
  mix-blend-mode: screen;
}
.prism-1 {
  top: 18%; left: -75%;
  background: linear-gradient(90deg, transparent, #ff3399, #ffd700, transparent);
  transform: rotate(-18deg);
  animation: prismMove 14s linear infinite;
}
.prism-2 {
  top: 52%; left: -75%;
  background: linear-gradient(90deg, transparent, #00ffcc, #7b61ff, transparent);
  transform: rotate(-12deg);
  animation: prismMove 18s linear infinite reverse;
}
.prism-3 {
  top: 76%; left: -75%;
  background: linear-gradient(90deg, transparent, #ffd700, #ff3399, transparent);
  transform: rotate(-8deg);
  animation: prismMove 22s linear infinite;
}

/* Crown animation */
.crown-glow {
  animation: crownGlow 2.5s ease-in-out infinite;
}

/* Mask animation */
.mask-float {
  animation: maskFloat 4s ease-in-out infinite;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--gold-light); }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ── Keyframes ─────────────────────────────────────────── */
@keyframes rainbowShift {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0%   50%; }
}
@keyframes washPulse {
  0%, 100% { opacity: 0.8; }
  50%       { opacity: 1;   }
}
@keyframes prismMove {
  0%   { transform: translateX(-10%) rotate(-15deg); }
  100% { transform: translateX(18%)  rotate(-15deg); }
}
@keyframes crownGlow {
  0%, 100% {
    filter: drop-shadow(0 0 14px #ffd700) drop-shadow(0 0 28px rgba(255,165,0,0.7));
  }
  50% {
    filter: drop-shadow(0 0 26px #ffd700) drop-shadow(0 0 55px rgba(255,215,0,0.9))
            drop-shadow(0 0 90px rgba(255,140,0,0.4));
  }
}
@keyframes maskFloat {
  0%, 100% { transform: translateY(0)    rotate(-2deg); }
  50%       { transform: translateY(-10px) rotate(2deg); }
}
@keyframes neonFlicker {
  0%, 90%, 100% { opacity: 1;    }
  92%            { opacity: 0.7;  }
  94%            { opacity: 1;    }
  96%            { opacity: 0.85; }
}
@keyframes float {
  0%, 100% { transform: translateY(0);    }
  50%       { transform: translateY(-8px); }
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  10%       { opacity: 1; transform: scale(1); }
  50%       { opacity: 0; transform: scale(0); }
}
@keyframes pulse-gold {
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.5; }
}
.animate-float      { animation: float      3s ease-in-out infinite; }
.animate-pulse-gold { animation: pulse-gold 2s ease-in-out infinite; }
```

- [ ] **Step 3: Verify dev server still compiles**

Run: `cd "D:/next/40tonsdeglitter" && npm run dev`
Expected: no compile errors, server on http://localhost:3000

- [ ] **Step 4: Commit**

```bash
git add public/fonts/GLITF___.TTF src/app/globals.css
git commit -m "feat: add glitter font + carnival neon CSS system"
```

---

### Task 2: Create GlitterBg component

**Files:**
- Create: `src/components/GlitterBg.tsx`

- [ ] **Step 1: Create GlitterBg.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; col: string; size: number;
}
interface DustP {
  x: number; y: number; s: number; sp: number;
  ph: number; hue: number; dr: number;
}

const FW_COLORS = ["#ff3399","#ffd700","#00ffcc","#7b61ff","#39ff14","#ff6b35","#ff1744"];
const WAVE_COLORS = [
  "rgba(255,51,153,A)","rgba(255,215,0,A)","rgba(0,212,255,A)",
  "rgba(123,97,255,A)","rgba(57,255,20,A)","rgba(255,107,53,A)",
];

export default function GlitterBg() {
  const wavesRef = useRef<HTMLCanvasElement>(null);
  const fwRef    = useRef<HTMLCanvasElement>(null);
  const dustRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wc = wavesRef.current;
    const fc = fwRef.current;
    const dc = dustRef.current;
    if (!wc || !fc || !dc) return;

    const wx = wc.getContext("2d")!;
    const fx = fc.getContext("2d")!;
    const dx = dc.getContext("2d")!;

    function resize() {
      [wc, fc, dc].forEach((c) => {
        if (!c) return;
        c.width  = window.innerWidth;
        c.height = window.innerHeight;
      });
    }
    resize();
    window.addEventListener("resize", resize);

    // ── WAVES ────────────────────────────────────────────
    let t = 0;
    let wRaf: number;
    function drawWaves() {
      wx.clearRect(0, 0, wc!.width, wc!.height);
      WAVE_COLORS.forEach((ct, i) => {
        const off  = (i / WAVE_COLORS.length) * Math.PI * 2;
        const amp  = 42 + i * 14;
        const freq = 0.003 + i * 0.0007;
        const yb   = wc!.height * (0.3 + i * 0.09);
        const a    = (0.28 + Math.sin(t * 0.5 + off) * 0.15).toFixed(2);
        wx.beginPath();
        wx.strokeStyle = ct.replace("A", a);
        wx.lineWidth   = Math.max(1, 2.2 - i * 0.25);
        wx.shadowBlur  = 20;
        wx.shadowColor = ct.replace("A", "0.9");
        for (let x = 0; x <= wc!.width; x += 4) {
          const y =
            yb +
            Math.sin(x * freq + t + off) * amp +
            Math.sin(x * freq * 1.8 + t * 0.75 + off) * (amp * 0.38);
          x === 0 ? wx.moveTo(x, y) : wx.lineTo(x, y);
        }
        wx.stroke();
        wx.shadowBlur = 0;
      });
      t += 0.018;
      wRaf = requestAnimationFrame(drawWaves);
    }
    wRaf = requestAnimationFrame(drawWaves);

    // ── FIREWORKS ────────────────────────────────────────
    let parts: Particle[] = [];
    function launch() {
      const cx  = Math.random() * fc!.width;
      const cy  = Math.random() * fc!.height * 0.5;
      const col = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
      for (let i = 0; i < 45; i++) {
        const ang = (Math.PI * 2 * i) / 45;
        const sp  = 1 + Math.random() * 4.5;
        parts.push({
          x: cx, y: cy,
          vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
          life: 1, col, size: 1.5 + Math.random() * 2,
        });
      }
    }
    let fRaf: number;
    function drawFw() {
      fx.clearRect(0, 0, fc!.width, fc!.height);
      parts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.028; p.life -= 0.011;
        if (p.life > 0) {
          fx.globalAlpha = p.life;
          fx.fillStyle   = p.col;
          fx.shadowBlur  = 10;
          fx.shadowColor = p.col;
          fx.beginPath();
          fx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          fx.fill();
        }
      });
      fx.globalAlpha = 1;
      fx.shadowBlur  = 0;
      parts = parts.filter((p) => p.life > 0);
      fRaf  = requestAnimationFrame(drawFw);
    }
    fRaf = requestAnimationFrame(drawFw);
    launch(); launch();
    const launchTimer = setInterval(launch, 900);

    // ── DUST ─────────────────────────────────────────────
    const dustP: DustP[] = Array.from({ length: 130 }, () => ({
      x:   Math.random() * dc!.width,
      y:   Math.random() * dc!.height,
      s:   Math.random() * 2.2 + 0.4,
      sp:  Math.random() * 0.55 + 0.1,
      ph:  Math.random() * Math.PI * 2,
      hue: Math.random() * 360,
      dr:  (Math.random() - 0.5) * 0.3,
    }));
    let dRaf: number;
    function drawDust(ts: number) {
      dx.clearRect(0, 0, dc!.width, dc!.height);
      dustP.forEach((d) => {
        d.y -= d.sp;
        d.x += d.dr;
        if (d.y < -5) { d.y = dc!.height + 5; d.x = Math.random() * dc!.width; }
        const a = (Math.sin(ts * 0.003 + d.ph) * 0.5 + 0.5) * 0.75;
        dx.globalAlpha = a;
        dx.fillStyle   = `hsl(${d.hue},95%,72%)`;
        dx.shadowBlur  = 8;
        dx.shadowColor = `hsl(${d.hue},95%,72%)`;
        dx.beginPath();
        dx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        dx.fill();
      });
      dx.globalAlpha = 1;
      dx.shadowBlur  = 0;
      dRaf = requestAnimationFrame(drawDust);
    }
    dRaf = requestAnimationFrame(drawDust);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(wRaf);
      cancelAnimationFrame(fRaf);
      cancelAnimationFrame(dRaf);
      clearInterval(launchTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="bg-wash" />
      <canvas ref={wavesRef} className="absolute inset-0 opacity-90" />
      <canvas ref={fwRef}    className="absolute inset-0" />
      <canvas ref={dustRef}  className="absolute inset-0" />
      <div className="prism prism-1" />
      <div className="prism prism-2" />
      <div className="prism prism-3" />
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Run dev server. Open http://localhost:3000. Should see animated neon waves + fireworks + glitter dust over black bg.

- [ ] **Step 3: Commit**

```bash
git add src/components/GlitterBg.tsx
git commit -m "feat: add GlitterBg canvas background component"
```

---

### Task 3: Create GlitterTitle component

**Files:**
- Create: `src/components/GlitterTitle.tsx`

- [ ] **Step 1: Create GlitterTitle.tsx**

```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";

interface SparkPoint {
  x: number; y: number; size: number;
  phase: number; speed: number; col: string;
}
interface LetterData {
  ch: string; cx: number; cy: number;
  fs: number; col: string; pool: SparkPoint[];
}

const LETTER_COLORS = [
  "#00d4ff","#7b61ff","#ff3399",
  "#ff1744","#ff6b35","#ffd700","#39ff14",
];
const FONT = "'Titan One', Impact, sans-serif";

const LINES = [
  { text: "40",      sizeBase: 90,  colors: ["#ffd700","#ff3399"] as string[], small: false },
  { text: "TONS",    sizeBase: 100, colors: LETTER_COLORS,                    small: false },
  { text: "de",      sizeBase: 28,  colors: ["rgba(255,255,255,0.4)"],         small: true  },
  { text: "GLITTER", sizeBase: 110, colors: LETTER_COLORS,                    small: false },
];

export default function GlitterTitle() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const letterRef    = useRef<LetterData[]>([]);
  const rafRef       = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const build = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap   = containerRef.current;
    if (!canvas || !wrap) return;

    const W     = wrap.clientWidth || 520;
    const scale = Math.min(W / 520, 1.4);
    const H     = Math.round(340 * scale);

    canvas.width  = Math.round(W * devicePixelRatio);
    canvas.height = Math.round(H * devicePixelRatio);
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const data: LetterData[] = [];
    let y = 4 * scale;

    LINES.forEach((line) => {
      const fs = line.sizeBase * scale;
      ctx.font = `900 ${fs}px ${FONT}`;
      const totalW = ctx.measureText(line.text).width;
      let x = (W - totalW) / 2;

      for (let ci = 0; ci < line.text.length; ci++) {
        const ch  = line.text[ci];
        const cw  = ctx.measureText(ch).width;
        const col = line.colors[ci % line.colors.length];
        const pool: SparkPoint[] = [];

        if (!line.small) {
          for (let j = 0; j < 55; j++) {
            pool.push({
              x:     x + Math.random() * cw,
              y:     y + Math.random() * fs * 0.9,
              size:  Math.random() * 2.5 + 0.5,
              phase: Math.random() * Math.PI * 2,
              speed: Math.random() * 0.04 + 0.015,
              col:   Math.random() < 0.55 ? "#fff" : col,
            });
          }
        }
        data.push({ ch, cx: x, cy: y, fs, col, pool });
        x += cw;
      }
      y += fs * (line.small ? 0.75 : 1.05);
    });

    letterRef.current = data;
  }, []);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W   = canvas.width  / devicePixelRatio;
    const H   = canvas.height / devicePixelRatio;
    ctx.clearRect(0, 0, W, H);

    letterRef.current.forEach(({ ch, cx, cy, fs, col, pool }) => {
      ctx.font         = `900 ${fs}px ${FONT}`;
      ctx.textBaseline = "top";

      // 3D shadow
      ctx.fillStyle  = "rgba(0,0,0,0.55)";
      ctx.shadowBlur = 0;
      ctx.fillText(ch, cx + fs * 0.022, cy + fs * 0.022);

      // Glow pass 1 — wide
      ctx.shadowBlur  = 28;
      ctx.shadowColor = col;
      ctx.fillStyle   = col;
      ctx.fillText(ch, cx, cy);

      // Glow pass 2 — tight bright
      ctx.shadowBlur  = 10;
      ctx.shadowColor = "#fff";
      ctx.fillText(ch, cx, cy);
      ctx.shadowBlur  = 0;

      if (pool.length === 0) return;

      // Sparkles clipped to letter shape
      ctx.save();
      const cw = ctx.measureText(ch).width;
      ctx.beginPath();
      ctx.rect(cx, cy, cw + 2, fs);
      ctx.clip();

      // Re-draw letter to create alpha mask, then source-over sparkles
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = col;
      ctx.shadowBlur = 0;
      ctx.fillText(ch, cx, cy);

      ctx.globalCompositeOperation = "source-over";
      pool.forEach((s) => {
        const alpha =
          (Math.sin(ts * 0.003 * (s.speed * 40) + s.phase) * 0.5 + 0.5) * 0.92 + 0.08;
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = s.col;
        ctx.shadowBlur  = s.col === "#fff" ? 6 : 4;
        ctx.shadowColor = s.col === "#fff" ? col : s.col;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
      ctx.restore();
    });

    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      build();
      rafRef.current = requestAnimationFrame(draw);
    });
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [build, draw]);

  return (
    <div ref={containerRef} className="w-full max-w-[540px]">
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Import temporarily in page.tsx and verify multicolor glitter letters render with animated sparkles.

- [ ] **Step 3: Commit**

```bash
git add src/components/GlitterTitle.tsx
git commit -m "feat: add GlitterTitle canvas component with animated sparkles"
```

---

### Task 4: Create CrownSVG + MaskSVG

**Files:**
- Create: `src/components/CrownSVG.tsx`
- Create: `src/components/MaskSVG.tsx`

- [ ] **Step 1: Create CrownSVG.tsx**

```tsx
export default function CrownSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`crown-glow ${className}`}
      width="72"
      height="48"
      viewBox="0 0 72 48"
    >
      <defs>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff5cc" />
          <stop offset="35%"  stopColor="#FFE699" />
          <stop offset="70%"  stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#836D30" />
        </linearGradient>
      </defs>
      <path
        d="M8 42 L5 16 L22 28 L36 4 L50 28 L67 16 L64 42 Z"
        fill="url(#crownGrad)"
        stroke="#fff5cc"
        strokeWidth="0.8"
      />
      <path
        d="M12 42 L10 22 L24 32 L36 10 L48 32 L62 22 L60 42 Z"
        fill="rgba(255,255,255,0.07)"
      />
      <circle cx="5"  cy="15" r="3.5" fill="#FFE699" />
      <circle cx="36" cy="4"  r="4"   fill="#fff5cc" />
      <circle cx="67" cy="15" r="3.5" fill="#FFE699" />
      <circle cx="21" cy="38" r="2.5" fill="#ff3399" />
      <circle cx="36" cy="38" r="3"   fill="#00d4ff" />
      <circle cx="51" cy="38" r="2.5" fill="#7b61ff" />
    </svg>
  );
}
```

- [ ] **Step 2: Create MaskSVG.tsx**

```tsx
export default function MaskSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mask-float ${className}`}
      width="300"
      height="190"
      viewBox="0 0 300 190"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(255,215,0,0.7)) drop-shadow(0 0 44px rgba(255,51,153,0.45))",
      }}
    >
      <defs>
        <linearGradient id="maskGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FFE699" />
          <stop offset="40%"  stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#836D30" />
        </linearGradient>
        <radialGradient id="gemPink" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#ff3399" />
        </radialGradient>
        <radialGradient id="gemCyan" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#00d4ff" />
        </radialGradient>
        <radialGradient id="gemGold" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#ffd700" />
        </radialGradient>
      </defs>

      {/* Feathers left */}
      <g opacity="0.95">
        <path d="M85 105 Q45 70 55 25 Q65 55 90 100"   fill="#ff3399" />
        <path d="M85 105 Q50 72 58 28"  stroke="#ff80c0" strokeWidth="1.2" fill="none" />
        <path d="M100 95 Q70 52 80 8 Q90 42 105 90"   fill="#7b61ff" />
        <path d="M100 95 Q72 54 82 10"  stroke="#b0a0ff" strokeWidth="1.2" fill="none" />
        <path d="M118 85 Q102 42 112 0 Q120 35 122 82" fill="#00d4ff" />
        <path d="M118 85 Q104 44 114 2" stroke="#80f0ff" strokeWidth="1.2" fill="none" />
      </g>

      {/* Feathers right */}
      <g opacity="0.95">
        <path d="M182 85 Q198 42 188 0 Q180 35 178 82" fill="#39ff14" />
        <path d="M182 85 Q196 44 186 2" stroke="#90ff80" strokeWidth="1.2" fill="none" />
        <path d="M200 95 Q230 52 220 8 Q210 42 195 90"  fill="#ff6b35" />
        <path d="M200 95 Q228 54 218 10" stroke="#ffaa00" strokeWidth="1.2" fill="none" />
        <path d="M215 105 Q255 70 245 25 Q235 55 210 100" fill="#ffd700" />
        <path d="M215 105 Q250 72 242 28" stroke="#fff176" strokeWidth="1.2" fill="none" />
      </g>

      {/* Center feather */}
      <path d="M150 92 Q132 45 150 -5 Q168 45 150 92" fill="url(#maskGold)" />

      {/* Mask body */}
      <path
        d="M45 108 Q45 72 92 74 Q128 76 150 100 Q172 76 208 74
           Q255 72 255 108 Q255 150 208 148 Q162 146 150 118
           Q138 146 92 148 Q45 150 45 108 Z"
        fill="url(#maskGold)"
        stroke="#fff5cc"
        strokeWidth="1.5"
      />
      {/* Sheen */}
      <path
        d="M55 108 Q55 82 95 84 Q130 86 150 104 Q170 86 205 84
           Q245 82 245 108 Q245 130 205 132 Q168 134 150 112
           Q132 134 95 132 Q55 130 55 108 Z"
        fill="rgba(255,255,255,0.06)"
      />

      {/* Eye holes */}
      <ellipse cx="92"  cy="108" rx="26" ry="17" fill="#0a0505" />
      <ellipse cx="208" cy="108" rx="26" ry="17" fill="#0a0505" />

      {/* Gems */}
      <circle cx="58"  cy="103" r="5"   fill="url(#gemPink)" />
      <circle cx="70"  cy="88"  r="3.5" fill="url(#gemCyan)" />
      <circle cx="126" cy="82"  r="4"   fill="url(#gemGold)" />
      <circle cx="174" cy="82"  r="4"   fill="url(#gemCyan)" />
      <circle cx="230" cy="88"  r="3.5" fill="url(#gemPink)" />
      <circle cx="242" cy="103" r="5"   fill="url(#gemGold)" />
      <circle cx="150" cy="130" r="5.5" fill="url(#gemPink)" />

      {/* Ribbons */}
      <path d="M95 148 Q80 165 60 170"   stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M205 148 Q220 165 240 170" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CrownSVG.tsx src/components/MaskSVG.tsx
git commit -m "feat: add CrownSVG and MaskSVG carnival components"
```

---

### Task 5: Update layout.tsx + NavBar + Footer

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/NavBar.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GlitterBg from "@/components/GlitterBg";

export const metadata: Metadata = {
  title: "Camarote Savaris — 40 Tons de Glitter",
  description:
    "40 Tons de Glitter apresenta: Camarote Savaris. 08 de Fevereiro de 2027 — Club Fundo de Quintal, Porto Velho.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col" style={{ background: "#000" }}>
        <GlitterBg />
        <NavBar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update NavBar.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "/",          label: "Home" },
  { href: "/presentes", label: "Presentes" },
  { href: "/inscricao", label: "Inscrição" },
  { href: "/admin",     label: "Admin", admin: true },
];

export default function NavBar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-[rgba(201,168,76,0.2)] shadow-[0_0_30px_rgba(255,51,153,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-[#ffd700] animate-pulse-gold" />
            <span className="font-cinzel font-black text-sm sm:text-base tracking-widest text-[#FFE699] group-hover:text-white transition-colors">
              40 TONS
            </span>
            <span className="font-cinzel font-light text-xs sm:text-sm tracking-widest text-[rgba(255,230,153,0.6)]">
              DE GLITTER
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded ${
                  pathname === l.href
                    ? "text-[#FFE699] font-semibold"
                    : "text-[rgba(255,230,153,0.6)] hover:text-[#FFE699]"
                } ${
                  l.admin
                    ? "border border-[rgba(201,168,76,0.3)] hover:border-[rgba(201,168,76,0.6)]"
                    : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-[#C9A84C] hover:text-[#FFE699] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-[rgba(255,51,153,0.2)] px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-xs tracking-[0.15em] uppercase rounded transition-colors ${
                pathname === l.href
                  ? "text-[#FFE699] bg-[rgba(255,215,0,0.08)]"
                  : "text-[rgba(255,230,153,0.6)] hover:text-[#FFE699] hover:bg-[rgba(255,215,0,0.05)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Update Footer.tsx**

```tsx
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(255,51,153,0.15)] bg-black/80 backdrop-blur-xl py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse-gold" />
          <span className="font-cinzel font-black text-sm tracking-[0.4em] text-[#FFE699]">
            CAMAROTE SAVARIS
          </span>
          <Sparkles className="w-4 h-4 text-[#ff3399] animate-pulse-gold" />
        </div>
        <p className="font-dancing text-lg rainbow-text">Brilhe sem moderação.</p>
        <div className="gold-divider w-32 mx-auto" />
        <div className="text-[rgba(255,255,255,0.4)] text-[10px] tracking-[0.3em] uppercase space-y-1">
          <p>08 de Fevereiro de 2027 · Club Fundo de Quintal · Porto Velho</p>
          <p className="flex items-center justify-center gap-4">
            <span>★ Exclusivo</span>
            <span>·</span>
            <span>Inesquecível</span>
            <span>·</span>
            <span>Premium ★</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/NavBar.tsx src/components/Footer.tsx
git commit -m "feat: update layout with GlitterBg, redesign NavBar and Footer"
```

---

### Task 6: Rewrite Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx entirely**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ChevronDown } from "lucide-react";
import GlitterTitle from "@/components/GlitterTitle";
import CrownSVG from "@/components/CrownSVG";
import MaskSVG from "@/components/MaskSVG";

// ── Countdown ────────────────────────────────────────────────
const EVENT_DATE = new Date("2027-02-08T15:00:00-04:00");

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(() => Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(diff / 1000);
  return {
    dias:     Math.floor(s / 86400),
    horas:    Math.floor((s % 86400) / 3600),
    minutos:  Math.floor((s % 3600) / 60),
    segundos: s % 60,
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center px-3 sm:px-5 py-3 sm:py-5">
      <div
        className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl leading-none min-w-[2ch] text-center"
        style={{
          background: "linear-gradient(180deg, #FFE699 0%, #C9A84C 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[rgba(255,230,153,0.6)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-1 sm:mt-2">
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const { dias, horas, minutos, segundos } = useCountdown(EVENT_DATE);
  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2
            className="font-cinzel text-xl sm:text-2xl font-light tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,230,153,0.7)" }}
          >
            Contagem Regressiva
          </h2>
          <div className="gold-divider w-24 mx-auto mt-3" />
        </div>
        <div className="glass-card gold-border-glow rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-wrap justify-center gap-2 sm:gap-0 max-w-3xl mx-auto">
          <CountdownUnit value={dias}     label="Dias"  />
          <div className="flex items-center text-3xl sm:text-5xl font-cinzel self-start mt-3 sm:mt-4" style={{ color: "rgba(255,215,0,0.4)" }}>:</div>
          <CountdownUnit value={horas}    label="Horas" />
          <div className="flex items-center text-3xl sm:text-5xl font-cinzel self-start mt-3 sm:mt-4" style={{ color: "rgba(255,215,0,0.4)" }}>:</div>
          <CountdownUnit value={minutos}  label="Min"   />
          <div className="flex items-center text-3xl sm:text-5xl font-cinzel self-start mt-3 sm:mt-4" style={{ color: "rgba(255,215,0,0.4)" }}>:</div>
          <CountdownUnit value={segundos} label="Seg"   />
        </div>
      </div>
    </section>
  );
}

// ── Bandas ───────────────────────────────────────────────────
const BANDAS = [
  { hora: "16h00", nome: "Alexsa e Convidados", estilo: "Show de Abertura", emoji: "🎤",
    descricao: "Abrindo a festa com muita energia e os maiores sucessos." },
  { hora: "19h00", nome: "Escola de Samba",      estilo: "Espetáculo",      emoji: "🎺",
    descricao: "Um show especial com ritmistas e passistas. Tradição e energia." },
  { hora: "20h00", nome: "Edineide Souza",        estilo: "Show Principal",  emoji: "🎧",
    descricao: "A estrela da noite! Repertório completo com clássicos e novidades." },
];

function BandasSection() {
  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-black tracking-wider text-[#FFE699]">
            A TRIBO VAI COMPLETAR
          </h2>
          <p className="text-[rgba(255,230,153,0.6)] text-sm mt-3 tracking-wide">
            Repertório exclusivo pra uma tarde inesquecível
          </p>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {BANDAS.map((b) => (
            <div
              key={b.nome}
              className="glass-card rounded-2xl p-6 sm:p-8 gold-border-glow transition-all duration-500 hover:scale-[1.02] group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl sm:text-5xl">{b.emoji}</div>
                <div className="flex items-center gap-1 text-[rgba(255,230,153,0.5)] text-xs tracking-wider">
                  <Clock className="w-3 h-3" />
                  <span>{b.hora}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className="inline-block px-2 py-0.5 text-[10px] tracking-widest uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] rounded border border-[rgba(201,168,76,0.2)]">
                  {b.estilo}
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFE699] mb-2 group-hover:text-white transition-colors">
                {b.nome}
              </h3>
              <p className="text-[rgba(255,230,153,0.5)] text-sm leading-relaxed">{b.descricao}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 sm:mt-14">
          <Link
            href="/inscricao"
            className="cta-rainbow inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-sm sm:text-base"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Garanta seu abadá
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Info ─────────────────────────────────────────────────────
function InfoSection() {
  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 neon-pink-border text-center space-y-6">
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-[rgba(255,230,153,0.6)] text-sm">
                <Calendar className="w-4 h-4" />
                <span className="tracking-wide uppercase text-xs">Data</span>
              </div>
              <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFE699]">
                08 de Fevereiro de 2027
              </p>
              <p className="text-[rgba(255,230,153,0.5)] text-sm">Início: 15h</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-[rgba(255,230,153,0.6)] text-sm">
                <MapPin className="w-4 h-4" />
                <span className="tracking-wide uppercase text-xs">Local</span>
              </div>
              <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFE699]">
                Club Fundo de Quintal
              </p>
              <p className="text-[rgba(255,230,153,0.5)] text-sm">Porto Velho, Rondônia</p>
            </div>
          </div>
          <div className="gold-divider max-w-xs mx-auto" />
          <div className="space-y-2">
            <p className="text-[rgba(255,230,153,0.6)] text-xs tracking-widest uppercase">✦ O Evento ✦</p>
            <p className="text-[rgba(255,255,255,0.7)] text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Camarote VIP com vista privilegiada, open bar premium, DJ set entre os shows
              e a energia da melhor festa de Porto Velho. Abadá obrigatório — quanto mais
              brilho, melhor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Hero + Page ───────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-10 overflow-hidden">

        <div className="relative z-10 w-full max-w-[540px] mx-auto flex flex-col items-center">

          {/* Top invite */}
          <p className="text-[9px] tracking-[0.28em] uppercase text-[rgba(255,255,255,0.65)] leading-loose mb-3">
            VOCÊ ESTÁ CONVIDADO PARA O<br />EVENTO MAIS BRILHANTE DO CARNAVAL!
          </p>
          <div className="gold-divider w-14 mb-4" />

          {/* Canvas glitter title */}
          <GlitterTitle />

          {/* Apresenta */}
          <div className="flex items-center gap-2 text-[10px] tracking-[0.5em] uppercase text-[rgba(255,255,255,0.55)] my-3">
            <span className="text-[#ffd700] text-[9px]" style={{ textShadow: "0 0 8px #ffd700" }}>✦</span>
            Apresenta
            <span className="text-[#ffd700] text-[9px]" style={{ textShadow: "0 0 8px #ffd700" }}>✦</span>
          </div>

          {/* Camarote */}
          <div className="camarote-text font-cinzel font-black text-sm tracking-[0.7em] uppercase mb-1">
            Camarote
          </div>

          {/* Crown */}
          <CrownSVG className="my-1" />

          {/* SAVARIS */}
          <div
            className="savaris-text font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(48px, 14vw, 76px)", letterSpacing: "0.1em" }}
          >
            SAVARIS
          </div>

          {/* Savaris deco line */}
          <div className="flex items-center gap-2 w-full justify-center my-2">
            <div className="flex-1 max-w-[90px] h-px" style={{ background: "linear-gradient(90deg,transparent,#C9A84C)" }} />
            <span className="text-[#ffd700] text-xs" style={{ textShadow: "0 0 10px #ffd700" }}>★</span>
            <div className="flex-1 max-w-[90px] h-px" style={{ background: "linear-gradient(90deg,#C9A84C,transparent)" }} />
          </div>

          {/* Brilhe */}
          <div className="font-dancing rainbow-text mb-3" style={{ fontSize: "clamp(24px, 7vw, 34px)", fontWeight: 700 }}>
            Brilhe sem moderação.
          </div>

          {/* Mask */}
          <div className="relative w-full flex items-center justify-center my-2" style={{ height: 200 }}>
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(255,215,0,0.22) 0%, rgba(255,51,153,0.1) 35%, transparent 65%)" }}
            />
            <MaskSVG />
          </div>

          {/* Quote */}
          <div className="neon-pink-border glass-card rounded-2xl px-6 py-4 mb-4 w-full max-w-sm">
            <p className="text-lg text-[rgba(255,255,255,0.92)] font-light leading-relaxed">
              Porque a vida sem{" "}
              <span className="font-dancing text-[#ffd700]" style={{ fontSize: 26, textShadow: "0 0 18px rgba(255,215,0,0.9)" }}>
                brilho
              </span>
              ,<br />é sem{" "}
              <span className="font-dancing text-[#ff3399]" style={{ fontSize: 26, textShadow: "0 0 18px rgba(255,51,153,0.9)" }}>
                graça.
              </span>{" "}
              ♥
            </p>
          </div>

          {/* Date */}
          <div className="date-neon font-cinzel font-black" style={{ fontSize: "clamp(32px, 10vw, 46px)", letterSpacing: "0.08em" }}>
            08.02.2027
          </div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-[rgba(255,255,255,0.5)] mt-1 mb-4">
            — Segunda-feira —
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link
              href="/inscricao"
              className="cta-rainbow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm"
            >
              ✨ Quero meu abadá
            </Link>
            <Link
              href="/presentes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-medium tracking-[0.12em] uppercase border border-[rgba(255,51,153,0.5)] text-[#ff3399] hover:bg-[rgba(255,51,153,0.1)] transition-all"
            >
              Lista de presentes
            </Link>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 text-[9px] tracking-[0.3em] uppercase text-[rgba(255,215,0,0.6)] flex items-center gap-3">
            <span>★</span><span>Exclusivo</span>
            <span className="w-1 h-1 rounded-full bg-[#ffd700]" />
            <span>Inesquecível</span>
            <span className="w-1 h-1 rounded-full bg-[#ffd700]" />
            <span>Premium</span><span>★</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(255,215,0,0.3)] animate-float">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      <Countdown />
      <BandasSection />
      <InfoSection />
    </>
  );
}
```

- [ ] **Step 2: Visual check**

Run: `npm run dev`. Open http://localhost:3000.
Expected: full carnival hero — canvas glitter title, crown, mask, neon waves bg, fireworks, pink neon date, rainbow CTA.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite home hero with carnival neon visual system"
```

---

### Task 7: Update Presentes page

**Files:**
- Modify: `src/app/presentes/page.tsx`

- [ ] **Step 1: Update presentes/page.tsx header section only**

Replace the header section (lines 1–156 of the existing file) to use new visual classes. The data array, modal logic, and grid structure stay the same. Only update:

1. Remove the `GlitterParticles` import and usage
2. Update header h1 class to use new system
3. Update button colors to use neon system
4. Update modal button to use `cta-rainbow`

Change these specific pieces in the existing file:

**Remove import:**
```tsx
// DELETE: import GlitterParticles from "@/components/GlitterParticles";
```

**Remove component usage:**
```tsx
// DELETE: <GlitterParticles count={40} />
```

**Update h1:**
```tsx
<h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black tracking-wider text-[#FFE699]"
    style={{ textShadow: "0 0 30px rgba(255,215,0,0.4)" }}>
  LISTA DE PRESENTES
</h1>
```

**Update "Presentear" button:**
```tsx
<button
  onClick={() => { setModal(p.id); setSubmitted(false); setNome(""); setEmail(""); setMsg(""); }}
  className="px-4 sm:px-5 py-2 text-xs tracking-wider uppercase rounded-full border border-[rgba(255,51,153,0.4)] text-[#ff3399] hover:bg-[rgba(255,51,153,0.1)] hover:border-[rgba(255,51,153,0.7)] transition-all duration-300"
>
  Presentear
</button>
```

**Update PIX button in modal:**
```tsx
<button
  onClick={handlePagar}
  disabled={!nome.trim() || !email.trim()}
  className="cta-rainbow w-full py-4 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
>
  Pagar com PIX
</button>
```

- [ ] **Step 2: Visual check**

Open http://localhost:3000/presentes. Cards should show glass + neon border. No GlitterParticles import error.

- [ ] **Step 3: Commit**

```bash
git add src/app/presentes/page.tsx
git commit -m "feat: update presentes page to carnival neon visual system"
```

---

### Task 8: Update Inscrição page

**Files:**
- Modify: `src/app/inscricao/page.tsx`

- [ ] **Step 1: Replace inscricao/page.tsx**

```tsx
"use client";

import { useState } from "react";
import { Sparkles, CheckCircle, AlertCircle } from "lucide-react";

export default function InscricaoPage() {
  const [nome,    setNome]    = useState("");
  const [email,   setEmail]   = useState("");
  const [telefone,setTelefone]= useState("");
  const [acomp,   setAcomp]   = useState(0);
  const [status,  setStatus]  = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg,setErrorMsg]= useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !telefone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, acompanhantes: acomp }),
      });
      if (!res.ok) throw new Error("Erro ao confirmar");
      setStatus("success");
    } catch (err) {
      setErrorMsg("Erro ao confirmar presença. Tente novamente.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-black/40 border border-[rgba(255,51,153,0.2)] rounded-xl text-[#FFE699] placeholder:text-[rgba(255,230,153,0.2)] focus:outline-none focus:border-[rgba(255,51,153,0.6)] transition-colors text-sm";

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#ffd700] animate-pulse-gold" />
            <h1
              className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-[#FFE699]"
              style={{ textShadow: "0 0 30px rgba(255,215,0,0.4)" }}
            >
              CONFIRME SUA PRESENÇA
            </h1>
            <Sparkles className="w-5 h-5 text-[#ff3399] animate-pulse-gold" />
          </div>
          <p className="text-[rgba(255,230,153,0.6)] text-sm max-w-sm mx-auto leading-relaxed">
            Dress code: Abadá obrigatório. Brilho obrigatório.
            Seja sua melhor versão do carnaval!
          </p>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        {/* Form card */}
        <div className="glass-card neon-pink-border rounded-2xl p-6 sm:p-8">
          {status === "success" ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-14 h-14 text-[#39ff14] mx-auto animate-float" />
              <h2 className="font-cinzel text-2xl font-bold text-[#FFE699]">
                Presença confirmada!
              </h2>
              <p className="text-[rgba(255,230,153,0.6)] text-sm leading-relaxed">
                {nome}, sua presença no{" "}
                <strong className="text-[#ffd700]">Camarote Savaris</strong> está confirmada.
                Nos vemos em 08/02/2027! ✨
              </p>
              <button
                onClick={() => { setStatus("idle"); setNome(""); setEmail(""); setTelefone(""); setAcomp(0); }}
                className="px-6 py-2.5 text-sm tracking-wider uppercase rounded-full bg-[rgba(255,215,0,0.1)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] hover:bg-[rgba(255,215,0,0.15)] transition-all"
              >
                Nova inscrição
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[rgba(255,230,153,0.6)] text-xs tracking-widest uppercase block mb-1.5">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[rgba(255,230,153,0.6)] text-xs tracking-widest uppercase block mb-1.5">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[rgba(255,230,153,0.6)] text-xs tracking-widest uppercase block mb-1.5">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(69) 9 9999-9999"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[rgba(255,230,153,0.6)] text-xs tracking-widest uppercase block mb-1.5">
                  Acompanhantes
                </label>
                <select
                  value={acomp}
                  onChange={(e) => setAcomp(Number(e.target.value))}
                  className={inputClass}
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  {[0,1,2,3,4,5].map((n) => (
                    <option key={n} value={n} style={{ background: "#0a0a0a" }}>
                      {n === 0 ? "Sem acompanhantes" : `${n} acompanhante${n > 1 ? "s" : ""}`}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-[#ff3399] text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !nome.trim() || !email.trim() || !telefone.trim()}
                className="cta-rainbow w-full py-4 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                {status === "loading" ? "Confirmando..." : "✨ Confirmar presença"}
              </button>
            </form>
          )}
        </div>

        {/* Dress code info */}
        <div className="mt-6 glass-card gold-border-glow rounded-xl p-4 text-center">
          <p className="text-[rgba(255,230,153,0.5)] text-xs tracking-widest uppercase mb-1">Dress Code</p>
          <p className="text-[#FFE699] text-sm font-semibold tracking-wide">Brilho Obrigatório ✨</p>
          <p className="text-[rgba(255,230,153,0.4)] text-xs mt-1">Abadá + muito glitter = entrada garantida no clima!</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Open http://localhost:3000/inscricao. Form should have neon pink border, glass card, gold labels.

- [ ] **Step 3: Commit**

```bash
git add src/app/inscricao/page.tsx
git commit -m "feat: update inscricao page to carnival neon visual system"
```

---

### Task 9: Update Admin page

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Replace admin/page.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Download, Users, RefreshCw } from "lucide-react";

interface Confirmation {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  acompanhantes: number;
  createdAt: string;
}

export default function AdminPage() {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [search,        setSearch]        = useState("");
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/confirm");
      if (!res.ok) throw new Error("Erro ao carregar");
      const data = await res.json();
      setConfirmations(data.confirmations ?? []);
    } catch {
      setError("Erro ao carregar confirmações.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = confirmations.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  function exportCSV() {
    const header = "Nome,Email,Telefone,Acompanhantes,Data\n";
    const rows   = confirmations
      .map((c) =>
        `"${c.nome}","${c.email}","${c.telefone}",${c.acompanhantes},"${new Date(c.createdAt).toLocaleString("pt-BR")}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "confirmacoes-camarote-savaris.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-[#FFE699] mb-2"
            style={{ textShadow: "0 0 30px rgba(255,215,0,0.4)" }}
          >
            PAINEL ADMIN
          </h1>
          <p className="text-[rgba(255,230,153,0.5)] text-sm tracking-widest uppercase">
            Camarote Savaris — Confirmações
          </p>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        {/* Stats + actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="glass-card gold-border-glow rounded-xl px-5 py-3 flex items-center gap-3">
            <Users className="w-5 h-5 text-[#ffd700]" />
            <div>
              <p className="text-[rgba(255,230,153,0.5)] text-[10px] uppercase tracking-widest">Total</p>
              <p className="font-cinzel text-2xl font-bold text-[#FFE699]">{confirmations.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.08)] text-xs tracking-wider uppercase transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Atualizar
            </button>
            <button
              onClick={exportCSV}
              disabled={confirmations.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,51,153,0.4)] text-[#ff3399] hover:bg-[rgba(255,51,153,0.08)] text-xs tracking-wider uppercase transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,230,153,0.4)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full pl-9 pr-4 py-3 bg-black/40 border border-[rgba(255,51,153,0.2)] rounded-xl text-[#FFE699] placeholder:text-[rgba(255,230,153,0.2)] focus:outline-none focus:border-[rgba(255,51,153,0.5)] text-sm transition-colors"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-[rgba(255,230,153,0.5)]">Carregando...</div>
        ) : error ? (
          <div className="text-center py-16 text-[#ff3399]">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[rgba(255,230,153,0.4)] text-sm">
            {search ? "Nenhum resultado encontrado." : "Nenhuma confirmação ainda."}
          </div>
        ) : (
          <div className="glass-card neon-pink-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(255,51,153,0.15)]">
                    {["Nome","Email","Telefone","Acomp.","Data"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[10px] tracking-widest uppercase text-[rgba(255,230,153,0.5)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id}
                      className={`border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-[rgba(255,51,153,0.04)] ${
                        i % 2 === 0 ? "bg-[rgba(255,255,255,0.01)]" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-[#FFE699] font-medium">{c.nome}</td>
                      <td className="px-4 py-3 text-[rgba(255,230,153,0.6)]">{c.email}</td>
                      <td className="px-4 py-3 text-[rgba(255,230,153,0.6)]">{c.telefone}</td>
                      <td className="px-4 py-3 text-center text-[#C9A84C]">{c.acompanhantes}</td>
                      <td className="px-4 py-3 text-[rgba(255,230,153,0.4)] text-xs">
                        {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Open http://localhost:3000/admin. Table should render with glass card + neon pink border.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/page.tsx
git commit -m "feat: update admin page to carnival neon visual system"
```

---

### Task 10: Remove GlitterParticles + final polish

**Files:**
- Modify: `src/components/GlitterParticles.tsx` (deprecate/keep for compat)
- Run build + fix any TS errors

- [ ] **Step 1: Check for remaining GlitterParticles usage**

Run: `grep -r "GlitterParticles" src/`
Expected: no results (all pages cleaned up)

If any remain, remove the import and usage.

- [ ] **Step 2: Run production build**

Run: `cd "D:/next/40tonsdeglitter" && npm run build`
Expected: Build completes with no errors. Fix any TypeScript errors before continuing.

- [ ] **Step 3: Full visual pass**

Run: `npm run dev`
Check all 4 routes:
- `/` — carnival hero full
- `/presentes` — neon cards
- `/inscricao` — neon form
- `/admin` — dark table

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete carnival neon visual redesign — 40 Tons de Glitter"
```
