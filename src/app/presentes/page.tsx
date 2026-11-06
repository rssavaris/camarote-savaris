"use client";

import Link from "next/link";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import SplitReveal from "@/components/SplitReveal";
import HeroSponsors from "@/components/HeroSponsors";

// Paleta que os cards vão alternando
const CORES = [
  { accent: "#FFD700", border: "rgba(255,215,0,0.24)",  glow: "rgba(255,215,0,0.08)" },
  { accent: "#FF3399", border: "rgba(255,51,153,0.24)", glow: "rgba(255,51,153,0.08)" },
  { accent: "#00D4FF", border: "rgba(0,212,255,0.24)",  glow: "rgba(0,212,255,0.08)" },
  { accent: "#B49CFF", border: "rgba(123,97,255,0.28)", glow: "rgba(123,97,255,0.08)" },
  { accent: "#5CFF3A", border: "rgba(57,255,20,0.2)",   glow: "rgba(57,255,20,0.06)" },
];

const presentes: { nome: string; preco: number; emoji: string; tipo: "PIX" | "Experiência"; descricao?: string }[] = [
  { nome: "Não deixa o samba morrer, manda um Pix!", preco: 50, emoji: "🥁", tipo: "PIX" },
  { nome: "Um vale pra eu acordar de bom humor nesse dia.", preco: 150, emoji: "☀️", tipo: "PIX" },
  { nome: "Quer meu sorriso? Patrocina!", preco: 200, emoji: "😁", tipo: "PIX" },
  { nome: "Patrocine o glúteo do aniversariante!", preco: 350, emoji: "🍑", tipo: "PIX" },
  { nome: "Bota glitter nessa desgraça, mana!", preco: 100, emoji: "✨", tipo: "PIX" },
  { nome: "Kit paciência, porque a minha acabou.", preco: 150, emoji: "🧘", tipo: "PIX" },
  { nome: "Vale 1 mês de terapia pra suportar os meses de preparativos.", preco: 480, emoji: "🛋️", tipo: "PIX" },
  { nome: "Vale 1 hora de simpatia do aniversariante.", preco: 50, emoji: "😇", tipo: "PIX" },
  { nome: "Bora maninha, mais brilho, por favor!", preco: 100, emoji: "💎", tipo: "PIX" },
  { nome: "Maninho, ajuda aí com o chopp!", preco: 400, emoji: "🍺", tipo: "PIX" },
  { nome: "Pedido para o DJ", preco: 50, emoji: "🎧", tipo: "Experiência", descricao: "Seu hit no set do DJ entre os shows." },
  { nome: "Dedicatória no telão", preco: 200, emoji: "📺", tipo: "Experiência", descricao: "Sua mensagem aparece no telão durante a festa." },
  { nome: "Chuva de glitter", preco: 150, emoji: "🎉", tipo: "Experiência", descricao: "Glitter sobre a galera no momento que você escolher." },
];

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PresentesPage() {
  return (
    <div className="relative z-10 pt-24 sm:pt-28 pb-20 min-h-screen">

      {/* Page header */}
      <div className="max-w-5xl mx-auto px-5 text-center mb-10">
        <HeroSponsors />

        <div className="section-label gold mb-4">
          <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,215,0,0.78)]">
            Lista de presentes
          </span>
        </div>

        <SplitReveal
          as="h1"
          text="APOSTAR NO BRILHO"
          className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl tracking-wider text-[#FFE699] mb-5"
          style={{ textShadow: "0 0 30px rgba(255,215,0,0.18)" }}
        />

        <p className="font-cormorant italic text-xl sm:text-2xl text-[rgba(255,230,153,0.80)] leading-relaxed max-w-xl mx-auto mb-2">
          &quot;Presentes que brilham junto com a memória.&quot;
        </p>
        <p className="font-outfit text-sm text-[rgba(255,230,153,0.75)] max-w-sm mx-auto">
          Sua presença já é especial. Mas se quiser deixar esse momento ainda mais brilhante...
        </p>
      </div>

      {/* O melhor presente (no lugar das abas) */}
      <div className="max-w-3xl mx-auto px-5 mb-10 text-center">
        <div
          className="glass-card rounded-2xl sm:rounded-3xl p-7 sm:p-9 text-center relative overflow-hidden"
          style={{ border: "1px solid rgba(255,215,0,0.14)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,51,153,0.07) 0%, transparent 60%)" }}
          />
          <div className="relative z-10">
            <Heart
              className="w-7 h-7 mx-auto mb-4"
              style={{
                color: "#ff3399",
                filter: "drop-shadow(0 0 8px rgba(255,51,153,0.6))",
                animation: "pulse-gold 2s ease-in-out infinite",
              }}
            />
            <h2 className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-[#FFE699] mb-2">
              O MELHOR PRESENTE
            </h2>
            <p className="font-cormorant italic text-lg sm:text-xl text-[rgba(255,230,153,0.82)] mb-2">
              &quot;É a sua presença.&quot;
            </p>
            <p className="font-outfit text-sm text-[rgba(255,230,153,0.8)] leading-relaxed mb-6 max-w-md mx-auto">
              Mas se quiser fazer o momento durar mais, escolhe um PIX aí embaixo e deixa tudo ainda mais inesquecível.
            </p>
            <Link
              href="/inscricao"
              className="cta-rainbow inline-flex items-center gap-2 px-8 py-4 rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              Confirmar presença
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Todos os presentes juntos: grade de ponta a ponta (2 colunas no celular, até 5 no PC) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
          {presentes.map((p, i) => {
            const c = CORES[i % CORES.length];
            return (
              <TiltCard key={p.nome} max={6} className="rounded-2xl h-full">
                <div
                  className="glass-card rounded-2xl h-full px-3 py-4 sm:p-5 flex flex-col items-center text-center gap-2 fade-up"
                  style={{
                    border: `1px solid ${c.border}`,
                    boxShadow: `0 0 28px ${c.glow}`,
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  <span
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl select-none"
                    style={{ background: c.glow, border: `1px solid ${c.border}` }}
                  >
                    {p.emoji}
                  </span>
                  <span
                    className="font-outfit text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: c.accent, opacity: 0.85 }}
                  >
                    {p.tipo}
                  </span>
                  <h3 className="font-outfit font-semibold text-sm sm:text-[15px] leading-snug text-[#FFE699]">
                    {p.nome}
                  </h3>
                  {p.descricao && (
                    <p className="font-outfit text-[11px] sm:text-xs text-[rgba(255,230,153,0.72)] leading-snug">
                      {p.descricao}
                    </p>
                  )}

                  <div className="mt-auto pt-2 w-full flex flex-col items-center gap-2.5">
                    <span
                      className="font-cinzel text-xl sm:text-2xl font-black whitespace-nowrap"
                      style={{ color: c.accent, textShadow: `0 0 14px ${c.glow}` }}
                    >
                      {brl(p.preco)}
                    </span>
                    <button
                      type="button"
                      className="w-full font-outfit text-[10px] tracking-[0.15em] uppercase py-2.5 rounded-full border transition-colors duration-300 hover:bg-[rgba(255,255,255,0.05)]"
                      style={{ borderColor: c.border, color: c.accent }}
                    >
                      Presentear
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

    </div>
  );
}
