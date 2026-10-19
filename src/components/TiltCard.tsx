"use client";

import { useEffect, useId, useRef } from "react";
import { hasFinePointer, prefersReduced, subscribeGyro } from "@/lib/motion";

// Card com inclinação 3D + faíscas que piscam nas bordas.
// Desktop: inclina com o mouse. Celular: inclina com o giroscópio. As faíscas aceleram enquanto o card se move.
const SPARKS = [
  { t: 9,  l: 7,  s: 16, c: "#ffd700", d: 0 },
  { t: 18, l: 90, s: 13, c: "#ffffff", d: 0.9 },
  { t: 52, l: 95, s: 17, c: "#ff3399", d: 1.7 },
  { t: 76, l: 8,  s: 14, c: "#00d4ff", d: 2.3 },
  { t: 91, l: 72, s: 16, c: "#ffd700", d: 0.5 },
];
export default function TiltCard({
  children, max = 8, className = "", style,
}: { children: React.ReactNode; max?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  // cada card gira as posições das faíscas (senão todos piscariam iguais)
  const off = [...useId()].reduce((a, ch) => a + ch.charCodeAt(0), 0) % SPARKS.length;

  useEffect(() => {
    const el = ref.current!;
    if (prefersReduced()) return;
    let visible = false;
    // no celular (giroscópio) a inclinação é metade: cards altos giravam demais
    const amp = hasFinePointer() ? max : max * 0.5;
    const set = (nx: number, ny: number) => {
      el.style.setProperty("--ry", `${nx * amp}deg`);
      el.style.setProperty("--rx", `${-ny * amp}deg`);
      el.style.setProperty("--mx", `${(nx + 1) * 50}%`);
      el.style.setProperty("--my", `${(ny + 1) * 50}%`);
    };
    const cleanups: (() => void)[] = [];

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    cleanups.push(() => io.disconnect());

    if (hasFinePointer()) {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
        el.classList.add("tilting");
      };
      const leave = () => { set(0, 0); el.classList.remove("tilting"); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    } else {
      el.classList.add("tilt-touch");
      const off = subscribeGyro((x, y) => {
        if (!visible) return;
        el.classList.add("tilting");
        set(x, y);
      });
      cleanups.push(off);
    }
    return () => cleanups.forEach((f) => f());
  }, [max]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} style={style}>
      {children}
      <span className="tilt-sparks" aria-hidden>
        {SPARKS.map((_, i) => {
          const p = SPARKS[(i + off) % SPARKS.length];
          return (
            <i key={i} className="tilt-spark" style={{ top: `${p.t}%`, left: `${p.l}%`, fontSize: p.s, color: p.c, animationDelay: `${(p.d + i * 0.37) % 2.8}s` }}>✦</i>
          );
        })}
      </span>
    </div>
  );
}
