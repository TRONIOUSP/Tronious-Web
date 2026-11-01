import { cx } from '@/lib/cx'

/**
 * A decorative recap of the six suggested insight topics against the
 * device-lifecycle stage each one is written for, placed above the article
 * card grid on the insights page. The stage each topic maps to reuses the
 * same six phase-gate names and deliverables as `ProcessGateFlow` (e.g. the
 * "regulatory strategy" deliverable at Concept & feasibility, or the
 * "Submission-ready documentation" deliverable at Regulatory submission).
 * The full, authoritative topic titles live in the cards that follow this
 * figure, so it is marked decorative to avoid a screen reader announcing the
 * same topic twice.
 */
const TOPICS = [
  { category: 'Regulatory', stage: 'Concept & feasibility' },
  { category: 'Testing', stage: 'Verification & validation' },
  { category: 'EU MDR', stage: 'Regulatory submission' },
  { category: 'Design', stage: 'Detailed design' },
  { category: 'Manufacturing', stage: 'Design transfer & production' },
  { category: 'Australia', stage: 'Regulatory submission' },
]

export default function TopicMapFigure({ className }: { className?: string }) {
  return (
    <figure data-topic-map="" aria-hidden="true" className={cx(className)}>
      <ul data-topic-map-list="">
        {TOPICS.map((topic) => (
          <li key={topic.category}>
            <span data-topic-map-category="">{topic.category}</span>
            <span data-topic-map-stage="">{topic.stage}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
