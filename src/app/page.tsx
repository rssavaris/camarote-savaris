"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Sparkles, Star, Music, Heart, Zap, Users, Crown } from "lucide-react";
import Hero from "@/components/Hero";
import NeonMarquee from "@/components/NeonMarquee";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import SponsorsSection from "@/components/SponsorsSection";
import AbadaShowcase from "@/components/AbadaShowcase";

const EVENT_DATE = new Date("2027-02-08T15:00:00");

function useCountdown(target: Date) {
  // Initialize to 0 — client-only calc via useEffect avoids SSR/client mismatch
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    setDiff(Math.max(0, target.getTime() - Date.now()));
    const id = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(diff / 1000);
  return {
    dias:     Math.floor(s / 86400),
    horas:    Math.floor((s % 86400) / 3600),
    minutos:  Math.floor((s % 3600) / 60),
    segundos: s % 60,
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[5ch]">
      <div
        className="font-cinzel font-black leading-none tabular-nums"
        style={{
          fontSize: "clamp(42px, 9vw, 72px)",
          background: "linear-gradient(180deg, #fffae0 0%, #FFE699 35%, #C9A84C 70%, #836D30 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 16px rgba(255,215,0,0.28))",
        }}
      >
        {pad(value)}
      </div>
      <span className="font-outfit text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[rgba(255,230,153,0.75)]">
        {label}
      </span>
    </div>
  );
}

function CountdownSep() {
  return (
    <span
      className="font-cinzel font-black self-start mt-1"
      style={{ fontSize: "clamp(32px, 7vw, 56px)", color: "rgba(201,168,76,0.2)", lineHeight: 1 }}
    >
      :
    </span>
  );
}

function Countdown() {
  const { dias, horas, minutos, segundos } = useCountdown(EVENT_DATE);
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-8">
          <div className="section-label gold">
            <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,215,0,0.78)]">
              Faltam para a folia
            </span>
          </div>
        </div>
        <div
          className="glass-card rounded-2xl sm:rounded-3xl relative overflow-hidden"
          style={{ border: "1px solid rgba(201,168,76,0.14)", boxShadow: "0 0 60px rgba(255,215,0,0.04)" }}
        >
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.3), rgba(255,51,153,0.25), rgba(255,215,0,0.3), transparent)" }} />
          <div className="px-6 sm:px-10 py-8 sm:py-10">
            <div className="flex items-start justify-center gap-1 sm:gap-3 flex-wrap">
              <CountdownBlock value={dias}     label="Dias" />
              <CountdownSep />
              <CountdownBlock value={horas}    label="Horas" />
              <CountdownSep />
              <CountdownBlock value={minutos}  label="Min" />
              <CountdownSep />
              <CountdownBlock value={segundos} label="Seg" />
            </div>
          </div>
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,51,153,0.2), rgba(255,215,0,0.25), rgba(255,51,153,0.2), transparent)" }} />
        </div>
        <div className="text-center mt-5">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2" style={{ border: "1px solid rgba(201,168,76,0.14)" }}>
            <Calendar className="w-3 h-3 text-[#ff3399]" />
            <span className="font-outfit text-[10px] tracking-widest uppercase text-[rgba(255,230,153,0.82)]">
              08 de Fevereiro de 2027 · 15h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const EXPECTATIVAS = [
  { num: "01", Icon: Music,    label: "Música",      desc: "Shows que fazem o corpo responder antes da mente." },
  { num: "02", Icon: Sparkles, label: "Brilho",      desc: "Cada detalhe vestido para a ocasião mais esperada do ano." },
  { num: "03", Icon: Heart,    label: "Encontros",   desc: "Reencontros, conexões e o calor de estar junto." },
  { num: "04", Icon: Zap,      label: "Energia",     desc: "Uma vibração que não se explica — só se sente." },
  { num: "05", Icon: Star,     label: "Momentos",    desc: "Aqueles que vão ser contados por anos." },
  { num: "06", Icon: Crown,    label: "Experiência", desc: "Premium, exclusivo, inesquecível — de ponta a ponta." },
];

function OQueTeEspera() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-14">
          <div className="section-label pink">
            <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,51,153,0.6)]">Preview</span>
          </div>
          <SplitReveal text="O QUE TE ESPERA" className="font-cinzel font-black text-3xl sm:text-5xl tracking-wider text-[#FFE699] mb-3" style={{ textShadow: "0 0 30px rgba(255,215,0,0.15)" }} />
          <p className="font-cormorant italic text-lg text-[rgba(255,230,153,0.80)] max-w-xs mx-auto">
            Um camarote que não é só um lugar — é uma experiência inteira.
          </p>
          <div className="gold-divider w-12 mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {EXPECTATIVAS.map(({ num, Icon, label, desc }, i) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-5 sm:p-6 group fade-up"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                animationDelay: `${i * 0.07}s`,
                transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "rgba(255,51,153,0.18)";
                el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), 0 0 24px rgba(255,51,153,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(255,255,255,0.04)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-cinzel font-black text-3xl leading-none" style={{ background: "linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.06) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {num}
                </span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(255,51,153,0.07)", border: "1px solid rgba(255,51,153,0.12)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#ff3399" }} />
                </div>
              </div>
              <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#FFE699] mb-1.5 group-hover:text-white transition-colors duration-300">
                {label}
              </h3>
              <p className="font-outfit text-[11px] sm:text-xs text-[rgba(255,230,153,0.75)] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PassaporteSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden" style={{ border: "1px solid rgba(255,51,153,0.22)", boxShadow: "0 0 60px rgba(255,51,153,0.06)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,51,153,0.08) 0%, transparent 60%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,51,153,0.4), rgba(255,215,0,0.3), rgba(255,51,153,0.4), transparent)" }} />
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,51,153,0.12), rgba(255,215,0,0.08))", border: "1px solid rgba(255,51,153,0.22)", boxShadow: "0 0 24px rgba(255,51,153,0.12)" }}>
              <Sparkles className="w-6 h-6 text-[#ff3399]" style={{ filter: "drop-shadow(0 0 6px rgba(255,51,153,0.8))" }} />
            </div>
          </div>
          <div className="relative z-10">
            <SplitReveal text="PASSAPORTE DA ALEGRIA" className="font-cinzel text-2xl sm:text-4xl font-black tracking-wider text-[#FFE699] mb-1" style={{ textShadow: "0 0 20px rgba(255,215,0,0.2)" }} />
            <p className="font-cormorant italic text-base sm:text-lg text-[rgba(255,51,153,0.6)] mb-6">
              Seu ingresso para o abraço
            </p>
            <p className="font-outfit text-sm text-[rgba(255,255,255,0.6)] leading-relaxed mb-7 max-w-md mx-auto">
              Preencha seus dados na página de inscrição. É obrigatório para{" "}
              <span className="text-[#FFE699] font-medium">confirmação de presença</span>,{" "}
              <span className="text-[#FFE699] font-medium">confecção do abadá</span> e{" "}
              <span className="text-[#ff3399] font-semibold">emissão do Passaporte da Alegria</span>.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Abadá personalizado", "Confirmação garantida", "Experiência completa"].map((f) => (
                <span key={f} className="tag-neon-pink"><Star className="w-2.5 h-2.5" />{f}</span>
              ))}
            </div>
            <Link href="/inscricao" className="cta-rainbow inline-flex items-center gap-2 px-8 py-4 rounded-full">
              <Sparkles className="w-4 h-4" />
              Garantir meu passaporte
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AbadaSuspense() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-10">
          <div className="section-label gold">
            <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,215,0,0.76)]">Prévia oficial</span>
          </div>
          <SplitReveal text="O ABADÁ DO ANO" className="font-cinzel font-black text-3xl sm:text-5xl tracking-wider text-[#FFE699] mb-2" style={{ textShadow: "0 0 25px rgba(255,215,0,0.12)" }} />
          <p className="font-cormorant italic text-lg text-[rgba(255,230,153,0.77)]">
            Frente e costas, com os patrocinadores que fazem a festa.
          </p>
          <div className="gold-divider w-12 mx-auto mt-4" />
        </div>
        <AbadaShowcase />
      </div>
    </section>
  );
}

/* ── Main page ── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NeonMarquee />
      <Reveal><Countdown /></Reveal>
      <Reveal><OQueTeEspera /></Reveal>
      <NeonMarquee reverse />
      <Reveal><PassaporteSection /></Reveal>
      <SponsorsSection />
      <Reveal><AbadaSuspense /></Reveal>
    </>
  );
}
