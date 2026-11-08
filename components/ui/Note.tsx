import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cx } from '@/lib/cx'

/**
 * Visibility is driven by the `hidden` attribute rather than a class, so it
 * holds even before CSS loads and is readable by assistive tech. ContactForm's
 * existing test depends on exactly this behaviour.
 */
const Note = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
  function Note({ children, className, ...rest }, ref) {
    return (
      <p ref={ref} data-note="" className={cx('ui-note', className)} {...rest}>
        {children}
      </p>
    )
  },
)

export default Note
