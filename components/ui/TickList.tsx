import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * Entries are static content taken from the page copy, so the index is a
 * stable key — the list is never reordered, filtered or appended to.
 */
export default function TickList({
  items,
  className,
}: {
  items: ReactNode[]
  className?: string
}) {
  return (
    <ul data-ticks="" className={cx('ui-ticks', className)}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
