import { cx } from '@/lib/cx'
import Reveal from '@/components/ui/Reveal'

/**
 * A compact overview of the information path into a first scoping discussion.
 * The full, accessible guidance lives beside the form, so the figure remains
 * decorative to avoid announcing the same instructions twice.
 */
const STAGES = [
  {
    title: '01 · Project brief',
    detail: 'Device, stage, markets and current constraint',
  },
  { title: '02 · Confidentiality', detail: 'NDA before protected technical detail' },
  { title: '03 · Scoping discussion', detail: 'Team, evidence, interfaces and next step' },
]

export default function RFQFlowFigure({ className }: { className?: string }) {
  return (
    <figure data-rfq-flow="" aria-hidden="true" className={cx(className)}>
      <ol data-rfq-flow-list="">
        {STAGES.map((stage, i) => (
          <Reveal as="li" key={stage.title} delay={i * 80}>
            <span data-rfq-flow-title="">{stage.title}</span>
            <span data-rfq-flow-detail="">{stage.detail}</span>
          </Reveal>
        ))}
      </ol>
    </figure>
  )
}
