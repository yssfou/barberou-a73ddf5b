interface Props {
  className?: string;
  glow?: boolean;
}

// Moorish pointed arch with geometric inner ornamentation
export default function ArchFrame({ className, glow }: Props) {
  return (
    <svg
      viewBox="0 0 400 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={glow ? { filter: "drop-shadow(0 0 30px rgba(201,168,76,0.35))" } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C96A" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Outer arch outline */}
      <path
        d="M40 580 L40 240 Q40 40 200 20 Q360 40 360 240 L360 580"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner arch */}
      <path
        d="M60 580 L60 250 Q60 60 200 42 Q340 60 340 250 L340 580"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.7"
        fill="none"
      />
      {/* Decorative inner ornaments — small arches inside */}
      <path
        d="M90 580 L90 270 Q90 90 200 75 Q310 90 310 270 L310 580"
        stroke="url(#goldGrad)"
        strokeWidth="0.6"
        opacity="0.5"
        fill="none"
      />
      {/* Geometric pattern band */}
      <g opacity="0.55" stroke="url(#goldGrad)" strokeWidth="0.7" fill="none">
        {/* Star pattern at apex */}
        <path d="M200 100 L210 130 L240 130 L215 150 L225 180 L200 162 L175 180 L185 150 L160 130 L190 130 Z" />
        <circle cx="200" cy="140" r="40" />
        <circle cx="200" cy="140" r="55" opacity="0.4" />
        {/* Diamonds along the arch */}
        <path d="M200 220 L210 235 L200 250 L190 235 Z" />
        <path d="M120 320 L130 335 L120 350 L110 335 Z" />
        <path d="M280 320 L290 335 L280 350 L270 335 Z" />
        <path d="M200 420 L210 435 L200 450 L190 435 Z" />
        <path d="M120 470 L130 485 L120 500 L110 485 Z" />
        <path d="M280 470 L290 485 L280 500 L270 485 Z" />
        {/* Vertical guides */}
        <line x1="200" y1="200" x2="200" y2="580" />
        <line x1="120" y1="280" x2="120" y2="580" opacity="0.4" />
        <line x1="280" y1="280" x2="280" y2="580" opacity="0.4" />
        {/* Horizontal bands */}
        <line x1="60" y1="290" x2="340" y2="290" opacity="0.4" />
        <line x1="60" y1="400" x2="340" y2="400" opacity="0.3" />
      </g>
    </svg>
  );
}

export function CornerOrnament({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={flip ? { transform: "scaleX(-1) scaleY(-1)" } : undefined}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.9">
        <path d="M0 60 Q0 0 60 0" />
        <path d="M0 75 Q0 15 75 15" opacity="0.6" />
        <path d="M0 90 Q0 30 90 30" opacity="0.4" />
        <path d="M20 20 L30 30 L20 40 L10 30 Z" />
        <circle cx="45" cy="15" r="3" />
        <circle cx="15" cy="45" r="3" />
        <path d="M35 35 L50 50" />
        <path d="M50 50 L55 45 M50 50 L45 55" />
      </g>
    </svg>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={`gold-divider ${className || ""}`}>
      <span className="gold-divider-line" />
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M12 2 L16 12 L12 22 L8 12 Z" fill="#C9A84C" />
        <path d="M12 6 L14 12 L12 18 L10 12 Z" fill="#0D1021" />
      </svg>
      <span className="gold-divider-line" />
    </div>
  );
}

export function BarberPole({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 180" className={className} aria-hidden="true">
      <defs>
        <pattern id="pole" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#fff" />
          <rect width="10" height="20" fill="#E63946" />
          <rect x="10" width="10" height="20" fill="#1E4DB7" />
        </pattern>
      </defs>
      <rect x="15" y="20" width="30" height="140" rx="4" fill="url(#pole)" stroke="#C9A84C" strokeWidth="2" />
      <ellipse cx="30" cy="20" rx="18" ry="6" fill="#C9A84C" />
      <ellipse cx="30" cy="160" rx="18" ry="6" fill="#C9A84C" />
      <circle cx="30" cy="10" r="6" fill="#E8C96A" stroke="#B8860B" strokeWidth="1" />
      <circle cx="30" cy="170" r="6" fill="#E8C96A" stroke="#B8860B" strokeWidth="1" />
    </svg>
  );
}
