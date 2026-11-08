import type { ReactElement } from 'react'

type Family =
  | 'electrotherapy'
  | 'photobiomodulation'
  | 'pneumatic'
  | 'massage'
  | 'thermal'
  | 'connected'

const icons: Record<Family, ReactElement> = {
  electrotherapy: (
    <>
      {/* Electrotherapy — paired electrode pads, lead wires and electrical pulse */}
      <rect x="5" y="27" width="15" height="17" rx="3" strokeWidth="1.5" />
      <rect x="28" y="27" width="15" height="17" rx="3" strokeWidth="1.5" />
      <path d="M12.5 27 V20 C12.5 14 16 11 20 11" strokeWidth="1.5" fill="none" />
      <path d="M35.5 27 V20 C35.5 14 32 11 28 11" strokeWidth="1.5" fill="none" />
      <path d="M24 3 L19.5 11 H24 L21.5 19 L29 9 H25 L28 3" strokeWidth="1.5" fill="none" />
    </>
  ),
  photobiomodulation: (
    <>
      {/* Photobiomodulation — light array with emitted treatment rays */}
      <rect x="6" y="30" width="36" height="12" rx="3" strokeWidth="1.5" />
      <circle cx="14" cy="36" r="1.5" strokeWidth="1.25" />
      <circle cx="21" cy="36" r="1.5" strokeWidth="1.25" />
      <circle cx="28" cy="36" r="1.5" strokeWidth="1.25" />
      <circle cx="35" cy="36" r="1.5" strokeWidth="1.25" />
      <line x1="24" y1="4" x2="24" y2="23" strokeWidth="1.5" />
      <line x1="14" y1="8" x2="18" y2="24" strokeWidth="1.5" />
      <line x1="34" y1="8" x2="30" y2="24" strokeWidth="1.5" />
      <line x1="6" y1="15" x2="12" y2="25" strokeWidth="1.5" />
      <line x1="42" y1="15" x2="36" y2="25" strokeWidth="1.5" />
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
  connected: (
    <>
      <rect x="14" y="12" width="20" height="27" rx="6" strokeWidth="1.5" />
      <path d="M20 8 Q24 4 28 8" strokeWidth="1.5" fill="none" />
      <path d="M17 5 Q24 -1 31 5" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="25" r="5" strokeWidth="1.5" />
      <path d="M22 25 L24 27 L28 22" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="43" x2="28" y2="43" strokeWidth="1.5" />
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
