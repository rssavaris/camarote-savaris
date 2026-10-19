import Image from "next/image";
import { SPONSORS } from "@/lib/sponsors";

// Linha discreta de marcas no começo do hero: aparece já na primeira tela, sem competir com o título.
export default function HeroSponsors() {
  return (
    <div className="hero-sponsors fade-up w-full max-w-xl mx-auto mb-6" style={{ opacity: 0, animationDelay: "0.02s" }}>
      <p className="flex items-center justify-center gap-3 mb-3 font-outfit text-[8px] sm:text-[9px] tracking-[0.5em] uppercase" style={{ color: "rgba(255,230,153,0.75)" }}>
        <span className="h-px w-8 sm:w-14" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.5))" }} />
        Patrocínio
        <span className="h-px w-8 sm:w-14" style={{ background: "linear-gradient(-90deg, transparent, rgba(255,215,0,0.5))" }} />
      </p>
      <div className="flex items-center justify-center gap-x-4 sm:gap-x-7">
        {SPONSORS.map((s) => (
          <Image
            key={s.name}
            src={s.src}
            alt={s.name}
            width={s.w}
            height={s.h}
            sizes="120px"
            style={{ height: `calc(${s.show}px * var(--hs))`, width: "auto", opacity: 0.95 }}
          />
        ))}
      </div>
    </div>
  );
}
