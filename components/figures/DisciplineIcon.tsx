import type { ReactElement } from 'react'

type Discipline = 'mechanical' | 'pcb' | 'firmware' | 'app' | 'wearable' | 'test'

const icons: Record<Discipline, ReactElement> = {
  mechanical: (
    <>
      {/* Mechanical — a wrench over a bolt */}
      <circle cx="18" cy="30" r="7" strokeWidth="1.5" />
      <path d="M18 23 V13" strokeWidth="1.5" />
      <path
        d="M30 6 L42 18 L36 24 L24 12 Q22 9 25 7 Q28 5 30 6 Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="31" y1="17" x2="36" y2="22" strokeWidth="1.5" />
    </>
  ),
  pcb: (
    <>
      {/* PCB & electronics — a chip on a board with traces */}
      <rect x="16" y="16" width="16" height="16" rx="1.5" strokeWidth="1.5" />
      <rect x="20" y="20" width="8" height="8" strokeWidth="1.5" />
      <path
        d="M24 6 V16 M24 32 V42 M6 24 H16 M32 24 H42 M10 10 H16 V16 M38 10 H32 V16 M10 38 H16 V32 M38 38 H32 V32"
        strokeWidth="1.5"
      />
    </>
  ),
  firmware: (
    <>
      {/* Firmware — a microcontroller with code brackets */}
      <rect x="12" y="10" width="24" height="28" rx="2" strokeWidth="1.5" />
      <path d="M19 19 L15 24 L19 29" strokeWidth="1.5" fill="none" />
      <path d="M29 19 L33 24 L29 29" strokeWidth="1.5" fill="none" />
      <line x1="12" y1="16" x2="6" y2="16" strokeWidth="1.5" />
      <line x1="12" y1="32" x2="6" y2="32" strokeWidth="1.5" />
      <line x1="36" y1="16" x2="42" y2="16" strokeWidth="1.5" />
      <line x1="36" y1="32" x2="42" y2="32" strokeWidth="1.5" />
    </>
  ),
  app: (
    <>
      {/* Mobile apps & connectivity — a phone with a signal */}
      <rect x="14" y="5" width="20" height="38" rx="3" strokeWidth="1.5" />
      <line x1="20" y1="37" x2="28" y2="37" strokeWidth="1.5" />
      <path d="M18 18 A9 9 0 0 1 30 18" strokeWidth="1.5" fill="none" />
      <path d="M21 22 A4.5 4.5 0 0 1 27 22" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="26" r="1.4" strokeWidth="1" />
    </>
  ),
  wearable: (
    <>
      {/* Wearables — a wrist band with a sensor face */}
      <path d="M14 16 Q24 10 34 16" strokeWidth="1.5" fill="none" />
      <path d="M14 32 Q24 38 34 32" strokeWidth="1.5" fill="none" />
      <rect x="15" y="16" width="18" height="16" rx="4" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3.4" strokeWidth="1.5" />
    </>
  ),
  test: (
    <>
      {/* Test equipment — a gauge with a needle */}
      <circle cx="24" cy="25" r="16" strokeWidth="1.5" />
      <path d="M24 25 L32 17" strokeWidth="1.5" />
      <circle cx="24" cy="25" r="1.8" strokeWidth="1.5" />
      <path d="M13 14 L16 17 M35 14 L32 17" strokeWidth="1.5" />
      <line x1="24" y1="5" x2="24" y2="4" strokeWidth="1.5" />
    </>
  ),
}

export default function DisciplineIcon({
  discipline,
  className,
}: {
  discipline: Discipline
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
      {icons[discipline]}
    </svg>
  )
}
