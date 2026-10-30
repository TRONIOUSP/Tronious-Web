'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * Whether this visitor should get entrance animation at all. Checked in JS as
 * well as CSS because the observer must not run either — an observer that
 * never fires on a browser without one would leave content hidden forever.
 */
export function shouldAnimate(): boolean {
  if (typeof window === 'undefined') return false
  if (!window.IntersectionObserver) return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === false
}

/**
 * Fades and lifts its children into view once.
 *
 * The important property is how it fails. The hidden state is applied in CSS
 * only under `html[data-motion="on"]`, an attribute set by the head script
 * exclusively when motion is allowed AND IntersectionObserver exists. So with
 * JS disabled, a script error, an old browser, or reduced motion, nothing is
 * ever hidden — the content simply renders. Hiding first and revealing with JS
 * would make a broken script mean an invisible site.
 */
export default function Reveal({
  as: Tag = 'div' as ElementType,
  delay = 0,
  className,
  children,
}: {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<'pending' | 'shown'>('pending')

  useEffect(() => {
    if (!shouldAnimate()) return
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          // Set from the observer callback, not the effect body: this is a
          // response to an event, and it runs once before disconnecting.
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={cx(className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
