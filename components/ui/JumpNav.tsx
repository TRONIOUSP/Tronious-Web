import { cx } from '@/lib/cx'

/** In-page anchor nav. Links are styled to clear the sticky header via `scroll-margin-top` in globals.css. */
export default function JumpNav({
  links,
  label = 'On this page',
  className,
}: {
  links: { href: string; label: string }[]
  label?: string
  className?: string
}) {
  return (
    <nav aria-label={label} data-jump-nav="" className={cx('ui-jump-nav', className)}>
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  )
}
