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
    let wRaf: number = 0;
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
    let fRaf: number = 0;
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
    let dRaf: number = 0;
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
