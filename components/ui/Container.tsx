import type { ElementType, ReactNode } from 'react'
import { cx } from '@/lib/cx'

export type ContainerWidth = 'default' | 'narrow' | 'wide'

/**
 * Holds content to a readable measure inside a full-bleed section. The width
 * and gutter live in CSS keyed off `data-container`, so the safe-area insets
 * can be folded into the padding — which a utility class cannot express.
 */
export default function Container({
  width = 'default',
  as: Tag = 'div' as ElementType,
  className,
  children,
}: {
  width?: ContainerWidth
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Tag data-container={width} className={cx(className)}>
      {children}
    </Tag>
  )
}
