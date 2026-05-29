export default function CrownSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`crown-glow ${className}`}
      width="72"
      height="48"
      viewBox="0 0 72 48"
    >
      <defs>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff5cc" />
          <stop offset="35%"  stopColor="#FFE699" />
          <stop offset="70%"  stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#836D30" />
        </linearGradient>
      </defs>
      <path
        d="M8 42 L5 16 L22 28 L36 4 L50 28 L67 16 L64 42 Z"
        fill="url(#crownGrad)"
        stroke="#fff5cc"
        strokeWidth="0.8"
      />
      <path
        d="M12 42 L10 22 L24 32 L36 10 L48 32 L62 22 L60 42 Z"
        fill="rgba(255,255,255,0.07)"
      />
      <circle cx="5"  cy="15" r="3.5" fill="#FFE699" />
      <circle cx="36" cy="4"  r="4"   fill="#fff5cc" />
      <circle cx="67" cy="15" r="3.5" fill="#FFE699" />
      <circle cx="21" cy="38" r="2.5" fill="#ff3399" />
      <circle cx="36" cy="38" r="3"   fill="#00d4ff" />
      <circle cx="51" cy="38" r="2.5" fill="#7b61ff" />
    </svg>
  );
}
