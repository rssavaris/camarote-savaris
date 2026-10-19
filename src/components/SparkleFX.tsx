"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "@/lib/motion";

// Trilha de glitter no mouse / dedo + explosão de estrelas ao tocar.
// Um único canvas, sprites pré-renderizados (sem shadowBlur por frame, leve no celular).

const HUES = [190, 255, 330, 350, 45, 110];
const MAX = 140;

interface P {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; rot: number; vr: number; spr: number;
}

function makeSprite(hue: number) {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  g.translate(s / 2, s / 2);
  g.shadowBlur = 10;
  g.shadowColor = `hsl(${hue},100%,65%)`;
  g.fillStyle = `hsl(${hue},100%,78%)`;
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 4;
    const r = i % 2 === 0 ? 22 : 5;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  g.closePath();
  g.fill();
  return c;
}

export default function SparkleFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const sprites = HUES.map(makeSprite);
    const ps: P[] = [];
    let raf = 0;
    let last = 0;
    let running = false;
    let lastSpawn = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const tick = (t: number) => {
      const dt = Math.min(t - last, 40);
      last = t;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life += dt;
        if (p.life >= p.max) { ps.splice(i, 1); continue; }
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.vy += 0.0009 * dt; // gravidade leve
        p.rot += p.vr * dt;
        const k = 1 - p.life / p.max;
        ctx.save();
        ctx.globalAlpha = k;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const s = p.size * (0.5 + k * 0.5);
        ctx.drawImage(sprites[p.spr], -s, -s, s * 2, s * 2);
        ctx.restore();
      }
      if (ps.length) raf = requestAnimationFrame(tick);
      else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
    };

    const spawn = (x: number, y: number, n: number, speed: number, size: number) => {
      for (let i = 0; i < n && ps.length < MAX; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = speed * (0.3 + Math.random());
        ps.push({
          x, y,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v - speed * 0.25,
          life: 0, max: 600 + Math.random() * 500,
          size: size * (0.6 + Math.random() * 0.8),
          rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.01,
          spr: (Math.random() * sprites.length) | 0,
        });
      }
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const trail = (x: number, y: number, now: number) => {
      if (now - lastSpawn < 28) return;
      lastSpawn = now;
      spawn(x, y, 1, 0.5, 9);
    };

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType === "mouse") trail(e.clientX, e.clientY, e.timeStamp);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) trail(t.clientX, t.clientY, e.timeStamp);
    };
    const onDown = (e: PointerEvent) => {
      spawn(e.clientX, e.clientY, 16, 3.2, 12);
      if (navigator.vibrate) navigator.vibrate(8);
    };

    addEventListener("pointermove", onMouse, { passive: true });
    addEventListener("touchmove", onTouchMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMouse);
      removeEventListener("touchmove", onTouchMove);
      removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 70 }}
    />
  );
}
