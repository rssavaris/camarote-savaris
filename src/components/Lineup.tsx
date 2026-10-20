import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

const ATRACOES = [
  { inicio: "15h",   fim: "17h", nome: "Viviane Silva",  cor: "#ff3399", logo: { src: "/img/lineup/viviane-silva.png",  w: 700, h: 178, altura: 46 } },
  { inicio: "17h30", fim: "20h", nome: "Alexsa Matos",   cor: "#ffd700" },
  { inicio: "20h30", fim: "23h", nome: "Edineide Sousa", cor: "#00d4ff", logo: { src: "/img/lineup/edineide-souza.png", w: 520, h: 397, altura: 74 } },
];

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Casa Holanda do Vale, Rua Colômbia, 4219 A, Embratel, Porto Velho");

// Line-up do dia e local do evento. Faixas no estilo flyer: horário grande de um lado, atração do outro.
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
        <p className="font-cormorant italic text-lg sm:text-xl mb-8" style={{ color: "rgba(255,230,153,0.82)" }}>
          Segunda-feira, 08 de fevereiro · 3 shows ao vivo
        </p>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {ATRACOES.map((a, i) => (
            <Reveal key={a.nome} delay={i * 0.1}>
              <div
                className="glass-card rounded-2xl overflow-hidden flex items-stretch text-left"
                style={{ border: `1px solid ${a.cor}45` }}
              >
                <div
                  className="flex flex-col items-center justify-center shrink-0 w-[104px] sm:w-[160px] py-4"
                  style={{
                    background: `linear-gradient(135deg, ${a.cor}38, ${a.cor}0d)`,
                    borderRight: `1px solid ${a.cor}45`,
                  }}
                >
                  <span className="font-cinzel font-black text-2xl sm:text-4xl leading-none" style={{ color: "#FFE699", textShadow: "0 0 20px rgba(255,215,0,0.3)" }}>
                    {a.inicio}
                  </span>
                  <span className="font-outfit text-[9px] sm:text-[10px] tracking-[0.35em] uppercase my-1.5" style={{ color: a.cor }}>
                    às
                  </span>
                  <span className="font-cinzel font-black text-2xl sm:text-4xl leading-none" style={{ color: "#FFE699", textShadow: "0 0 20px rgba(255,215,0,0.3)" }}>
                    {a.fim}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center px-4 sm:px-8 py-4">
                  {a.logo ? (
                    <>
                      <h3 className="sr-only">{a.nome}</h3>
                      <Image
                        src={a.logo.src}
                        alt=""
                        width={a.logo.w}
                        height={a.logo.h}
                        sizes="240px"
                        style={{ height: Math.round(a.logo.altura * 0.78), width: "auto", maxWidth: "100%" }}
                      />
                    </>
                  ) : (
                    <h3 className="font-cinzel font-black text-xl sm:text-3xl tracking-wider text-white leading-tight">{a.nome}</h3>
                  )}
                  <p className="font-dancing text-lg sm:text-xl mt-1" style={{ color: a.cor }}>e banda</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Local */}
        <Reveal delay={0.1}>
          <div className="glass-card gold-border-glow rounded-2xl mt-4 sm:mt-6 max-w-3xl mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 text-center sm:text-left">
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
