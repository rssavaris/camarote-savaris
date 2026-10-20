import { MapPin, Music2, Navigation } from "lucide-react";
import SplitReveal from "@/components/SplitReveal";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";

const ATRACOES = [
  { inicio: "15h",   fim: "17h", nome: "Viviane Silva",  cor: "#ff3399" },
  { inicio: "17h30", fim: "20h", nome: "Alexsa Matos",   cor: "#ffd700" },
  { inicio: "20h30", fim: "23h", nome: "Edineide Sousa", cor: "#00d4ff" },
];

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Casa Holanda do Vale, Rua Colômbia, 4219 A, Embratel, Porto Velho");

// Line-up do dia e local do evento.
export default function Lineup() {
  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <div className="section-label gold mb-4">
          <span className="font-outfit text-[9px] tracking-[0.45em] uppercase" style={{ color: "rgba(255,215,0,0.85)" }}>
            Atrações
          </span>
        </div>
        <SplitReveal
          text="LINE-UP"
          className="font-cinzel font-black text-4xl sm:text-6xl tracking-wider text-[#FFE699] mb-3"
          style={{ textShadow: "0 0 30px rgba(255,215,0,0.18)" }}
        />
        <p className="font-cormorant italic text-lg sm:text-xl mb-10" style={{ color: "rgba(255,230,153,0.82)" }}>
          Segunda-feira, 08 de fevereiro · 3 shows ao vivo
        </p>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
          {ATRACOES.map((a, i) => (
            <Reveal key={a.nome} delay={i * 0.1}>
              <TiltCard max={6} className="rounded-2xl h-full">
                <div
                  className="glass-card rounded-2xl px-6 py-8 sm:py-10 h-full flex flex-col items-center"
                  style={{ border: `1px solid ${a.cor}33` }}
                >
                  <Music2 className="w-4 h-4 mb-4" style={{ color: a.cor, filter: `drop-shadow(0 0 6px ${a.cor})` }} />
                  <p
                    className="font-cinzel font-black text-3xl sm:text-4xl leading-none"
                    style={{ color: "#FFE699", textShadow: "0 0 24px rgba(255,215,0,0.25)" }}
                  >
                    {a.inicio}
                    <span className="mx-2 text-xl align-middle" style={{ color: a.cor }}>—</span>
                    {a.fim}
                  </p>
                  <div className="h-px w-14 my-5" style={{ background: `linear-gradient(90deg, transparent, ${a.cor}, transparent)` }} />
                  <h3 className="font-cinzel font-bold text-xl sm:text-2xl tracking-wider text-white">{a.nome}</h3>
                  <p className="font-dancing text-xl mt-1" style={{ color: a.cor }}>e banda</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Local */}
        <Reveal delay={0.1}>
          <div
            className="glass-card gold-border-glow rounded-2xl mt-4 sm:mt-6 px-6 py-7 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 text-center sm:text-left"
          >
            <MapPin className="w-7 h-7 flex-shrink-0" style={{ color: "#ffd700", filter: "drop-shadow(0 0 8px rgba(255,215,0,0.6))" }} />
            <div>
              <p className="font-outfit text-[9px] tracking-[0.4em] uppercase mb-1" style={{ color: "rgba(255,230,153,0.75)" }}>Local</p>
              <p className="font-cinzel font-black text-xl sm:text-2xl tracking-wide text-[#FFE699]">Casa Holanda do Vale</p>
              <p className="font-outfit text-sm mt-1" style={{ color: "rgba(255,230,153,0.85)" }}>Rua Colômbia, 4219 A · Embratel</p>
            </div>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-xl flex-shrink-0"
            >
              <Navigation className="w-4 h-4" />
              Como chegar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
