import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroCompression from './HeroCompression'

describe('HeroCompression', () => {
  it('renders an accessible title describing the figure', () => {
    render(<HeroCompression />)
    expect(screen.getByTitle(/compression/i)).toBeInTheDocument()
  })

  it('renders four chamber elements', () => {
    const { container } = render(<HeroCompression />)
    expect(container.querySelectorAll('[data-chamber]')).toHaveLength(4)
  })

  it('contains no numeric text', () => {
    const { container } = render(<HeroCompression />)
    // No fabricated device parameters — readout is an unlabelled trace only
    expect(container.textContent).not.toMatch(/\d/)
  })
})
