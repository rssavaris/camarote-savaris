const ITEMS = ["08.02.2027", "CAMAROTE SAVARIS", "40 TONS DE GLITTER", "BRILHE SEM MODERAÇÃO", "PORTO VELHO"];

export default function NeonMarquee({ reverse = false }: { reverse?: boolean }) {
  const row = ITEMS.flatMap((t) => [t, "✦"]);
  return (
    <div
      className="neon-marquee relative z-10 overflow-hidden py-4 border-y"
      style={{ borderColor: "rgba(255,215,0,0.18)", background: "rgba(0,0,0,0.35)" }}
      aria-hidden
    >
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {[0, 1].map((k) => (
          <div key={k} className="marquee-group">
            {row.map((t, i) => (
              <span key={i} className={t === "✦" ? "marquee-star" : "marquee-word"}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
