"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReduced, subscribeGyro } from "@/lib/motion";

// Card com inclinação 3D + brilho holográfico.
// Desktop: segue o mouse. Celular: segue o giroscópio (sem giroscópio, o brilho varre sozinho).
export default function TiltCard({
  children, max = 8, className = "", style,
}: { children: React.ReactNode; max?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (prefersReduced()) return;
    let visible = false;
    const set = (nx: number, ny: number) => {
      el.style.setProperty("--ry", `${nx * max}deg`);
      el.style.setProperty("--rx", `${-ny * max}deg`);
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
      <span className="tilt-sheen" aria-hidden />
    </div>
  );
}
