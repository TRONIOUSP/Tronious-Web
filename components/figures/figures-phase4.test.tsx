import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServiceAreaIcon from './ServiceAreaIcon'
import DeviceComparisonFigure from './DeviceComparisonFigure'
import DisciplineIcon from './DisciplineIcon'
import ProductionFlowFigure from './ProductionFlowFigure'

describe('ServiceAreaIcon', () => {
  const areas = [
    'design',
    'regulatory',
    'testing',
    'manufacturing',
    'supply',
    'postmarket',
  ] as const

  it('renders a distinct illustration for each of the six service areas', () => {
    const svgContents = areas.map((area) => {
      const { container } = render(<ServiceAreaIcon area={area} />)
      return container.innerHTML
    })
    const unique = new Set(svgContents)
    expect(unique.size).toBe(6)
  })

  it('marks service area icons as decorative', () => {
    for (const area of areas) {
      const { container } = render(<ServiceAreaIcon area={area} />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    }
  })
})

describe('DeviceComparisonFigure', () => {
  it('renders all six device family names', () => {
    render(<DeviceComparisonFigure />)
    expect(screen.getByText('Spinal traction')).toBeInTheDocument()
    expect(screen.getByText('Knee traction & rehab')).toBeInTheDocument()
    expect(screen.getByText('Pneumatic compression')).toBeInTheDocument()
    expect(screen.getByText('Massage & non-pneumatic compression')).toBeInTheDocument()
    expect(screen.getByText('Thermal therapy')).toBeInTheDocument()
    expect(screen.getByText('Connected & wearable')).toBeInTheDocument()
  })
})

describe('DisciplineIcon', () => {
  const disciplines = ['mechanical', 'pcb', 'firmware', 'app', 'wearable', 'test'] as const

  it('renders a distinct illustration for each of the six engineering disciplines', () => {
    const svgContents = disciplines.map((discipline) => {
      const { container } = render(<DisciplineIcon discipline={discipline} />)
      return container.innerHTML
    })
    const unique = new Set(svgContents)
    expect(unique.size).toBe(6)
  })

  it('marks discipline icons as decorative', () => {
    for (const discipline of disciplines) {
      const { container } = render(<DisciplineIcon discipline={discipline} />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    }
  })
})

describe('ProductionFlowFigure', () => {
  it('renders all ten production flow step labels', () => {
    render(<ProductionFlowFigure />)
    expect(screen.getByText('Incoming inspection')).toBeInTheDocument()
    expect(screen.getByText('Kitting')).toBeInTheDocument()
    expect(screen.getByText('PCB assembly')).toBeInTheDocument()
    expect(screen.getByText('Sub-assembly')).toBeInTheDocument()
    expect(screen.getByText('Final assembly')).toBeInTheDocument()
    expect(screen.getByText('End-of-line test')).toBeInTheDocument()
    expect(screen.getByText('Burn-in')).toBeInTheDocument()
    expect(screen.getByText('Labeling & packaging')).toBeInTheDocument()
    expect(screen.getByText('Final QC & release')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })
})
