import type { ElementType, ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * `interactive` gates hover elevation. A card that does not respond to a click
 * should not lift under the cursor and promise that it will.
 */
export default function Card({
  as: Tag = 'div' as ElementType,
  interactive = false,
  className,
  children,
}: {
  as?: ElementType
  interactive?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <Tag
      data-card=""
      data-interactive={interactive ? '' : undefined}
      className={cx('ui-card', className)}
    >
      {children}
    </Tag>
  )
}
