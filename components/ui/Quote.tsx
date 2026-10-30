import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

export default function Quote({
  children,
  attribution,
  className,
}: {
  children: ReactNode
  attribution?: ReactNode
  className?: string
}) {
  return (
    <blockquote data-quote="" className={cx('ui-quote', className)}>
      <p className="font-display text-[clamp(1.25rem,0.9rem+1.5vw,1.875rem)] font-medium leading-[1.35] text-text-primary">
        {children}
      </p>
      {attribution ? (
        <footer className="text-sm text-text-secondary">{attribution}</footer>
      ) : null}
    </blockquote>
  )
}
