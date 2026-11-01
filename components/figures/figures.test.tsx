import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DeviceFamilyIcon from './DeviceFamilyIcon'
import ConceptFlow from './ConceptFlow'

describe('DeviceFamilyIcon', () => {
  const families = ['spinal', 'knee', 'pneumatic', 'massage', 'thermal'] as const

  it('renders a distinct illustration for each of the five families', () => {
    const svgContents = families.map((family) => {
      const { container } = render(<DeviceFamilyIcon family={family} />)
      return container.innerHTML
    })
    // All five should be distinct SVG shapes
    const unique = new Set(svgContents)
    expect(unique.size).toBe(5)
  })

  it('marks device family icons as decorative', () => {
    for (const family of families) {
      const { container } = render(<DeviceFamilyIcon family={family} />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    }
  })
})

describe('ConceptFlow', () => {
  it('renders all five concept flow step names', () => {
    render(<ConceptFlow />)
    expect(screen.getByText('Concept')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('Build')).toBeInTheDocument()
  })
})
