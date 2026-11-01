/**
 * A decorative illustration for the about page's "one team" claim: the six
 * engineering disciplines converging on a single device. The discipline names
 * match those used alongside `DisciplineIcon` on the engineering page, but
 * this is its own composed illustration (a convergence diagram), not a reuse
 * of that component. No discipline is otherwise described on the about page,
 * so the figure is marked decorative rather than given an accessible name.
 */
const DISCIPLINES = [
  { label: 'Mechanical & pneumatic design', x: 200, y: 60, labelDy: -30 },
  { label: 'PCB & electronics design', x: 295, y: 115, labelDy: -30 },
  { label: 'Embedded firmware', x: 295, y: 225, labelDy: 34 },
  { label: 'Mobile apps & connected devices', x: 200, y: 280, labelDy: 34 },
  { label: 'Wearable therapy devices', x: 105, y: 225, labelDy: 34 },
  { label: 'Test equipment & fixture design', x: 105, y: 115, labelDy: -30 },
]

const CENTER = { x: 200, y: 170 }

export default function DisciplinesConvergingFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 340"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-disciplines-converging=""
      className={className}
    >
      {DISCIPLINES.map((d) => (
        <line
          key={`line-${d.label}`}
          x1={d.x}
          y1={d.y}
          x2={CENTER.x}
          y2={CENTER.y}
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.4"
        />
      ))}

      {/* Converged device at the center */}
      <rect
        x={CENTER.x - 26}
        y={CENTER.y - 34}
        width="52"
        height="68"
        rx="8"
        strokeWidth="1.5"
      />
      <line
        x1={CENTER.x - 16}
        y1={CENTER.y + 20}
        x2={CENTER.x + 16}
        y2={CENTER.y + 20}
        strokeWidth="1.5"
      />
      <text
        x={CENTER.x}
        y={CENTER.y + 2}
        textAnchor="middle"
        fontSize="10"
        stroke="none"
        fill="currentColor"
      >
        Device
      </text>

      {DISCIPLINES.map((d) => (
        <g key={d.label}>
          <circle cx={d.x} cy={d.y} r="22" strokeWidth="1.5" />
          <text
            x={d.x}
            y={d.y + d.labelDy}
            textAnchor="middle"
            fontSize="9"
            stroke="none"
            fill="currentColor"
          >
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
