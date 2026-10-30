import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** Certifications and standards — outlined, mono, deliberately audit-like. */
export default function Badge({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span data-badge="" className={cx('ui-badge', className)}>
      {children}
    </span>
  )
}
