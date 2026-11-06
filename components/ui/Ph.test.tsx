import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Ph from './Ph'
import { PLACEHOLDER_ATTRIBUTE, PLACEHOLDER_MARKING } from '@/lib/placeholders'

describe('Ph', () => {
  it('renders its children verbatim', () => {
    render(<Ph>TRONIOUS</Ph>)
    expect(screen.getByText('TRONIOUS')).toBeInTheDocument()
  })

  it('always carries data-placeholder, so a pre-launch sweep finds every one', () => {
    render(<Ph>[XX]</Ph>)
    expect(screen.getByText('[XX]')).toHaveAttribute('data-placeholder')
  })

  it('does not wrap by default, so a short placeholder stays on one line', () => {
    render(<Ph>[XX]</Ph>)
    expect(screen.getByText('[XX]')).not.toHaveAttribute('data-wrap')
  })

  it('allows wrapping for long placeholders such as the pending client quote', () => {
    render(<Ph wrap>[Client quote: one or two sentences.]</Ph>)
    expect(screen.getByText('[Client quote: one or two sentences.]')).toHaveAttribute('data-wrap')
  })
})

describe('placeholder launch flag', () => {
  it('is a single boolean that controls all marking', () => {
    expect(typeof PLACEHOLDER_MARKING).toBe('boolean')
  })

  it('names the root attribute the stylesheet keys off', () => {
    expect(PLACEHOLDER_ATTRIBUTE).toBe('data-placeholder-marking')
  })

  it('is off, because no page renders a placeholder any more', () => {
    expect(PLACEHOLDER_MARKING).toBe(false)
  })
})
