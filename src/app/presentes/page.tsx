"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift, Sparkles, Star, Heart, ArrowRight } from "lucide-react";

const presentes = [
  {
    id: "pix-100",
    nome: "PIX Luxo",
    preco: 100,
    tipo: "pix",
    badge: "PIX",
    emoji: "💰",
    accentColor: "rgba(201,168,76,0.9)",
    borderColor: "rgba(201,168,76,0.18)",
    glowColor: "rgba(201,168,76,0.08)",
    badgeClass: "tag-gold",
    descricao: "Contribua com o brilho do evento. Cada valor é bem-vindo e faz diferença.",
  },
  {
    id: "pix-200",
    nome: "PIX Premium",
    preco: 200,
    tipo: "pix",
    badge: "PIX",
    emoji: "💎",
    accentColor: "rgba(201,168,76,0.9)",
    borderColor: "rgba(201,168,76,0.18)",
    glowColor: "rgba(201,168,76,0.08)",
    badgeClass: "tag-gold",
    descricao: "Apoio especial. Sua contribuição garante open bar melhor e mais glitter.",
  },
  {
    id: "pix-500",
    nome: "PIX VIP",
    preco: 500,
    tipo: "pix",
    badge: "VIP",
    emoji: "👑",
    accentColor: "rgba(255,215,0,0.9)",
    borderColor: "rgba(255,215,0,0.22)",
    glowColor: "rgba(255,215,0,0.06)",
    badgeClass: "tag-gold",
    destaque: true,
    descricao: "Super apoiador! Creditado no camarote com menção especial no telão.",
  },
  {
    id: "msg-palco",
    nome: "Mensagem no Palco",
    preco: 200,
    tipo: "experiencia",
    badge: "Experiência",
    emoji: "💬",
    accentColor: "rgba(123,97,255,0.9)",
    borderColor: "rgba(123,97,255,0.2)",
    glowColor: "rgba(123,97,255,0.06)",
    badgeClass: "tag-neon-pink",
    descricao: "Sua mensagem aparece no telão durante o show. Surpreenda alguém especial.",
  },
  {
    id: "chuva-glitter",
    nome: "Chuva de Glitter",
    preco: 150,
    tipo: "experiencia",
    badge: "Experiência",
    emoji: "✦",
    accentColor: "rgba(0,212,255,0.9)",
    borderColor: "rgba(0,212,255,0.2)",
    glowColor: "rgba(0,212,255,0.06)",
    badgeClass: "tag-cyan",
    descricao: "Glitter dourado sobre a plateia no momento que você escolher. Ícone do evento.",
  },
  {
    id: "dedicatoria",
    nome: "Dedicatória no Telão",
    preco: 250,
    tipo: "experiencia",
    badge: "Experiência",
    emoji: "🎯",
    accentColor: "rgba(255,51,153,0.9)",
    borderColor: "rgba(255,51,153,0.2)",
    glowColor: "rgba(255,51,153,0.06)",
    badgeClass: "tag-neon-pink",
    descricao: "Uma dedicatória especial lida pela Edineide Souza ao vivo no show.",
  },
  {
    id: "dj-requiem",
    nome: "Pedido para o DJ",
    preco: 100,
    tipo: "experiencia",
    badge: "Experiência",
    emoji: "🎧",
    accentColor: "rgba(255,51,153,0.9)",
    borderColor: "rgba(255,51,153,0.18)",
    glowColor: "rgba(255,51,153,0.05)",
    badgeClass: "tag-neon-pink",
    descricao: "Seu hit no set do DJ entre os shows. Pode pedir qualquer coisa.",
  },
  {
    id: "kit-festa",
    nome: "Kit Festa",
    preco: 80,
    tipo: "fisico",
    badge: "Presente",
    emoji: "🎁",
    accentColor: "rgba(57,255,20,0.8)",
    borderColor: "rgba(57,255,20,0.15)",
    glowColor: "rgba(57,255,20,0.04)",
    badgeClass: "tag-gold",
    descricao: "Óculos de brilho, tinta spray dourada, pulseira VIP e mais surpresas.",
  },
];

type Filtro = "todos" | "experiencia" | "pix" | "fisico";

export default function PresentesPage() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const filtrados =
    filtro === "todos" ? presentes : presentes.filter((p) => p.tipo === filtro);

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-20 min-h-screen">

      {/* Page header */}
      <div className="max-w-5xl mx-auto px-5 text-center mb-14">

        <div className="section-label gold mb-4">
          <span className="font-outfit text-[9px] tracking-[0.45em] uppercase text-[rgba(255,215,0,0.45)]">
            Lista de presentes
          </span>
        </div>

        <h1
          className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl tracking-wider text-[#FFE699] mb-5"
          style={{ textShadow: "0 0 30px rgba(255,215,0,0.18)" }}
        >
          APOSTAR NO BRILHO
        </h1>

        <p className="font-cormorant italic text-xl sm:text-2xl text-[rgba(255,230,153,0.5)] leading-relaxed max-w-xl mx-auto mb-2">
          "Presentes que brilham junto com a memória."
        </p>
        <p className="font-outfit text-sm text-[rgba(255,230,153,0.38)] max-w-sm mx-auto">
          Sua presença já é especial. Mas se quiser deixar esse momento ainda mais brilhante...
        </p>

        <div className="gold-divider w-16 mx-auto mt-6" />
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-5 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {(
            [
              { key: "todos",       label: "Todos" },
              { key: "pix",         label: "PIX" },
              { key: "experiencia", label: "Experiências" },
              { key: "fisico",      label: "Presentes" },
            ] as { key: Filtro; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className={[
                "px-4 py-2 text-[10px] tracking-[0.18em] uppercase rounded-full border transition-all duration-300 font-outfit",
                filtro === key
                  ? "bg-[rgba(255,215,0,0.07)] border-[rgba(255,215,0,0.4)] text-[#FFE699] shadow-[0_0_12px_rgba(255,215,0,0.06)]"
                  : "bg-transparent border-[rgba(201,168,76,0.1)] text-[rgba(255,230,153,0.38)] hover:border-[rgba(201,168,76,0.28)] hover:text-[rgba(255,230,153,0.65)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtrados.map((p, i) => (
            <div
              key={p.id}
              className={[
                "glass-card rounded-2xl overflow-hidden group transition-all duration-400 fade-up",
                p.destaque ? "sm:col-span-2 lg:col-span-1" : "",
              ].join(" ")}
              style={{
                border: `1px solid ${p.borderColor}`,
                boxShadow: `0 0 30px ${p.glowColor}`,
                animationDelay: `${i * 0.05}s`,
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 32px ${p.glowColor.replace("0.08", "0.18").replace("0.06", "0.14").replace("0.04", "0.1").replace("0.05", "0.12")}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${p.glowColor}`;
              }}
            >
              {/* Card header */}
              <div
                className="relative h-28 sm:h-32 flex items-center justify-center"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${p.glowColor.replace("0.08", "0.14").replace("0.06", "0.1").replace("0.04", "0.07").replace("0.05", "0.08")} 0%, rgba(0,0,0,0) 70%), rgba(0,0,0,0.2)`,
                }}
              >
                <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-400 select-none">
                  {p.emoji}
                </span>
                <span className={`${p.badgeClass} absolute top-3 right-3`}>
                  {p.badge}
                </span>
                {p.destaque && (
                  <span className="absolute top-3 left-3 tag-gold">
                    <Star className="w-2.5 h-2.5" />
                    Destaque
                  </span>
                )}
                {/* Bottom border line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor.replace("0.9", "0.3")}, transparent)` }}
                />
              </div>

              {/* Card body */}
              <div className="p-4 sm:p-5">
                <h3 className="font-cinzel text-sm font-bold tracking-wide text-[#FFE699] mb-2 group-hover:text-white transition-colors duration-300">
                  {p.nome}
                </h3>
                <p className="font-outfit text-[11px] text-[rgba(255,230,153,0.38)] leading-relaxed mb-4">
                  {p.descricao}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="font-cinzel text-2xl font-black"
                    style={{ color: p.accentColor }}
                  >
                    R${p.preco}
                  </span>
                  <button
                    className="font-outfit text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: p.borderColor,
                      color: p.accentColor,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = p.glowColor;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    Presentear
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom card */}
      <div className="max-w-3xl mx-auto px-5 mt-16 text-center">
        <div
          className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden"
          style={{ border: "1px solid rgba(255,215,0,0.1)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            <Heart
              className="w-7 h-7 mx-auto mb-5"
              style={{
                color: "#ff3399",
                filter: "drop-shadow(0 0 8px rgba(255,51,153,0.6))",
                animation: "pulse-gold 2s ease-in-out infinite",
              }}
            />
            <h3 className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-[#FFE699] mb-2">
              O MELHOR PRESENTE
            </h3>
            <p className="font-cormorant italic text-lg sm:text-xl text-[rgba(255,230,153,0.45)] mb-2">
              "É a sua presença."
            </p>
            <p className="font-outfit text-sm text-[rgba(255,230,153,0.45)] leading-relaxed mb-7 max-w-md mx-auto">
              Mas se quiser fazer o momento durar mais, um PIX ou experiência deixa tudo ainda mais inesquecível.
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

    </div>
  );
}
