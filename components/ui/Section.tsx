import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import Container, { type ContainerWidth } from './Container'

/**
 * Tones are semantic roles, not fixed colours. Each resolves differently per
 * theme — in light a `sunken` section recedes, in dark it rises instead,
 * because there is nowhere darker to recede to. Resolution lives in
 * `app/globals.css` keyed off `data-tone`; see spec 7.6.
 */
export type SectionTone = 'default' | 'sunken' | 'band' | 'accent'

export default function Section({
  tone = 'default',
  rule = false,
  width = 'default',
  contain = true,
  id,
  className,
  children,
}: {
  tone?: SectionTone
  rule?: boolean
  width?: ContainerWidth
  contain?: boolean
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      data-rule={rule ? '' : undefined}
      className={cx('relative py-section', className)}
    >
      {contain ? <Container width={width}>{children}</Container> : children}
    </section>
  )
}
