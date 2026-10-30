import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * Visibility is driven by the `hidden` attribute rather than a class, so it
 * holds even before CSS loads and is readable by assistive tech. ContactForm's
 * existing test depends on exactly this behaviour.
 */
export default function Note({
  children,
  hidden,
  id,
  className,
}: {
  children: ReactNode
  hidden?: boolean
  id?: string
  className?: string
}) {
  return (
    <p id={id} hidden={hidden} data-note="" className={cx('ui-note', className)}>
      {children}
    </p>
  )
}
