"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReduced, subscribeGyro } from "@/lib/motion";

// Parallax de profundidade: o filho desliza conforme o celular inclina (ou o mouse se move).
export default function GyroFloat({
  children, depth = 10, className = "", style,
}: { children: React.ReactNode; depth?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (prefersReduced()) return;
    const apply = (x: number, y: number) => {
      el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    };
    if (hasFinePointer()) {
      const move = (e: PointerEvent) =>
        apply((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
      addEventListener("pointermove", move, { passive: true });
      return () => removeEventListener("pointermove", move);
    }
    return subscribeGyro(apply);
  }, [depth]);
  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", transition: "transform 0.12s linear", ...style }}
    >
      {children}
    </div>
  );
}
