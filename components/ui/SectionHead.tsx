import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * The eyebrow and lead are both optional and render nothing at all when
 * absent. Most non-home pages have no eyebrow, and inventing one would be new
 * visible copy — which this project is not allowed to add.
 */
export default function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'start',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'start' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span
          data-eyebrow=""
          className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
        >
          {eyebrow}
        </span>
      ) : null}

      <Tag
        className={cx(
          'font-display font-semibold text-text-primary',
          Tag === 'h1' ? 'text-h1 tracking-[-0.025em]' : 'text-h2 tracking-[-0.02em]',
        )}
      >
        {title}
      </Tag>

      {lead ? (
        <p
          data-lead=""
          className={cx(
            'text-lead leading-[1.55] text-text-secondary',
            align === 'center' ? 'max-w-[62ch]' : 'max-w-[68ch]',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
