"use client";

import { useEffect, useRef } from "react";

// ── Rainbow wave lines + 4-pointed sparkle stars ─────────────
// Matches the aurora/glitter aesthetic from the abadá design

const WAVE_HUES = [300, 330, 0, 30, 60, 120, 180, 220, 270]; // pink→red→orange→yellow→green→cyan→blue→purple

interface Star {
  x: number; y: number;
  size: number; hue: number;
  opacity: number; phase: number; speed: number;
  twinkleSpeed: number;
}

export default function GlitterBg() {
  const waveRef  = useRef<HTMLCanvasElement>(null);
  const starRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wc = waveRef.current;
    const sc = starRef.current;
    if (!wc || !sc) return;

    const wx = wc.getContext("2d")!;
    const sx = sc.getContext("2d")!;

    // ── resize ────────────────────────────────────────────────
    function resize() {
      [wc, sc].forEach((c) => {
        if (!c) return;
        c.width  = window.innerWidth;
        c.height = window.innerHeight;
      });
    }
    resize();
    window.addEventListener("resize", resize);

    // ── 4-pointed star ───────────────────────────────────────
    function drawStar(
      ctx: CanvasRenderingContext2D,
      x: number, y: number,
      outer: number, inner: number,
      hue: number, alpha: number,
    ) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowBlur  = outer * 5;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i - Math.PI / 4;
        const r     = i % 2 === 0 ? outer : inner;
        const px    = x + Math.cos(angle) * r;
        const py    = y + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // ── Stars ────────────────────────────────────────────────
    const NUM_STARS = 90;
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x:            Math.random() * (wc?.width  ?? 1920),
      y:            Math.random() * (wc?.height ?? 1080),
      size:         0.6 + Math.random() * 5,
      hue:          Math.random() * 360,
      opacity:      0.2 + Math.random() * 0.8,
      phase:        Math.random() * Math.PI * 2,
      speed:        0.12 + Math.random() * 0.25,   // drift speed
      twinkleSpeed: 0.8  + Math.random() * 1.6,
    }));

    // ── Waves ────────────────────────────────────────────────
    let t      = 0;
    let wRaf   = 0;
    let sRaf   = 0;
    let lastTs = 0;

    // Each wave: a sweeping bezier arc from left to right.
    // Amplitude cycles to create the flowing-aurora look.
    function drawWaves(ts: number) {
      const dt = ts - lastTs;
      lastTs   = ts;
      t       += dt * 0.00032; // slow drift

      const W = wc!.width;
      const H = wc!.height;

      // Fade previous frame (trail effect)
      wx.globalCompositeOperation = "source-over";
      wx.fillStyle = "rgba(0,0,0,0.18)";
      wx.fillRect(0, 0, W, H);
      wx.globalCompositeOperation = "lighter"; // additive blend = glow

      const numWaves = WAVE_HUES.length;

      for (let wi = 0; wi < numWaves; wi++) {
        const hue   = WAVE_HUES[wi];
        const norm  = wi / (numWaves - 1);           // 0 → 1
        const phase = norm * Math.PI * 2 + t;

        // Vertical offset: waves spread across lower ~70% of screen
        const yBase  = H * (0.45 + norm * 0.50);
        const amp    = H * (0.08 + Math.sin(t * 1.1 + norm * 3) * 0.06);
        const freq   = 0.0018 + norm * 0.0008;
        const speed  = 1.4 + norm * 0.6;

        const alpha  = 0.45 + Math.sin(t * 0.9 + phase) * 0.2;

        wx.beginPath();
        wx.strokeStyle = `hsla(${hue},100%,65%,${alpha.toFixed(2)})`;
        wx.lineWidth   = 1.2 + Math.sin(t + norm * 2) * 0.4;
        wx.shadowBlur  = 18;
        wx.shadowColor = `hsl(${hue},100%,65%)`;

        const step = 3;
        for (let x = 0; x <= W; x += step) {
          const y =
            yBase
            + Math.sin(x * freq + t * speed + phase)        * amp
            + Math.sin(x * freq * 2.1 + t * speed * 0.7)    * (amp * 0.35)
            + Math.sin(x * freq * 0.45 + t * speed * 1.3)   * (amp * 0.5);
          x === 0 ? wx.moveTo(x, y) : wx.lineTo(x, y);
        }
        wx.stroke();
        wx.shadowBlur = 0;
      }

      wx.globalCompositeOperation = "source-over";
      wRaf = requestAnimationFrame(drawWaves);
    }

    // ── Stars draw loop ───────────────────────────────────────
    function drawStars(ts: number) {
      const W = sc!.width;
      const H = sc!.height;

      sx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        // Drift upward slowly
        s.y -= s.speed * 0.35;
        if (s.y < -20) {
          s.y = H + 10;
          s.x = Math.random() * W;
        }

        // Twinkle
        const alpha =
          Math.max(0.05, s.opacity * (0.5 + 0.5 * Math.sin(ts * 0.001 * s.twinkleSpeed + s.phase)));

        drawStar(sx, s.x, s.y, s.size, s.size * 0.22, s.hue, alpha);
      });

      sRaf = requestAnimationFrame(drawStars);
    }

    // ── Kickoff ───────────────────────────────────────────────
    wRaf = requestAnimationFrame(drawWaves);
    sRaf = requestAnimationFrame(drawStars);

    // ── Visibility: avoid burst on tab return ─────────────────
    function onVisible() {
      if (!document.hidden) {
        lastTs = performance.now();
      }
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisible);
      cancelAnimationFrame(wRaf);
      cancelAnimationFrame(sRaf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: "#000" }}>
      {/* Radial ambient glows */}
      <div className="absolute inset-0" style={{
        background: [
          "radial-gradient(ellipse at 20% 80%, rgba(255,0,128,0.12) 0%, transparent 45%)",
          "radial-gradient(ellipse at 80% 85%, rgba(0,200,255,0.10) 0%, transparent 45%)",
          "radial-gradient(ellipse at 50% 95%, rgba(255,200,0,0.08) 0%, transparent 35%)",
        ].join(","),
      }} />
      {/* Wave canvas */}
      <canvas ref={waveRef} className="absolute inset-0" />
      {/* Sparkle star canvas */}
      <canvas ref={starRef} className="absolute inset-0" />
    </div>
  );
}
