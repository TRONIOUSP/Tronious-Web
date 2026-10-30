import { describe, it, expect } from 'vitest'
import { cx } from './cx'

describe('cx', () => {
  it('joins the truthy parts with a single space', () => {
    expect(cx('a', 'b')).toBe('a b')
  })

  it('drops undefined, null and false so conditionals can be inlined', () => {
    expect(cx('a', undefined, null, false, 'b')).toBe('a b')
  })

  it('returns an empty string when nothing is truthy', () => {
    expect(cx(undefined, false)).toBe('')
  })
})
