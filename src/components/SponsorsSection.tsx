import Image from "next/image";
import { SPONSORS } from "@/lib/sponsors";
import SplitReveal from "@/components/SplitReveal";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";

// Seção de destaque dos patrocinadores na home.
export default function SponsorsSection() {
  return (
    <section className="relative z-10 py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <div className="section-label gold mb-4">
          <span className="font-outfit text-[9px] tracking-[0.45em] uppercase" style={{ color: "rgba(255,215,0,0.8)" }}>
            Patrocinadores oficiais
          </span>
        </div>
        <SplitReveal
          text="QUEM FAZ A FESTA BRILHAR"
          className="font-cinzel font-black text-3xl sm:text-5xl tracking-wider text-[#FFE699] mb-3"
          style={{ textShadow: "0 0 30px rgba(255,215,0,0.15)" }}
        />
        <p className="font-cormorant italic text-lg sm:text-xl max-w-md mx-auto mb-12" style={{ color: "rgba(255,230,153,0.8)" }}>
          Marcas que acreditam na folia e fazem o Camarote Savaris acontecer.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-8 gap-3 sm:gap-4">
          {SPONSORS.map((s, i) => (
            <Reveal
              key={s.name}
              delay={i * 0.07}
              className={[
                "md:col-span-2",
                i === 4 ? "md:col-start-2" : "",                       // 2ª linha (3 logos) centralizada no desktop
                i === SPONSORS.length - 1 ? "col-span-2 justify-self-center w-1/2 md:col-span-2 md:w-full md:justify-self-auto" : "", // último centralizado no celular
              ].join(" ")}
            >
              <TiltCard max={7} className="rounded-2xl h-full">
                <div
                  className="glass-card gold-border-glow rounded-2xl flex items-center justify-center h-24 sm:h-32 px-5"
                >
                  <Image
                    src={s.src}
                    alt={s.name}
                    width={s.w}
                    height={s.h}
                    sizes="(max-width: 768px) 45vw, 220px"
                    style={{ height: "auto", width: "auto", maxHeight: Math.round(s.show * 1.15), maxWidth: "88%" }}
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
