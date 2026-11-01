import { cx } from '@/lib/cx'

/**
 * Per spec §9.3, a policy-structure map is navigational, not illustrative —
 * forcing an abstract diagram onto four legal section names would invent
 * meaning that isn't there. This is the spec's own named fallback: a plain,
 * well-styled sectional index, styled with the mono/eyebrow type used
 * site-wide, linking to each section's in-page anchor.
 */
const SECTIONS = [
  { href: '#privacy', label: 'Privacy policy' },
  { href: '#terms', label: 'Terms of use' },
  { href: '#cookies', label: 'Cookie policy' },
  { href: '#accessibility', label: 'Accessibility statement' },
]

export default function LegalStructureFigure({ className }: { className?: string }) {
  return (
    <nav aria-label="Legal sections" data-legal-structure="" className={cx(className)}>
      <ol data-legal-structure-list="">
        {SECTIONS.map(({ href, label }, index) => (
          <li key={href}>
            <a href={href} data-legal-structure-link="">
              <span data-legal-structure-index="" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
