import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

import About from './page'

describe('About page', () => {
  it('presents a complete narrative without unfinished placeholders', () => {
    render(<About />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'One connected team for the whole device journey',
    )
    expect(
      screen.getByText('A therapy device is never difficult in only one place'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Founded in|2–3 paragraphs|\[Name\]/i)).not.toBeInTheDocument()
  })

  it('does not render the removed leadership section', () => {
    render(<About />)

    expect(screen.queryByRole('heading', { name: 'Leadership' })).not.toBeInTheDocument()
    expect(screen.queryByText('Chief Executive Officer')).not.toBeInTheDocument()
  })

  it('offers clear next steps for prospective clients and candidates', () => {
    render(<About />)

    expect(screen.getAllByRole('link', { name: 'Start a project' })).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'See how we work' })).toHaveAttribute(
      'href',
      '/process',
    )
    expect(screen.getByRole('link', { name: 'View careers' })).toHaveAttribute('href', '/careers')
  })
})
