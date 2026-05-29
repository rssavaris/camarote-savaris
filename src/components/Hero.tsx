"use client";

import Link from "next/link";
import { Sparkles, ChevronDown, Heart, Calendar } from "lucide-react";
import CrownSVG from "@/components/CrownSVG";
import MaskSVG from "@/components/MaskSVG";

// Scattered glitter sparkles around the 40/GLITTER lockup (hand-placed, organic)
const SPARKLES = [
  { char: "✦", left: "8%",  top: "6%",  size: "14px", color: "#ffd700", glow: 8,  dur: 2.4, delay: 0   },
  { char: "✧", left: "88%", top: "12%", size: "11px", color: "#ff3399", glow: 7,  dur: 2.8, delay: 0.6 },
  { char: "✦", left: "94%", top: "44%", size: "13px", color: "#00d4ff", glow: 8,  dur: 2.2, delay: 1.1 },
  { char: "·", left: "4%",  top: "40%", size: "20px", color: "#39ff14", glow: 6,  dur: 3.0, delay: 0.3 },
  { char: "✧", left: "16%", top: "72%", size: "12px", color: "#ffd700", glow: 7,  dur: 2.6, delay: 0.9 },
  { char: "✦", left: "82%", top: "78%", size: "14px", color: "#7b61ff", glow: 8,  dur: 2.5, delay: 1.4 },
  { char: "·", left: "50%", top: "2%",  size: "18px", color: "#ff7a3d", glow: 6,  dur: 2.9, delay: 0.5 },
  { char: "✧", left: "70%", top: "30%", size: "10px", color: "#ffffff", glow: 6,  dur: 2.1, delay: 1.7 },
  { char: "✦", left: "24%", top: "26%", size: "11px", color: "#ffffff", glow: 6,  dur: 2.7, delay: 0.2 },
] as const;

const INFO_CARDS = [
  { value: "08",       label: "Fevereiro" },
  { value: "2027",     label: "Ano" },
  { value: "15h",      label: "Horário" },
  { value: "Em breve", label: "Local" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* ── Radial glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse at 15% 15%, rgba(201,168,76,0.18) 0%, transparent 40%)",
            "radial-gradient(ellipse at 85% 80%, rgba(255,51,153,0.18) 0%, transparent 40%)",
            "radial-gradient(ellipse at 50% 55%, rgba(123,97,255,0.1) 0%, transparent 45%)",
            "radial-gradient(ellipse at 0%  70%, rgba(0,212,255,0.1)  0%, transparent 38%)",
          ].join(","),
        }}
      />

      {/* ── Soft blur orbs ── */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute left-10 top-24 h-36 w-36 rounded-full blur-3xl" style={{ background: "#C9A84C" }} />
        <div className="absolute right-16 bottom-24 h-44 w-44 rounded-full blur-3xl" style={{ background: "#ff3399" }} />
        <div className="absolute bottom-12 left-1/3 h-36 w-36 rounded-full blur-3xl" style={{ background: "#00d4ff" }} />
      </div>

      {/* ── Prism streaks ── */}
      <div className="prism prism-1" />
      <div className="prism prism-2" />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-28 text-center">

        {/* Pre-label */}
        <div className="fade-up" style={{ opacity: 0, animationDelay: "0.05s" }}>
          <div className="flex items-center gap-2 justify-center mb-5">
            <span style={{ color: "#ffd700", fontSize: "7px", textShadow: "0 0 5px #ffd700" }}>✦</span>
            <span className="font-outfit text-[9px] tracking-[0.5em] uppercase text-[rgba(255,255,255,0.35)]">
              40 Tons de Glitter apresenta
            </span>
            <span style={{ color: "#ffd700", fontSize: "7px", textShadow: "0 0 5px #ffd700" }}>✦</span>
          </div>
        </div>

        {/* Crown */}
        <div className="fade-up mb-2" style={{ opacity: 0, animationDelay: "0.1s" }}>
          <CrownSVG className="crown-glow mx-auto" />
        </div>

        {/* CAMAROTE */}
        <div className="fade-up" style={{ opacity: 0, animationDelay: "0.15s" }}>
          <p className="font-cinzel font-light text-[11px] tracking-[0.65em] uppercase text-[rgba(255,230,153,0.55)] mb-1">
            Camarote
          </p>
        </div>

        {/* SAVARIS */}
        <div className="fade-up" style={{ opacity: 0, animationDelay: "0.2s" }}>
          <h1
            className="savaris-text leading-none select-none"
            style={{
              fontSize: "clamp(64px, 16vw, 128px)",
              letterSpacing: "0.04em",
            }}
          >
            SAVARIS
          </h1>
        </div>

        {/* Divider */}
        <div className="fade-up" style={{ opacity: 0, animationDelay: "0.25s" }}>
          <div
            className="my-5 h-px w-44 mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.55), rgba(255,51,153,0.35), rgba(201,168,76,0.55), transparent)" }}
          />
        </div>

        {/* 40 TONS DE GLITTER — glitter lockup (abadá identity) */}
        <div className="fade-up relative flex flex-col items-center mb-1" style={{ opacity: 0, animationDelay: "0.3s" }}>

          {/* Scattered sparkle stars — organic, like sequins on the abadá */}
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="absolute select-none pointer-events-none"
              style={{
                left: s.left, top: s.top, fontSize: s.size,
                color: s.color,
                textShadow: `0 0 ${s.glow}px ${s.color}`,
                animation: `starTwinkle ${s.dur}s ease-in-out infinite`,
                animationDelay: `${s.delay}s`,
                zIndex: 1,
              }}
            >
              {s.char}
            </span>
          ))}

          {/* 40 */}
          <span
            className="glitter-pink font-fredoka block relative z-[2]"
            style={{ fontSize: "clamp(78px, 18vw, 152px)", fontWeight: 700, lineHeight: 0.8 }}
          >
            40
          </span>
          {/* tons de */}
          <span
            className="glitter-white font-caveat block relative z-[2] -mt-4 mb-0"
            style={{ fontSize: "clamp(28px, 6vw, 50px)", fontWeight: 700, transform: "rotate(-4deg)" }}
          >
            tons de
          </span>
          {/* GLITTER */}
          <span
            className="glitter-rainbow font-fredoka block relative z-[2]"
            style={{ fontSize: "clamp(44px, 11vw, 96px)", fontWeight: 700, letterSpacing: "0.01em", lineHeight: 0.92 }}
          >
            GLITTER
          </span>
        </div>

        {/* Mask SVG – mobile + desktop */}
        <div className="fade-up my-5 sm:my-6" style={{ opacity: 0, animationDelay: "0.32s" }}>
          <div className="relative inline-block">
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-40%",
                background: "radial-gradient(ellipse at 50% 50%, rgba(255,215,0,0.2) 0%, rgba(255,51,153,0.08) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div className="mask-float relative" style={{ transform: "scale(0.85) sm:scale(1)" }}>
              <MaskSVG />
            </div>
          </div>
        </div>

        {/* Slogan — uppercase tracked rainbow (abadá) */}
        <div className="fade-up" style={{ opacity: 0, animationDelay: "0.36s" }}>
          <p className="font-outfit font-semibold rainbow-text mb-3" style={{ fontSize: "clamp(13px, 2.6vw, 20px)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Brilhe sem moderação.
          </p>
        </div>

        {/* Manifesto */}
        <div className="fade-up" style={{ opacity: 0, animationDelay: "0.4s" }}>
          <p className="font-cormorant italic text-lg sm:text-xl text-[rgba(255,230,153,0.55)] max-w-xl mx-auto mb-8 leading-relaxed">
            "Porque a vida sem{" "}
            <span style={{ color: "#ffd700", fontStyle: "normal", fontWeight: 600 }}>brilho</span>
            {" "}é sem{" "}
            <span style={{ color: "#ff3399", fontStyle: "normal", fontWeight: 600 }}>graça</span>."
          </p>
        </div>

        {/* Neon date block — abadá back */}
        <div
          className="fade-up flex flex-col items-center gap-2 mb-10"
          style={{ opacity: 0, animationDelay: "0.42s" }}
        >
          <Heart
            className="w-5 h-5"
            style={{ color: "#ff3399", fill: "#ff3399", filter: "drop-shadow(0 0 8px rgba(255,51,153,0.9))" }}
          />
          <div className="flex items-center gap-2.5">
            <Calendar
              className="w-4 h-4 sm:w-5 sm:h-5"
              style={{ color: "#ff3399", filter: "drop-shadow(0 0 6px rgba(255,51,153,0.8))" }}
            />
            <span
              className="date-neon font-cinzel font-black"
              style={{ fontSize: "clamp(26px, 6vw, 42px)", letterSpacing: "0.06em" }}
            >
              08.02.2027
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#ff3399]">
            <span style={{ fontSize: "9px", textShadow: "0 0 8px #ff3399", animation: "starTwinkle 2s ease-in-out infinite" }}>★</span>
            <span
              className="font-outfit text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(255,51,153,0.85)", textShadow: "0 0 10px rgba(255,51,153,0.6)" }}
            >
              Segunda-feira
            </span>
            <span style={{ fontSize: "9px", textShadow: "0 0 8px #ff3399", animation: "starTwinkle 2s ease-in-out infinite", animationDelay: "1s" }}>★</span>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="fade-up flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-sm sm:max-w-none sm:justify-center"
          style={{ opacity: 0, animationDelay: "0.45s" }}
        >
          <Link
            href="/inscricao"
            className="cta-rainbow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4" />
            Garantir presença
          </Link>
          <Link
            href="/presentes"
            className="btn-neon inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl w-full sm:w-auto"
          >
            Ver presentes
          </Link>
        </div>

        {/* Info cards grid */}
        <div
          className="fade-up grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl"
          style={{ opacity: 0, animationDelay: "0.52s" }}
        >
          {INFO_CARDS.map(({ value, label }) => (
            <div
              key={label}
              className="glass-card gold-border-glow rounded-2xl p-5 text-center transition-all duration-300"
            >
              <p
                className="font-cinzel font-black text-xl sm:text-2xl lg:text-3xl leading-none mb-1"
                style={{
                  background: "linear-gradient(180deg, #FFE699 0%, #C9A84C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(255,215,0,0.25))",
                }}
              >
                {value}
              </p>
              <p className="font-outfit text-[9px] uppercase tracking-[0.28em] text-[rgba(255,230,153,0.4)] mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-float"
        style={{ color: "rgba(255,215,0,0.28)" }}
      >
        <span className="font-outfit text-[8px] tracking-[0.35em] uppercase">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>
    </section>
  );
}
