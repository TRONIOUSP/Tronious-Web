import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '@/lib/cx'

export type ButtonVariant = 'primary' | 'ghost' | 'subtle'
export type ButtonSize = 'md' | 'lg'

type Props = {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

/**
 * There is no `onDark` variant. A Section's tone re-points the semantic colour
 * aliases for its own subtree, so a primary button inside a band already fills
 * with signal and sits on band-coloured text. One less prop to thread through,
 * and no way to get it out of step with the section it lives in.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  type,
  className,
  children,
  ...rest
}: Props) {
  const shared = {
    'data-variant': variant,
    'data-size': size,
    className: cx('ui-btn', className),
  }

  if (href !== undefined) {
    // `rest` is typed for a button; on the link branch it carries only the
    // handlers and ARIA attributes both elements accept.
    const anchorRest = rest as ComponentPropsWithoutRef<'a'>
    return (
      <Link href={href} {...shared} {...anchorRest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type ?? 'button'} {...shared} {...rest}>
      {children}
    </button>
  )
}
