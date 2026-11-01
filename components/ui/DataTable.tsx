import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** Scroll container for a page's own table, so wide tables scroll rather than overflow. */
export default function DataTable({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div data-table-wrap="" className={cx('ui-table-wrap', className)}>
      {children}
    </div>
  )
}
