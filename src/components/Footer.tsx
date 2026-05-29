import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)",
        borderTop: "1px solid rgba(201,168,76,0.07)",
      }}
    >
      {/* Gold top line */}
      <div className="h-px w-full" style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 30%, rgba(255,51,153,0.2) 50%, rgba(201,168,76,0.25) 70%, transparent 100%)",
      }} />

      <div className="max-w-5xl mx-auto px-5 py-14 sm:py-16 text-center">

        {/* Brand mark */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35))" }} />
            <span
              className="text-xl"
              style={{ color: "#ffd700", filter: "drop-shadow(0 0 10px rgba(255,215,0,0.8))" }}
            >
              ♛
            </span>
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.35), transparent)" }} />
          </div>
          <p className="font-cinzel font-bold text-[11px] tracking-[0.4em] text-[rgba(201,168,76,0.7)] uppercase mb-0.5">
            Camarote Savaris
          </p>
          <p className="font-outfit font-light text-[9px] tracking-[0.5em] text-[rgba(201,168,76,0.3)] uppercase">
            40 Tons de Glitter apresenta
          </p>
        </div>

        {/* Slogan */}
        <p className="font-dancing text-2xl sm:text-3xl rainbow-text mb-6">
          Brilhe sem moderação.
        </p>

        {/* Divider */}
        <div className="gold-divider w-16 mx-auto mb-6" />

        {/* Event info */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-[rgba(255,230,153,0.35)] mb-6 font-outfit">
          <span>08 Fev 2027</span>
          <span className="w-0.5 h-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.3)" }} />
          <span>15h</span>
          <span className="w-0.5 h-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.3)" }} />
          <span>Local em breve</span>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-7 mb-6">
          {[
            { href: "/",          label: "Home" },
            { href: "/presentes", label: "Presentes" },
            { href: "/inscricao", label: "Inscrição" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-outfit text-[9px] tracking-[0.22em] uppercase text-[rgba(255,230,153,0.28)] hover:text-[rgba(255,230,153,0.7)] transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Sub tagline */}
        <p className="font-outfit text-[9px] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.12)]">
          Exclusivo · Premium · Inesquecível
        </p>
      </div>
    </footer>
  );
}
