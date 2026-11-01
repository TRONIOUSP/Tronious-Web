import { cx } from '@/lib/cx'
import Reveal from '@/components/ui/Reveal'

/**
 * A visual summary of the device-family comparison. The full, authoritative
 * breakdown (engineering challenges included) lives in the table that follows
 * this figure on the page, so this figure is marked decorative to avoid a
 * screen reader announcing the same family/standards pairing twice.
 */
const FAMILIES = [
  { name: 'Spinal traction', standards: ['IEC 60601-1', 'IEC 60601-1-2', 'IEC 62304', 'ISO 14971'] },
  { name: 'Knee traction & rehab', standards: ['IEC 60601-1', 'IEC 62366-1', 'ISO 14971'] },
  {
    name: 'Pneumatic compression',
    standards: ['IEC 60601-1', 'IEC 60601-1-11', 'ISO 10993 for garments'],
  },
  {
    name: 'Massage & non-pneumatic compression',
    standards: ['IEC 60601-1 or IEC 60335 as applicable', 'IEC 62133-2 for batteries'],
  },
  { name: 'Thermal therapy', standards: ['IEC 80601-2-35', 'IEC 60601-1-11'] },
  {
    name: 'Connected & wearable',
    standards: [
      'IEC 62304',
      'IEC 81001-5-1',
      'IEC 60601-1-11',
      'ISO 10993 series',
      'radio approvals',
    ],
  },
]

export default function DeviceComparisonFigure({ className }: { className?: string }) {
  return (
    <figure data-device-comparison="" aria-hidden="true" className={cx(className)}>
      <ul data-device-comparison-list="">
        {FAMILIES.map((family, i) => (
          <Reveal as="li" key={family.name} delay={i * 60}>
            <span data-device-comparison-name="">{family.name}</span>
            <span data-device-comparison-standards="">{family.standards.join(' · ')}</span>
          </Reveal>
        ))}
      </ul>
    </figure>
  )
}
