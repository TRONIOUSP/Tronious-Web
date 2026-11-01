import { cx } from '@/lib/cx'
import Reveal from '@/components/ui/Reveal'

/**
 * A decorative quick-reference strip for the four engagement models, placed
 * above the model cards on the engagement page. The full description of each
 * model lives in the cards that follow this figure, so this figure is marked
 * decorative to avoid a screen reader announcing the same model titles twice.
 */
const MODELS = [
  { letter: 'A', title: 'Design only' },
  { letter: 'B', title: 'Build to print' },
  { letter: 'C', title: 'Full turnkey' },
  { letter: 'D', title: 'Platform / private label' },
]

export default function EngagementModelsFigure({ className }: { className?: string }) {
  return (
    <figure data-engagement-models="" aria-hidden="true" className={cx(className)}>
      <ol data-engagement-models-list="">
        {MODELS.map((model, i) => (
          <Reveal as="li" key={model.letter} delay={i * 70}>
            <span data-engagement-models-letter="">{`Model ${model.letter}`}</span>
            <span data-engagement-models-title="">{model.title}</span>
          </Reveal>
        ))}
      </ol>
    </figure>
  )
}
