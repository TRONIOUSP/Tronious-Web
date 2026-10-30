import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * `value` is a node, not a string, because every figure on the site is still a
 * placeholder. The type is sized and spaced for two to four digits plus a
 * unit, so real numbers drop in without the layout moving.
 */
export default function Stat({
  value,
  label,
  className,
}: {
  value: ReactNode
  label: ReactNode
  className?: string
}) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <span
        data-numeric=""
        className="font-display text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-bold leading-none text-text-primary"
      >
        {value}
      </span>
      <span className="text-sm leading-snug text-text-secondary">{label}</span>
    </div>
  )
}
