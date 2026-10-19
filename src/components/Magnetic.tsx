"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReduced } from "@/lib/motion";

// Puxa o filho até ~14px em direção ao mouse. Desktop apenas; no celular não faz nada.
export default function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (!hasFinePointer() || prefersReduced()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${dx * 14}px, ${dy * 14}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}
