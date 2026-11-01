import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import Ph from '@/components/ui/Ph'
import Reveal from '@/components/ui/Reveal'

/**
 * A decorative recap of the NDA / scoping / response-window flow already
 * described in the contact page's lead paragraph ("We reply within [2]
 * business days. We sign an NDA before any detailed technical discussion."),
 * placed above the inquiry form. The full sentence lives in the lead
 * paragraph above this figure, so it is marked decorative to avoid a screen
 * reader announcing the same text twice.
 */
const STAGES: { title: string; detail: ReactNode }[] = [
  {
    title: 'Response window',
    detail: (
      <>
        We reply within <Ph>[2]</Ph> business days
      </>
    ),
  },
  { title: 'NDA', detail: 'We sign an NDA' },
  { title: 'Scoping discussion', detail: 'before any detailed technical discussion' },
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
