import { MapPin, Navigation } from "lucide-react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

// Line-up em estilo cartaz de festival: sem caixas, cada atração grande e em dourado metálico,
// na ordem do dia (abertura → encerramento), com o horário numa pílula neon.

type Atracao = {
  papel: string;
  inicio: string;
  fim: string;
  nome: string;
  cor: string;
  // logo: arquivo PNG (silhueta) usado como máscara do dourado; a proporção vem do arquivo, nunca estica
  logo?: { src: string; w: number; h: number; altura: string };
};

const ATRACOES: Atracao[] = [
  {
    papel: "Abertura", inicio: "15h", fim: "17h", nome: "Viviane Silva", cor: "#ff3399",
    logo: { src: "/img/lineup/viviane-silva.png", w: 700, h: 178, altura: "clamp(46px, 12vw, 84px)" },
  },
  { papel: "No palco", inicio: "17h30", fim: "20h", nome: "Alexsa Matos", cor: "#ffd700" },
  {
    papel: "Encerramento", inicio: "20h30", fim: "23h", nome: "Edineide Sousa", cor: "#00d4ff",
    logo: { src: "/img/lineup/edineide-souza.png", w: 520, h: 397, altura: "clamp(104px, 28vw, 168px)" },
  },
];

const OURO = "linear-gradient(180deg, #FFF6D2 0%, #FFE08A 32%, #E7B84A 58%, #B8892C 82%, #8C6620 100%)";

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Casa Holanda do Vale, Rua Colômbia, 4219 A, Embratel, Porto Velho");

function Divisor() {
  return (
    <div className="flex items-center justify-center gap-3 my-9 sm:my-12" aria-hidden>
      <span className="h-px w-16 sm:w-28" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.45))" }} />
      <span style={{ color: "#ffd700", fontSize: 12, textShadow: "0 0 8px #ffd700" }}>✦</span>
      <span className="h-px w-16 sm:w-28" style={{ background: "linear-gradient(-90deg, transparent, rgba(255,215,0,0.45))" }} />
    </div>
  );
}

function Nome({ a }: { a: Atracao }) {
  if (a.logo) {
    // a logo vira "dourado metálico": o gradiente é recortado pelo desenho da logo
    const mask = `url(${a.logo.src}) center / contain no-repeat`;
    return (
      <div
        role="img"
        aria-label={a.nome}
        className="mx-auto"
        style={{
          height: a.logo.altura,
          aspectRatio: `${a.logo.w} / ${a.logo.h}`,
          maxWidth: "100%",
          background: OURO,
          WebkitMask: mask,
          mask,
          filter: `drop-shadow(0 0 18px ${a.cor}55)`,
        }}
      />
    );
  }
  return (
    <p
      className="font-cinzel font-black leading-none tracking-wide"
      style={{
        fontSize: "clamp(34px, 10vw, 68px)",
        background: OURO,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: `drop-shadow(0 0 18px ${a.cor}55)`,
      }}
    >
      {a.nome}
    </p>
  );
}

export default function Lineup() {
  return (
    <section className="relative z-10 py-16 sm:py-24 overflow-hidden">
      {/* feixes de luz de palco, discretos, atrás do cartaz */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[70%] pointer-events-none lineup-beams" />

      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <div className="section-label gold mb-4">
          <span className="font-outfit text-[9px] tracking-[0.45em] uppercase" style={{ color: "rgba(255,215,0,0.85)" }}>
            Atrações
          </span>
        </div>
        <SplitReveal
          text="LINE-UP"
          className="font-cinzel font-black text-5xl sm:text-7xl tracking-wider text-[#FFE699] mb-3"
          style={{ textShadow: "0 0 30px rgba(255,215,0,0.2)" }}
        />
        <p className="font-cormorant italic text-lg sm:text-xl" style={{ color: "rgba(255,230,153,0.85)" }}>
          Segunda-feira, 08 de fevereiro · 3 shows ao vivo
        </p>

        <Divisor />

        {ATRACOES.map((a, i) => (
          <div key={a.nome}>
            <Reveal delay={0.05}>
              <article className="flex flex-col items-center">
                <p className="font-outfit text-[10px] sm:text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: a.cor, textShadow: `0 0 10px ${a.cor}88` }}>
                  {a.papel}
                </p>
                <h3 className="sr-only">{a.nome}</h3>
                <Nome a={a} />
                <p className="font-dancing text-xl sm:text-2xl mt-3" style={{ color: "rgba(255,230,153,0.9)" }}>
                  e banda
                </p>
                <p
                  className="mt-4 inline-flex items-center gap-2.5 rounded-full px-5 py-2 font-outfit font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase"
                  style={{
                    color: "#fff",
                    border: `1px solid ${a.cor}`,
                    background: `${a.cor}1a`,
                    boxShadow: `0 0 14px ${a.cor}55, inset 0 0 10px ${a.cor}22`,
                  }}
                >
                  {a.inicio}
                  <span style={{ color: a.cor }}>—</span>
                  {a.fim}
                </p>
              </article>
            </Reveal>
            {i < ATRACOES.length - 1 && <Divisor />}
          </div>
        ))}

        {/* Local */}
        <Reveal delay={0.1}>
          <div className="mt-14 sm:mt-16 flex flex-col items-center">
            <MapPin className="w-6 h-6 mb-3" style={{ color: "#ffd700", filter: "drop-shadow(0 0 8px rgba(255,215,0,0.6))" }} />
            <p className="font-outfit text-[9px] tracking-[0.45em] uppercase mb-1.5" style={{ color: "rgba(255,230,153,0.75)" }}>Local</p>
            <p className="font-cinzel font-black text-2xl sm:text-3xl tracking-wide text-[#FFE699]">Casa Holanda do Vale</p>
            <p className="font-outfit text-sm mt-1.5 mb-6" style={{ color: "rgba(255,230,153,0.85)" }}>Rua Colômbia, 4219 A · Embratel</p>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-xl"
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
