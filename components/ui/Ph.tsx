import type { ReactNode } from 'react'

/**
 * An unfinished fact, shown as an editorial annotation rather than a
 * highlighter smear: mono, muted amber, a fine dotted underline and a small
 * marker glyph. Visible enough that it cannot ship by accident, quiet enough
 * that the page still reads as finished design.
 *
 * All visual treatment lives in CSS under the root marking attribute, so this
 * component renders the same markup whether marking is on or off.
 */
export default function Ph({ children, wrap = false }: { children: ReactNode; wrap?: boolean }) {
  return (
    <span data-placeholder="" data-wrap={wrap ? '' : undefined}>
      {children}
    </span>
  )
}
