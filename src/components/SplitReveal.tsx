"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "@/lib/motion";

// Título que entra letra por letra no scroll, com brilho dourado que assenta.
// gsap é carregado só quando o título existe (fora do JS inicial); as letras começam invisíveis via CSS.
// Texto acessível via aria-label; as letras são decorativas.
export default function SplitReveal({
  text, as: Tag = "h2", className = "", style,
}: { text: string; as?: "h1" | "h2" | "h3"; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const letters = el.querySelectorAll<HTMLElement>(".sr-l");
    const showAll = () => letters.forEach((l) => { l.style.opacity = "1"; });
    if (prefersReduced()) { showAll(); return; }

    let dead = false;
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([g, st]) => {
        if (dead) return;
        const gsap = g.default;
        gsap.registerPlugin(st.ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            letters,
            { yPercent: 110, rotate: 8, opacity: 0, textShadow: "0 0 24px rgba(255,255,255,0.95), 0 0 48px rgba(255,51,153,0.9)" },
            {
              yPercent: 0, rotate: 0, opacity: 1,
              textShadow: style?.textShadow ?? "0 0 0 rgba(0,0,0,0)",
              duration: 0.9, ease: "back.out(1.6)",
              stagger: { each: 0.035, from: "start" },
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        }, el);
      })
      .catch(showAll); // se o gsap não carregar, o título aparece normal
    return () => { dead = true; ctx?.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref} aria-label={text} className={className} style={style}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(w).map((ch, ci) => (
            <span key={ci} style={{ display: "inline-block", verticalAlign: "top" }}>
              <span className="sr-l" style={{ display: "inline-block", willChange: "transform" }}>{ch}</span>
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
