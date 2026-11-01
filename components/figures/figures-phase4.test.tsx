import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServiceAreaIcon from './ServiceAreaIcon'
import DeviceComparisonFigure from './DeviceComparisonFigure'
import DisciplineIcon from './DisciplineIcon'
import ProductionFlowFigure from './ProductionFlowFigure'
import ProcessGateFlow from './ProcessGateFlow'
import MarketCoverageFigure from './MarketCoverageFigure'
import FacilitySchematic from './FacilitySchematic'
import EngagementModelsFigure from './EngagementModelsFigure'
import CaseStudyFigure from './CaseStudyFigure'
import DisciplinesConvergingFigure from './DisciplinesConvergingFigure'
import TopicMapFigure from './TopicMapFigure'
import RoleMapFigure from './RoleMapFigure'
import RFQFlowFigure from './RFQFlowFigure'
import LegalStructureFigure from './LegalStructureFigure'

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

describe('ProcessGateFlow', () => {
  it('renders all six process gate headings', () => {
    render(<ProcessGateFlow />)
    expect(screen.getByText('Concept & feasibility')).toBeInTheDocument()
    expect(screen.getByText('Design inputs & planning')).toBeInTheDocument()
    expect(screen.getByText('Detailed design')).toBeInTheDocument()
    expect(screen.getByText('Verification & validation')).toBeInTheDocument()
    expect(screen.getByText('Regulatory submission')).toBeInTheDocument()
    expect(screen.getByText('Design transfer & production')).toBeInTheDocument()
  })
})

describe('MarketCoverageFigure', () => {
  it('renders all three regulatory markets', () => {
    render(<MarketCoverageFigure />)
    expect(screen.getByText('United States')).toBeInTheDocument()
    expect(screen.getByText('European Union')).toBeInTheDocument()
    expect(screen.getByText('Australia')).toBeInTheDocument()
  })
})

describe('FacilitySchematic', () => {
  it('renders the three equipment-category headings', () => {
    render(<FacilitySchematic />)
    expect(screen.getByText('Test & measurement')).toBeInTheDocument()
    expect(screen.getByText('Prototyping')).toBeInTheDocument()
    expect(screen.getByText('Production')).toBeInTheDocument()
  })
})

describe('EngagementModelsFigure', () => {
  it('renders all four engagement models', () => {
    render(<EngagementModelsFigure />)
    expect(screen.getByText('Model A')).toBeInTheDocument()
    expect(screen.getByText('Model B')).toBeInTheDocument()
    expect(screen.getByText('Model C')).toBeInTheDocument()
    expect(screen.getByText('Model D')).toBeInTheDocument()
  })
})

describe('CaseStudyFigure', () => {
  it('renders the shared challenge/approach structure', () => {
    render(<CaseStudyFigure />)
    expect(screen.getByText('Challenge')).toBeInTheDocument()
    expect(screen.getByText('Approach')).toBeInTheDocument()
  })
})

describe('DisciplinesConvergingFigure', () => {
  it('marks the figure as decorative', () => {
    const { container } = render(<DisciplinesConvergingFigure />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders a non-empty svg', () => {
    const { container } = render(<DisciplinesConvergingFigure />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.innerHTML.length).toBeGreaterThan(0)
  })
})

describe('TopicMapFigure', () => {
  it('renders all six suggested insight topics', () => {
    render(<TopicMapFigure />)
    expect(screen.getByText('Regulatory')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('EU MDR')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Manufacturing')).toBeInTheDocument()
    expect(screen.getByText('Australia')).toBeInTheDocument()
  })

  it('marks the figure as decorative', () => {
    const { container } = render(<TopicMapFigure />)
    expect(container.querySelector('figure')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('RoleMapFigure', () => {
  it('renders all six process gates', () => {
    render(<RoleMapFigure />)
    expect(screen.getByText('Concept & feasibility')).toBeInTheDocument()
    expect(screen.getByText('Design inputs & planning')).toBeInTheDocument()
    expect(screen.getByText('Detailed design')).toBeInTheDocument()
    expect(screen.getByText('Verification & validation')).toBeInTheDocument()
    expect(screen.getByText('Regulatory submission')).toBeInTheDocument()
    expect(screen.getByText('Design transfer & production')).toBeInTheDocument()
  })

  it('renders the open-role teams against the gates', () => {
    render(<RoleMapFigure />)
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(screen.getByText('Quality & Regulatory')).toBeInTheDocument()
    expect(screen.getByText('Manufacturing')).toBeInTheDocument()
  })

  it('marks the figure as decorative', () => {
    const { container } = render(<RoleMapFigure />)
    expect(container.querySelector('figure')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('RFQFlowFigure', () => {
  it('renders the NDA, scoping and response-window stages', () => {
    render(<RFQFlowFigure />)
    expect(screen.getByText('Response window')).toBeInTheDocument()
    expect(screen.getByText('NDA')).toBeInTheDocument()
    expect(screen.getByText('Scoping discussion')).toBeInTheDocument()
  })

  it('marks the figure as decorative', () => {
    const { container } = render(<RFQFlowFigure />)
    expect(container.querySelector('figure')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('LegalStructureFigure', () => {
  it('renders all four section names as links to their in-page anchors', () => {
    render(<LegalStructureFigure />)
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '#privacy')
    expect(screen.getByRole('link', { name: 'Terms of use' })).toHaveAttribute('href', '#terms')
    expect(screen.getByRole('link', { name: 'Cookie policy' })).toHaveAttribute('href', '#cookies')
    expect(screen.getByRole('link', { name: 'Accessibility statement' })).toHaveAttribute(
      'href',
      '#accessibility',
    )
  })
})
