import { cx } from '@/lib/cx'

/**
 * A decorative overview of the three in-house equipment categories, placed
 * near the top of the facilities page. The full, accessible equipment lists
 * live in the cards that follow this figure, so this figure is marked
 * decorative to avoid a screen reader announcing the same equipment twice.
 */
const ZONES = [
  { title: 'Test & measurement', count: 4 },
  { title: 'Prototyping', count: 3 },
  { title: 'Production', count: 3 },
]

export default function FacilitySchematic({ className }: { className?: string }) {
  return (
    <figure data-facility-schematic="" aria-hidden="true" className={cx(className)}>
      <ul data-facility-schematic-list="">
        {ZONES.map((zone) => (
          <li key={zone.title}>
            <span data-facility-schematic-title="">{zone.title}</span>
            <span data-facility-schematic-count="">
              {zone.count} systems
            </span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
