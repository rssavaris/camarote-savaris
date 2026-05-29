export default function MaskSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`mask-float ${className}`}
      width="300"
      height="190"
      viewBox="0 0 300 190"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(255,215,0,0.7)) drop-shadow(0 0 44px rgba(255,51,153,0.45))",
      }}
    >
      <defs>
        <linearGradient id="maskGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FFE699" />
          <stop offset="40%"  stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#836D30" />
        </linearGradient>
        <radialGradient id="gemPink" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#ff3399" />
        </radialGradient>
        <radialGradient id="gemCyan" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#00d4ff" />
        </radialGradient>
        <radialGradient id="gemGold" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fff" />
          <stop offset="100%" stopColor="#ffd700" />
        </radialGradient>
      </defs>

      {/* Feathers left */}
      <g opacity="0.95">
        <path d="M85 105 Q45 70 55 25 Q65 55 90 100"   fill="#ff3399" />
        <path d="M85 105 Q50 72 58 28"  stroke="#ff80c0" strokeWidth="1.2" fill="none" />
        <path d="M100 95 Q70 52 80 8 Q90 42 105 90"   fill="#7b61ff" />
        <path d="M100 95 Q72 54 82 10"  stroke="#b0a0ff" strokeWidth="1.2" fill="none" />
        <path d="M118 85 Q102 42 112 0 Q120 35 122 82" fill="#00d4ff" />
        <path d="M118 85 Q104 44 114 2" stroke="#80f0ff" strokeWidth="1.2" fill="none" />
      </g>

      {/* Feathers right */}
      <g opacity="0.95">
        <path d="M182 85 Q198 42 188 0 Q180 35 178 82" fill="#39ff14" />
        <path d="M182 85 Q196 44 186 2" stroke="#90ff80" strokeWidth="1.2" fill="none" />
        <path d="M200 95 Q230 52 220 8 Q210 42 195 90"  fill="#ff6b35" />
        <path d="M200 95 Q228 54 218 10" stroke="#ffaa00" strokeWidth="1.2" fill="none" />
        <path d="M215 105 Q255 70 245 25 Q235 55 210 100" fill="#ffd700" />
        <path d="M215 105 Q250 72 242 28" stroke="#fff176" strokeWidth="1.2" fill="none" />
      </g>

      {/* Center feather */}
      <path d="M150 92 Q132 45 150 -5 Q168 45 150 92" fill="url(#maskGold)" />

      {/* Mask body */}
      <path
        d="M45 108 Q45 72 92 74 Q128 76 150 100 Q172 76 208 74
           Q255 72 255 108 Q255 150 208 148 Q162 146 150 118
           Q138 146 92 148 Q45 150 45 108 Z"
        fill="url(#maskGold)"
        stroke="#fff5cc"
        strokeWidth="1.5"
      />
      {/* Sheen */}
      <path
        d="M55 108 Q55 82 95 84 Q130 86 150 104 Q170 86 205 84
           Q245 82 245 108 Q245 130 205 132 Q168 134 150 112
           Q132 134 95 132 Q55 130 55 108 Z"
        fill="rgba(255,255,255,0.06)"
      />

      {/* Eye holes */}
      <ellipse cx="92"  cy="108" rx="26" ry="17" fill="#0a0505" />
      <ellipse cx="208" cy="108" rx="26" ry="17" fill="#0a0505" />

      {/* Gems */}
      <circle cx="58"  cy="103" r="5"   fill="url(#gemPink)" />
      <circle cx="70"  cy="88"  r="3.5" fill="url(#gemCyan)" />
      <circle cx="126" cy="82"  r="4"   fill="url(#gemGold)" />
      <circle cx="174" cy="82"  r="4"   fill="url(#gemCyan)" />
      <circle cx="230" cy="88"  r="3.5" fill="url(#gemPink)" />
      <circle cx="242" cy="103" r="5"   fill="url(#gemGold)" />
      <circle cx="150" cy="130" r="5.5" fill="url(#gemPink)" />

      {/* Ribbons */}
      <path d="M95 148 Q80 165 60 170"   stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M205 148 Q220 165 240 170" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
