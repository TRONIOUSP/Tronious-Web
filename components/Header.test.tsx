import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const pathname = { value: '/services' }
vi.mock('next/navigation', () => ({ usePathname: () => pathname.value }))

import Header from './Header'

describe('Header', () => {
  it('marks the current route with aria-current', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Engineering' })).not.toHaveAttribute('aria-current')
  })

  it('toggles the mobile menu open and closed', () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: 'Open menu' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn).toHaveTextContent('')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(btn).toHaveAccessibleName('Close menu')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu when the route changes', () => {
    const { rerender } = render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    pathname.value = '/contact'
    rerender(<Header />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })
})
