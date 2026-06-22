interface QPCharacterProps {
  size?: number;
  className?: string;
}

export default function QPCharacter({ size = 32, className = '' }: QPCharacterProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="QP character"
    >
      {/* Antennae */}
      <line x1="42" y1="26" x2="38" y2="8" stroke="#D94F4F" strokeWidth="5" strokeLinecap="round" />
      <line x1="78" y1="26" x2="82" y2="8" stroke="#D94F4F" strokeWidth="5" strokeLinecap="round" />
      <circle cx="36" cy="6" r="6" fill="#D94F4F" />
      <circle cx="84" cy="6" r="6" fill="#D94F4F" />

      {/* Legs */}
      <line x1="50" y1="92" x2="48" y2="110" stroke="#D94F4F" strokeWidth="6" strokeLinecap="round" />
      <line x1="70" y1="92" x2="72" y2="110" stroke="#D94F4F" strokeWidth="6" strokeLinecap="round" />

      {/* Body */}
      <circle cx="60" cy="62" r="44" fill="#E85A5A" />

      {/* Arms */}
      <circle cx="18" cy="58" r="10" fill="#E85A5A" />
      <circle cx="102" cy="58" r="10" fill="#E85A5A" />

      {/* Eyes */}
      <circle cx="46" cy="54" r="7" fill="#1A1A1A" />
      <circle cx="74" cy="54" r="7" fill="#1A1A1A" />
      <circle cx="48" cy="52" r="2.5" fill="#FFFFFF" />
      <circle cx="76" cy="52" r="2.5" fill="#FFFFFF" />

      {/* Subtle blush */}
      <ellipse cx="36" cy="70" rx="6" ry="3" fill="#F08A8A" opacity="0.6" />
      <ellipse cx="84" cy="70" rx="6" ry="3" fill="#F08A8A" opacity="0.6" />
    </svg>
  );
}
