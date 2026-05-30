"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";

const INFO_CARDS = [
  { value: "08",       label: "Fevereiro" },
  { value: "2027",     label: "Ano" },
  { value: "15h",      label: "Horário" },
  { value: "Em breve", label: "Local" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          "radial-gradient(ellipse at 20% 30%, rgba(201,168,76,0.12) 0%, transparent 45%)",
          "radial-gradient(ellipse at 80% 70%, rgba(255,51,153,0.14) 0%, transparent 45%)",
          "radial-gradient(ellipse at 50% 55%, rgba(123,97,255,0.08) 0%, transparent 45%)",
        ].join(","),
      }} />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-28 text-center">

        {/* Pre-label */}
        <div className="fade-up flex items-center gap-2 justify-center mb-6" style={{ opacity: 0, animationDelay: "0.05s" }}>
          <span style={{ color: "#ffd700", fontSize: "7px", textShadow: "0 0 5px #ffd700" }}>✦</span>
          <span className="font-outfit text-[9px] tracking-[0.5em] uppercase text-[rgba(255,255,255,0.35)]">
            40 Tons de Glitter apresenta
          </span>
          <span style={{ color: "#ffd700", fontSize: "7px", textShadow: "0 0 5px #ffd700" }}>✦</span>
        </div>

        {/* CAMAROTE SAVARIS lockup */}
        <div
          className="fade-up relative w-full max-w-[480px] mx-auto mb-2"
          style={{ opacity: 0, animationDelay: "0.12s" }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-20%",
              background: "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.22) 0%, transparent 65%)",
              filter: "blur(24px)",
            }}
          />
          <Image
            src="/img/IMG_8381.png"
            alt="Camarote Savaris"
            width={960}
            height={480}
            priority
            style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }}
          />
        </div>

        {/* 40 TONS DE GLITTER lockup */}
        <div
          className="fade-up relative w-full max-w-[560px] mx-auto mb-2"
          style={{ opacity: 0, animationDelay: "0.22s" }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-15%",
              background: "radial-gradient(ellipse at 50% 50%, rgba(255,51,153,0.18) 0%, rgba(255,215,0,0.1) 40%, transparent 65%)",
              filter: "blur(20px)",
            }}
          />
          <Image
            src="/img/IMG_8380.png"
            alt="40 Tons de Glitter"
            width={1120}
            height={700}
            priority
            style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }}
          />
        </div>

        {/* Carnival mask */}
        <div
          className="fade-up relative mb-2"
          style={{ opacity: 0, animationDelay: "0.3s" }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-30%",
              background: "radial-gradient(ellipse at 50% 50%, rgba(255,215,0,0.18) 0%, rgba(255,51,153,0.08) 50%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          <Image
            src="/img/IMG_8383.png"
            alt="Máscara Camarote Savaris"
            width={600}
            height={500}
            className="mask-float"
            style={{
              width: "clamp(160px, 36vw, 280px)",
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        {/* Slogan */}
        <div className="fade-up mb-3" style={{ opacity: 0, animationDelay: "0.36s" }}>
          <p
            className="font-outfit font-semibold rainbow-text"
            style={{ fontSize: "clamp(11px, 2.2vw, 17px)", letterSpacing: "0.35em", textTransform: "uppercase" }}
          >
            Brilhe sem moderação.
          </p>
        </div>

        {/* Date badge */}
        <div
          className="fade-up relative mb-8"
          style={{ opacity: 0, animationDelay: "0.42s" }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-25%",
              background: "radial-gradient(ellipse at 50% 50%, rgba(255,51,153,0.18) 0%, transparent 65%)",
              filter: "blur(14px)",
            }}
          />
          <Image
            src="/img/IMG_8384.png"
            alt="08.02.2027 Segunda-Feira"
            width={400}
            height={400}
            style={{
              width: "clamp(120px, 28vw, 200px)",
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        {/* CTAs */}
        <div
          className="fade-up flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-sm sm:max-w-none sm:justify-center"
          style={{ opacity: 0, animationDelay: "0.48s" }}
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
          style={{ opacity: 0, animationDelay: "0.55s" }}
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
