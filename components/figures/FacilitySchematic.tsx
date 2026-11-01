import { cx } from '@/lib/cx'
import Reveal from '@/components/ui/Reveal'

/**
 * A decorative overview of the three in-house equipment categories, placed
 * near the top of the facilities page. The full, accessible equipment lists
 * live in the cards that follow this figure, so this figure is marked
 * decorative to avoid a screen reader announcing the same equipment twice.
 *
 * Only the zone names and their ordinal position are shown — no quantity or
 * unit is attached to any zone, since the page's own copy makes no such
 * claim (a bullet like "Thermal chambers and data loggers" is not
 * necessarily one discrete "system").
 */
const ZONES = ['Test & measurement', 'Prototyping', 'Production']

export default function FacilitySchematic({ className }: { className?: string }) {
  return (
    <figure data-facility-schematic="" aria-hidden="true" className={cx(className)}>
      <ol data-facility-schematic-list="">
        {ZONES.map((title, index) => (
          <Reveal as="li" key={title} delay={index * 80}>
            <span data-facility-schematic-num="">{String(index + 1).padStart(2, '0')}</span>
            <span data-facility-schematic-title="">{title}</span>
          </Reveal>
        ))}
      </ol>
    </figure>
  )
}
