import Image from "next/image";
import { SPONSORS } from "@/lib/sponsors";

// Patrocinadores no topo do hero: faixa de ponta a ponta da tela, com as logos grandes passando devagar.
export default function HeroSponsors() {
  // 2 repetições por grupo para cobrir telas largas; o track tem 2 grupos (loop contínuo)
  const row = [...SPONSORS, ...SPONSORS];
  return (
    <div
      className="hero-sponsors fade-up mb-6"
      style={{ opacity: 0, animationDelay: "0.02s", width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      <p className="flex items-center justify-center gap-3 mb-2 font-outfit text-[9px] sm:text-[10px] tracking-[0.5em] uppercase" style={{ color: "rgba(255,230,153,0.8)" }}>
        <span className="h-px w-10 sm:w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.55))" }} />
        Patrocínio
        <span className="h-px w-10 sm:w-20" style={{ background: "linear-gradient(-90deg, transparent, rgba(255,215,0,0.55))" }} />
      </p>
      <div className="sponsor-mask overflow-hidden py-2">
        <div className="sponsor-track hero-track">
          {[0, 1].map((g) => (
            <div key={g} className="sponsor-group" aria-hidden={g === 1}>
              {row.map((s, i) => (
                <div key={i} className="sponsor-item" style={{ height: "calc(92px * var(--hs))" }}>
                  <Image
                    src={s.src}
                    alt={g === 0 ? s.name : ""}
                    width={s.w}
                    height={s.h}
                    sizes="240px"
                    priority={g === 0 && i < 4}
                    style={{ height: `calc(${s.show}px * var(--hs))`, width: "auto" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
