import { cx } from '@/lib/cx'
import Reveal from '@/components/ui/Reveal'

/**
 * A decorative overview of the challenge / approach / metrics structure
 * shared by all three case-study templates on the cases page. The page's own
 * copy states these are templates, not three distinct real projects, so this
 * figure represents the one shared structure rather than drawing a separate
 * diagram per case. The accessible, case-specific detail lives in the cards
 * that follow, so this figure is marked decorative.
 */
const STAGES = [
  { title: 'Challenge', detail: 'What the client needed' },
  { title: 'Approach', detail: 'What we did' },
  { title: 'Metrics', detail: 'Timeline, market and outcome' },
]

export default function CaseStudyFigure({ className }: { className?: string }) {
  return (
    <figure data-case-study-figure="" aria-hidden="true" className={cx(className)}>
      <ol data-case-study-figure-list="">
        {STAGES.map((stage, index) => (
          <Reveal as="li" key={stage.title} delay={index * 80}>
            <span data-case-study-figure-num="">{String(index + 1).padStart(2, '0')}</span>
            <span data-case-study-figure-title="">{stage.title}</span>
            <span data-case-study-figure-detail="">{stage.detail}</span>
          </Reveal>
        ))}
      </ol>
    </figure>
  )
}
