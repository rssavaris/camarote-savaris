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
  const drawRef      = useRef<(ts: number) => void>(() => {});

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

  useEffect(() => {
    drawRef.current = (ts: number) => {
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

      rafRef.current = requestAnimationFrame(drawRef.current);
    };
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      build();
      rafRef.current = requestAnimationFrame(drawRef.current);
    });
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [build]);

  return (
    <div ref={containerRef} className="w-full max-w-[540px]">
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </div>
  );
}
