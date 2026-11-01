import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Footer', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders every footer link group', async () => {
    vi.doMock('@/lib/placeholders', () => ({ PLACEHOLDER_MARKING: false }))
    const { default: Footer } = await import('./Footer')
    render(<Footer />)
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Work with us')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toBeInTheDocument()
  })

  it('renders the placeholder legend when marking is on', async () => {
    vi.doMock('@/lib/placeholders', () => ({ PLACEHOLDER_MARKING: true }))
    const { default: Footer } = await import('./Footer')
    render(<Footer />)
    expect(screen.getByText(/marks placeholders/)).toBeInTheDocument()
  })

  it('omits the placeholder legend when marking is off', async () => {
    vi.doMock('@/lib/placeholders', () => ({ PLACEHOLDER_MARKING: false }))
    const { default: Footer } = await import('./Footer')
    render(<Footer />)
    expect(screen.queryByText(/marks placeholders/)).not.toBeInTheDocument()
  })
})
