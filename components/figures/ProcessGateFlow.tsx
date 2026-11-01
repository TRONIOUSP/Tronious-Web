import { cx } from '@/lib/cx'

/**
 * A visual overview of the six phase gates, placed near the top of the
 * process page. The full breakdown for each gate — duration, activities and
 * deliverables — lives in the cards that follow, so this figure is marked
 * decorative to avoid a screen reader announcing the same gate titles and
 * deliverables twice.
 */
const GATES = [
  { title: 'Concept & feasibility', deliverables: 'Feasibility report, regulatory strategy, project plan and quote' },
  {
    title: 'Design inputs & planning',
    deliverables: 'Design and development plan, requirements specifications, risk management plan',
  },
  {
    title: 'Detailed design',
    deliverables: 'Frozen design, drawings, BOM, firmware release candidate, design review records',
  },
  {
    title: 'Verification & validation',
    deliverables: 'Test reports, traceability matrix, risk management report, usability engineering file',
  },
  { title: 'Regulatory submission', deliverables: 'Submission-ready documentation, labeling set' },
  { title: 'Design transfer & production', deliverables: 'Validated processes, first production lot' },
]

export default function ProcessGateFlow({ className }: { className?: string }) {
  return (
    <figure data-gate-flow="" aria-hidden="true" className={cx(className)}>
      <ol data-gate-flow-list="">
        {GATES.map((gate, index) => (
          <li key={gate.title}>
            <span data-gate-num="">{String(index + 1).padStart(2, '0')}</span>
            <span data-gate-title="">{gate.title}</span>
            <span data-gate-deliv="">{gate.deliverables}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
