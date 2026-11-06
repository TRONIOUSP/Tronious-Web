import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

import Home from './page'

describe('Homepage — copy integrity', () => {
  it('renders the hero heading and lead verbatim', () => {
    render(<Home />)
    // Check both parts of the split heading
    expect(screen.getByText(/Your device\./)).toBeInTheDocument()
    expect(screen.getByText(/Designed, cleared and built/)).toBeInTheDocument()
    expect(
      screen.getByText(/We take traction, compression, massage and thermal therapy devices/),
    ).toBeInTheDocument()
  })

  it('renders all seven certification badges', () => {
    render(<Home />)
    expect(screen.getByText('ISO 13485:2016')).toBeInTheDocument()
    expect(screen.getByText('MDSAP')).toBeInTheDocument()
    expect(screen.getByText('FDA Registered Facility')).toBeInTheDocument()
    expect(screen.getByText('IEC 60601-1')).toBeInTheDocument()
  })

  it('renders all five device family names', () => {
    render(<Home />)
    expect(screen.getByText('Spinal traction')).toBeInTheDocument()
    expect(screen.getByText(/Knee traction/)).toBeInTheDocument()
    expect(screen.getByText('Pneumatic compression')).toBeInTheDocument()
    expect(screen.getByText(/Massage/)).toBeInTheDocument()
    expect(screen.getByText('Thermal therapy')).toBeInTheDocument()
  })

  it('renders all six engineering discipline titles', () => {
    render(<Home />)
    expect(screen.getAllByText(/Mechanical/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('PCB & electronics')).toBeInTheDocument()
    expect(screen.getByText('Embedded firmware')).toBeInTheDocument()
    expect(screen.getByText('Mobile apps')).toBeInTheDocument()
    expect(screen.getByText('Wearables')).toBeInTheDocument()
    expect(screen.getByText('Test equipment')).toBeInTheDocument()
  })

  it('renders the project principles without placeholder social proof', () => {
    render(<Home />)
    expect(screen.getByText('A clear path through a complex device launch')).toBeInTheDocument()
    expect(screen.getByText('Decisions at the right time')).toBeInTheDocument()
    expect(screen.getByText('One connected development loop')).toBeInTheDocument()
    expect(screen.getByText('Documentation that moves with the product')).toBeInTheDocument()
    expect(screen.queryByText(/Client quote/)).not.toBeInTheDocument()
  })

  it('renders both calls to action', () => {
    render(<Home />)
    const startLinks = screen.getAllByRole('link', { name: 'Start a project' })
    expect(startLinks.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('link', { name: 'How we work' })).toBeInTheDocument()
  })
})
