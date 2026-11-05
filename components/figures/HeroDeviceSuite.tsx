export default function HeroDeviceSuite({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="hero-suite-title"
      role="img"
      className={className}
    >
      <title id="hero-suite-title">
        Five therapy device families engineered by one team — spinal traction, knee rehab, pneumatic
        compression, massage and thermal therapy — arranged around a shared design-and-build process
      </title>

      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Center hub — concept-to-device mark */}
      <g transform="translate(210, 180)">
        <circle r="78" fill="url(#hub-glow)" className="suite-hub-glow" />
        <circle r="46" stroke="currentColor" strokeWidth="1.25" opacity="0.55" className="suite-hub-ring" />
        <circle r="36" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" className="suite-hub-dash" />
        <path
          d="M-16 4 L-6 14 L18 -12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="suite-hub-check"
        />
      </g>

      {/* Connector spokes to each device — animated flow toward the hub */}
      <g stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 5" opacity="0.4">
        <line x1="210" y1="134" x2="210" y2="76" className="suite-spoke suite-spoke-1" />
        <line x1="166" y1="150" x2="88" y2="96" className="suite-spoke suite-spoke-2" />
        <line x1="166" y1="210" x2="80" y2="240" className="suite-spoke suite-spoke-3" />
        <line x1="254" y1="150" x2="332" y2="96" className="suite-spoke suite-spoke-5" />
        <line x1="254" y1="210" x2="340" y2="240" className="suite-spoke suite-spoke-4" />
      </g>

      {/* Spinal traction — top */}
      <g transform="translate(186, 18) scale(1.1)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="suite-device suite-1">
        <rect x="18" y="4" width="12" height="7" rx="2" strokeWidth="1.5" />
        <rect x="17" y="14" width="14" height="7" rx="2" strokeWidth="1.5" />
        <rect x="16" y="24" width="16" height="7" rx="2" strokeWidth="1.5" />
        <rect x="15" y="34" width="18" height="8" rx="2" strokeWidth="1.5" />
        <line x1="8" y1="4" x2="8" y2="42" strokeWidth="1.5" />
        <polyline points="4,8 8,4 12,8" strokeWidth="1.5" fill="none" />
        <polyline points="4,38 8,42 12,38" strokeWidth="1.5" fill="none" />
      </g>
      <text x="210" y="76" textAnchor="middle" fontSize="9" letterSpacing="0.06em" fill="currentColor" opacity="0.55">SPINAL</text>

      {/* Knee traction — upper left */}
      <g transform="translate(40, 52) scale(1.1)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="suite-device suite-2">
        <ellipse cx="24" cy="16" rx="10" ry="12" strokeWidth="1.5" />
        <ellipse cx="24" cy="36" rx="10" ry="10" strokeWidth="1.5" />
        <line x1="24" y1="28" x2="24" y2="24" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="36" y1="16" x2="42" y2="10" strokeWidth="1.5" />
        <polyline points="38,10 42,10 42,14" strokeWidth="1.5" fill="none" />
        <line x1="36" y1="36" x2="42" y2="42" strokeWidth="1.5" />
        <polyline points="38,42 42,42 42,38" strokeWidth="1.5" fill="none" />
      </g>
      <text x="88" y="112" textAnchor="middle" fontSize="9" letterSpacing="0.06em" fill="currentColor" opacity="0.55">KNEE REHAB</text>

      {/* Pneumatic compression — lower left */}
      <g transform="translate(32, 210) scale(1.1)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="suite-device suite-3">
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
      </g>
      <text x="80" y="268" textAnchor="middle" fontSize="9" letterSpacing="0.06em" fill="currentColor" opacity="0.55">COMPRESSION</text>

      {/* Massage — lower right */}
      <g transform="translate(316, 210) scale(1.1)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="suite-device suite-4">
        <rect x="16" y="6" width="16" height="22" rx="4" strokeWidth="1.5" />
        <line x1="24" y1="28" x2="24" y2="36" strokeWidth="1.5" />
        <circle cx="24" cy="40" r="4" strokeWidth="1.5" />
        <path d="M8 30 Q5 26 8 22" strokeWidth="1.5" fill="none" />
        <path d="M5 34 Q1 28 5 20" strokeWidth="1.5" fill="none" />
        <path d="M40 30 Q43 26 40 22" strokeWidth="1.5" fill="none" />
        <path d="M43 34 Q47 28 43 20" strokeWidth="1.5" fill="none" />
      </g>
      <text x="340" y="268" textAnchor="middle" fontSize="9" letterSpacing="0.06em" fill="currentColor" opacity="0.55">MASSAGE</text>

      {/* Thermal therapy — upper right */}
      <g transform="translate(308, 52) scale(1.1)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="suite-device suite-5">
        <rect x="6" y="30" width="36" height="12" rx="3" strokeWidth="1.5" />
        <path d="M14 26 Q11 22 14 18 Q17 14 14 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M24 26 Q21 22 24 18 Q27 14 24 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M34 26 Q31 22 34 18 Q37 14 34 10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <text x="332" y="112" textAnchor="middle" fontSize="9" letterSpacing="0.06em" fill="currentColor" opacity="0.55">THERMAL</text>

      {/* Caption, bottom-right */}
      <g opacity="0.45">
        <line x1="258" y1="326" x2="411" y2="326" stroke="currentColor" strokeWidth="0.75" />
        <text x="411" y="340" textAnchor="end" fontSize="9" letterSpacing="0.08em" fill="currentColor">
          ONE TEAM · FIVE DEVICE FAMILIES
        </text>
      </g>
    </svg>
  )
}
