import Image from "next/image";
import { SPONSORS } from "@/lib/sponsors";

// Faixa infinita com os patrocinadores. Aparece em todas as páginas, acima do rodapé.
export default function SponsorsStrip() {
  // 2 repetições por grupo para cobrir telas largas; o track tem 2 grupos (loop contínuo)
  const row = [...SPONSORS, ...SPONSORS];
  return (
    <section
      aria-label="Patrocinadores"
      className="sponsor-strip relative z-10 border-y"
      style={{ borderColor: "rgba(255,215,0,0.14)", background: "rgba(0,0,0,0.55)" }}
    >
      <p className="font-outfit text-center text-[9px] tracking-[0.5em] uppercase pt-5 pb-1" style={{ color: "rgba(255,230,153,0.7)" }}>
        <span style={{ color: "#ffd700" }}>✦</span>&nbsp; Patrocinadores &nbsp;<span style={{ color: "#ffd700" }}>✦</span>
      </p>
      <div className="sponsor-mask overflow-hidden py-5">
        <div className="sponsor-track">
          {[0, 1].map((g) => (
            <div key={g} className="sponsor-group" aria-hidden={g === 1}>
              {row.map((s, i) => (
                <div key={i} className="sponsor-item" style={{ height: 58 }}>
                  <Image
                    src={s.src}
                    alt={g === 0 ? s.name : ""}
                    width={s.w}
                    height={s.h}
                    sizes="200px"
                    style={{ height: Math.round(s.show * 0.78), width: "auto" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
