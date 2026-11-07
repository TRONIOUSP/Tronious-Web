import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

import Engagement from './page'

describe('Engagement page', () => {
  it('explains all four engagement models', () => {
    render(<Engagement />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Choose how we work together',
    )
    expect(screen.getByRole('heading', { name: 'Design only' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Build to print' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Full turnkey' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Platform / private label' })).toBeInTheDocument()
  })

  it('gives visitors a clear way to compare models and make contact', () => {
    render(<Engagement />)

    expect(screen.getByRole('link', { name: 'Compare the models' })).toHaveAttribute(
      'href',
      '#models',
    )
    expect(screen.getByRole('link', { name: 'Discuss your project' })).toHaveAttribute(
      'href',
      '/contact',
    )
    expect(screen.getByRole('link', { name: 'Start the conversation' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })

  it('states the IP position without unfinished placeholder copy', () => {
    render(<Engagement />)

    expect(
      screen.getByText(/client owns all device-specific IP and design files/i),
    ).toBeInTheDocument()
    expect(screen.queryByText(/remove if not offered|have your legal team approve/i)).not.toBeInTheDocument()
  })
})
