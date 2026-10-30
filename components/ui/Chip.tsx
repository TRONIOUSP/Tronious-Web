import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** Deliverables — filled and softer than a Badge, which carries a standard. */
export default function Chip({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span data-chip="" className={cx('ui-chip', className)}>
      {children}
    </span>
  )
}
