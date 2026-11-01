export default function HeroCompression({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="hero-compression-title"
      role="img"
      className={className}
    >
      <title id="hero-compression-title">
        Pneumatic compression therapy device — four-chamber sequential inflation
      </title>

      {/* Foot outline */}
      <path
        d="M120 280 Q100 260 95 230 Q90 200 100 170 Q110 140 130 130 Q160 120 180 125 Q200 130 210 140 Q230 130 250 128 Q270 126 275 140 Q280 155 265 165 Q255 160 245 165 Q240 180 250 190 Q260 200 255 215 Q248 235 230 245 Q215 255 200 258 Q180 270 165 280 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />

      {/* Chamber 1 — heel */}
      <rect
        data-chamber="1"
        x="105"
        y="225"
        width="50"
        height="28"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        className="chamber chamber-1"
      />

      {/* Chamber 2 — arch */}
      <rect
        data-chamber="2"
        x="130"
        y="195"
        width="55"
        height="26"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        className="chamber chamber-2"
      />

      {/* Chamber 3 — ball */}
      <rect
        data-chamber="3"
        x="158"
        y="167"
        width="58"
        height="24"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        className="chamber chamber-3"
      />

      {/* Chamber 4 — toe */}
      <rect
        data-chamber="4"
        x="188"
        y="143"
        width="50"
        height="20"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        className="chamber chamber-4"
      />

      {/* Hose lines from chambers to pump — dashed flowing lines */}
      <path
        d="M 105 239 Q 70 239 60 200 Q 55 170 65 150"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
        className="hose"
      />
      <path
        d="M 130 208 Q 80 208 68 180 Q 65 165 65 150"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
        className="hose"
      />
      <path
        d="M 158 179 Q 95 179 70 162 Q 66 156 65 150"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
        className="hose"
      />
      <path
        d="M 188 153 Q 130 153 80 152 Q 70 151 65 150"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
        className="hose"
      />

      {/* Pump body */}
      <rect
        x="40"
        y="120"
        width="50"
        height="60"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <rect x="55" y="112" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="65" cy="150" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />

      {/* Unlabelled readout trace — four sequential bars, no numerals */}
      <g transform="translate(300, 130)" opacity="0.8">
        {/* Readout frame */}
        <rect x="0" y="0" width="80" height="100" rx="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Trace bars — illuminate in sequence, no labels */}
        <rect x="8" y="76" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1" className="trace trace-1" />
        <rect x="28" y="56" width="16" height="36" rx="2" stroke="currentColor" strokeWidth="1" className="trace trace-2" />
        <rect x="48" y="36" width="16" height="56" rx="2" stroke="currentColor" strokeWidth="1" className="trace trace-3" />
        <rect x="68" y="16" width="16" height="76" rx="2" stroke="currentColor" strokeWidth="1" className="trace trace-4" />
        {/* Baseline */}
        <line x1="4" y1="94" x2="76" y2="94" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      </g>

      {/* Dimension leader lines */}
      <line x1="300" y1="240" x2="260" y2="240" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.3" />
      <line x1="300" y1="240" x2="300" y2="260" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="300" y1="260" x2="120" y2="290" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.25" />
    </svg>
  )
}
