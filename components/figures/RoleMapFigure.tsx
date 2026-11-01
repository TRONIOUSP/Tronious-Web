import { cx } from '@/lib/cx'

/**
 * A decorative recap of the open roles against the six process gates,
 * placed above the roles table on the careers page. Gate names are the same
 * six used by `ProcessGateFlow` on the process page. Roles are mapped by
 * team (Engineering, Quality & Regulatory, Manufacturing — the Team column
 * on the roles table) rather than by job title, since the job titles
 * themselves are placeholders on that table. The full, authoritative role
 * detail lives in the table that follows this figure, so it is marked
 * decorative to avoid a screen reader announcing the same gate twice.
 */
const GATES = [
  'Concept & feasibility',
  'Design inputs & planning',
  'Detailed design',
  'Verification & validation',
  'Regulatory submission',
  'Design transfer & production',
]

const GATE_TEAMS: Record<string, string> = {
  'Detailed design': 'Engineering',
  'Regulatory submission': 'Quality & Regulatory',
  'Design transfer & production': 'Manufacturing',
}

export default function RoleMapFigure({ className }: { className?: string }) {
  return (
    <figure data-role-map="" aria-hidden="true" className={cx(className)}>
      <ol data-role-map-list="">
        {GATES.map((gate) => (
          <li key={gate}>
            <span data-role-map-gate="">{gate}</span>
            <span data-role-map-team="">{GATE_TEAMS[gate] ?? '—'}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
