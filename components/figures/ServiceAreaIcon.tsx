import type { ReactElement } from 'react'

type Area = 'design' | 'regulatory' | 'testing' | 'manufacturing' | 'supply' | 'postmarket'

const icons: Record<Area, ReactElement> = {
  design: (
    <>
      {/* Design — pencil over a ruled sketch sheet */}
      <rect x="6" y="6" width="26" height="34" rx="2" strokeWidth="1.5" />
      <line x1="11" y1="15" x2="27" y2="15" strokeWidth="1.5" />
      <line x1="11" y1="22" x2="23" y2="22" strokeWidth="1.5" />
      <path
        d="M27 33 L40 20 L44 24 L31 37 L26 38 Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="37" y1="23" x2="41" y2="27" strokeWidth="1.5" />
    </>
  ),
  regulatory: (
    <>
      {/* Regulatory — document with an approval check and a seal */}
      <path d="M10 5 H30 L38 13 V43 H10 Z" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M30 5 V13 H38" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="16" y1="22" x2="30" y2="22" strokeWidth="1.5" />
      <line x1="16" y1="28" x2="26" y2="28" strokeWidth="1.5" />
      <path d="M15 35 L19 39 L27 31" strokeWidth="1.5" fill="none" />
    </>
  ),
  testing: (
    <>
      {/* Testing — a lab flask with a liquid line and bubbles */}
      <path
        d="M19 6 H29 V17 L37 38 Q38 41 35 41 H13 Q10 41 11 38 L19 17 Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="17" y1="6" x2="31" y2="6" strokeWidth="1.5" />
      <line x1="14.5" y1="30" x2="33.5" y2="30" strokeWidth="1.5" />
      <circle cx="21" cy="35" r="1.4" strokeWidth="1" />
      <circle cx="27" cy="36.5" r="1.1" strokeWidth="1" />
    </>
  ),
  manufacturing: (
    <>
      {/* Manufacturing — a gear */}
      <circle cx="24" cy="24" r="8" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.4" strokeWidth="1.5" />
      <path
        d="M24 6 V12 M24 36 V42 M42 24 H36 M12 24 H6 M36.4 11.6 L32.2 15.8 M15.8 32.2 L11.6 36.4 M36.4 36.4 L32.2 32.2 M15.8 15.8 L11.6 11.6"
        strokeWidth="1.5"
      />
    </>
  ),
  supply: (
    <>
      {/* Supply chain — a shipping box with an arrow onward */}
      <path d="M6 16 L24 8 L42 16 V34 L24 42 L6 34 Z" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 16 L24 24 L42 16" strokeWidth="1.5" fill="none" />
      <line x1="24" y1="24" x2="24" y2="42" strokeWidth="1.5" />
    </>
  ),
  postmarket: (
    <>
      {/* Post-market — a refresh loop with a wrench */}
      <path
        d="M10 22 A14 14 0 0 1 36 15"
        strokeWidth="1.5"
        fill="none"
      />
      <polyline points="30,12 36,15 35,22" strokeWidth="1.5" fill="none" />
      <path
        d="M38 26 A14 14 0 0 1 12 33"
        strokeWidth="1.5"
        fill="none"
      />
      <polyline points="18,36 12,33 13,26" strokeWidth="1.5" fill="none" />
    </>
  ),
}

export default function ServiceAreaIcon({
  area,
  className,
}: {
  area: Area
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icons[area]}
    </svg>
  )
}
