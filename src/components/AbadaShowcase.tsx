"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Maximize2, X, RotateCw } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { prefersReduced } from "@/lib/motion";

const FRENTE = { src: "/img/abada-frente.png", w: 631, h: 823, alt: "Abadá Camarote Savaris, frente" };
const COSTAS = { src: "/img/abada-costas.png", w: 627, h: 824, alt: "Abadá Camarote Savaris, costas, com os patrocinadores" };

const SPARKS = [
  { top: "4%",  left: "6%",  c: "#ffd700", s: 14, d: 0 },
  { top: "12%", left: "94%", c: "#ff3399", s: 12, d: 0.7 },
  { top: "48%", left: "-2%", c: "#00d4ff", s: 10, d: 1.3 },
  { top: "64%", left: "100%", c: "#ffd700", s: 14, d: 0.4 },
  { top: "94%", left: "12%", c: "#7b61ff", s: 12, d: 1.8 },
  { top: "90%", left: "86%", c: "#ff3399", s: 10, d: 1.1 },
];

function Sparks() {
  return (
    <>
      {SPARKS.map((p, i) => (
        <span key={i} aria-hidden className="absolute abada-spark"
          style={{ top: p.top, left: p.left, width: p.s, height: p.s, color: p.c, animationDelay: `${p.d}s` }} />
      ))}
    </>
  );
}

// Prévia do abadá: desktop mostra frente e costas lado a lado; celular mostra um por vez e vira sozinho.
export default function AbadaShowcase() {
  const [open, setOpen] = useState(false);
  const [face, setFace] = useState<0 | 1>(0);
  const [paused, setPaused] = useState(false);

  // no celular o abadá vira sozinho a cada 4,5s (para quando a pessoa mexe nele)
  useEffect(() => {
    if (paused || open || prefersReduced()) return;
    const id = setInterval(() => setFace((f) => (f === 0 ? 1 : 0)), 4500);
    return () => clearInterval(id);
  }, [paused, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

    return (
    <>
      <div className="relative mx-auto max-w-4xl">
        {/* palco de luz atrás do abadá */}
        <div className="absolute inset-[8%] pointer-events-none abada-aura" />

        {/* ── Desktop: frente e costas lado a lado ── */}
        <div className="relative hidden md:grid grid-cols-2 gap-10 px-6">
          {[
            { f: FRENTE, cls: "abada-tilt-frente", label: "Frente" },
            { f: COSTAS, cls: "abada-tilt-costas", label: "Costas" },
          ].map(({ f, cls, label }, i) => (
            <button key={label} type="button" onClick={() => setOpen(true)} aria-label={`Ampliar ${label.toLowerCase()} do abadá`}
              className="relative block cursor-zoom-in">
              <div className="abada-float" style={{ animationDelay: `${i * 0.9}s` }}>
                <TiltCard max={7} className={`abada-tilt ${cls} rounded-3xl`}>
                  <div className="relative">
                    <Image src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="380px"
                      style={{ width: "100%", height: "auto" }} />
                    <Sparks />
                    <span className="abada-shadow" aria-hidden />
                  </div>
                </TiltCard>
              </div>
              <p className="mt-5 text-center font-outfit text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,230,153,0.75)" }}>{label}</p>
            </button>
          ))}
        </div>

        {/* ── Celular: um abadá por vez, vira sozinho ── */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => { setPaused(true); setFace((f) => (f === 0 ? 1 : 0)); }}
            aria-label="Virar o abadá"
            className="relative block mx-auto w-[78%] max-w-[340px] abada-float"
            style={{ perspective: 1200 }}
          >
            <div
              className="relative"
              style={{
                aspectRatio: `${FRENTE.w} / ${FRENTE.h}`,
                transformStyle: "preserve-3d",
                transition: "transform 0.9s cubic-bezier(.3,.7,.2,1)",
                transform: `rotateY(${face * 180}deg)`,
              }}
            >
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <Image src={FRENTE.src} alt={FRENTE.alt} width={FRENTE.w} height={FRENTE.h} sizes="78vw"
                  style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <Image src={COSTAS.src} alt={COSTAS.alt} width={COSTAS.w} height={COSTAS.h} sizes="78vw"
                  style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
            <Sparks />
            <span className="abada-shadow" aria-hidden />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {(["Frente", "Costas"] as const).map((label, i) => (
              <button key={label} type="button"
                onClick={() => { setPaused(true); setFace(i as 0 | 1); }}
                className="px-4 py-2 rounded-full font-outfit text-[10px] tracking-[0.2em] uppercase transition-all"
                style={face === i
                  ? { background: "rgba(255,215,0,0.14)", border: "1px solid rgba(255,215,0,0.55)", color: "#FFE699" }
                  : { background: "transparent", border: "1px solid rgba(255,215,0,0.2)", color: "rgba(255,230,153,0.7)" }}>
                {label}
              </button>
            ))}
            <button type="button" onClick={() => setOpen(true)} aria-label="Ampliar"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ border: "1px solid rgba(255,215,0,0.3)", color: "rgba(255,230,153,0.9)" }}>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 font-outfit text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,230,153,0.6)" }}>
            <RotateCw className="w-3 h-3" /> Toque no abadá para virar
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="font-outfit text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(255,230,153,0.8)" }}>
          Escolha seu tamanho agora
        </p>
        <Link href="/inscricao" className="cta-rainbow inline-flex items-center gap-2 px-8 py-4 rounded-full">
          <Sparkles className="w-4 h-4" />
          Garantir abadá
        </Link>
      </div>

      {open && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[90] overflow-auto"
          style={{ background: "rgba(4,2,8,0.96)" }}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full"
            style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,215,0,0.4)", color: "#FFE699" }}
          >
            <X className="w-5 h-5" />
          </button>
          {/* no celular abre maior que a tela: arraste para os lados para ver os detalhes */}
          <div className="flex min-h-full items-center justify-center gap-6 p-6" style={{ width: "max(100%, 960px)" }}>
            {[FRENTE, COSTAS].map((f) => (
              <Image key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="480px"
                style={{ width: "min(46%, 520px)", minWidth: 400, height: "auto" }} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
