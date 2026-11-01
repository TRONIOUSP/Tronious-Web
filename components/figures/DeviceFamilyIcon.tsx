import type { ReactElement } from 'react'

type Family = 'spinal' | 'knee' | 'pneumatic' | 'massage' | 'thermal'

const icons: Record<Family, ReactElement> = {
  spinal: (
    <>
      {/* Spinal traction — stacked vertebra-like blocks with traction arrow */}
      <rect x="18" y="4" width="12" height="7" rx="2" strokeWidth="1.5" />
      <rect x="17" y="14" width="14" height="7" rx="2" strokeWidth="1.5" />
      <rect x="16" y="24" width="16" height="7" rx="2" strokeWidth="1.5" />
      <rect x="15" y="34" width="18" height="8" rx="2" strokeWidth="1.5" />
      <line x1="8" y1="4" x2="8" y2="42" strokeWidth="1.5" />
      <polyline points="4,8 8,4 12,8" strokeWidth="1.5" fill="none" />
      <polyline points="4,38 8,42 12,38" strokeWidth="1.5" fill="none" />
    </>
  ),
  knee: (
    <>
      {/* Knee traction — joint with distraction gap and force lines */}
      <ellipse cx="24" cy="16" rx="10" ry="12" strokeWidth="1.5" />
      <ellipse cx="24" cy="36" rx="10" ry="10" strokeWidth="1.5" />
      <line x1="24" y1="28" x2="24" y2="24" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="36" y1="16" x2="42" y2="10" strokeWidth="1.5" />
      <polyline points="38,10 42,10 42,14" strokeWidth="1.5" fill="none" />
      <line x1="36" y1="36" x2="42" y2="42" strokeWidth="1.5" />
      <polyline points="38,42 42,42 42,38" strokeWidth="1.5" fill="none" />
    </>
  ),
  pneumatic: (
    <>
      {/* Pneumatic compression — layered chambers on a limb */}
      <rect x="14" y="4" width="20" height="9" rx="3" strokeWidth="1.5" />
      <rect x="16" y="15" width="16" height="9" rx="3" strokeWidth="1.5" />
      <rect x="18" y="26" width="12" height="9" rx="3" strokeWidth="1.5" />
      <rect x="19" y="37" width="10" height="7" rx="3" strokeWidth="1.5" />
      <line x1="6" y1="8" x2="14" y2="8" strokeWidth="1.5" />
      <line x1="6" y1="20" x2="16" y2="20" strokeWidth="1.5" />
      <line x1="6" y1="31" x2="18" y2="31" strokeWidth="1.5" />
      <circle cx="6" cy="8" r="2" strokeWidth="1" />
      <circle cx="6" cy="20" r="2" strokeWidth="1" />
      <circle cx="6" cy="31" r="2" strokeWidth="1" />
    </>
  ),
  massage: (
    <>
      {/* Massage — percussive head with vibration waves */}
      <rect x="16" y="6" width="16" height="22" rx="4" strokeWidth="1.5" />
      <line x1="24" y1="28" x2="24" y2="36" strokeWidth="1.5" />
      <circle cx="24" cy="40" r="4" strokeWidth="1.5" />
      <path d="M8 30 Q5 26 8 22" strokeWidth="1.5" fill="none" />
      <path d="M5 34 Q1 28 5 20" strokeWidth="1.5" fill="none" />
      <path d="M40 30 Q43 26 40 22" strokeWidth="1.5" fill="none" />
      <path d="M43 34 Q47 28 43 20" strokeWidth="1.5" fill="none" />
    </>
  ),
  thermal: (
    <>
      {/* Thermal therapy — pad with heat wave lines */}
      <rect x="6" y="30" width="36" height="12" rx="3" strokeWidth="1.5" />
      <path d="M14 26 Q11 22 14 18 Q17 14 14 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M24 26 Q21 22 24 18 Q27 14 24 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M34 26 Q31 22 34 18 Q37 14 34 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
}

export default function DeviceFamilyIcon({
  family,
  className,
}: {
  family: Family
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
      {icons[family]}
    </svg>
  )
}
