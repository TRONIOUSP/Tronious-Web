import { describe, it, expect } from 'vitest'
import { truncate } from './truncate'

describe('truncate', () => {
  it('returns short strings unchanged', () => {
    expect(truncate('abc', 5)).toBe('abc')
  })
  it('truncates and appends an ellipsis past the limit', () => {
    const input = 'a'.repeat(40)
    expect(truncate(input, 32)).toBe('a'.repeat(32) + '…')
  })
})
