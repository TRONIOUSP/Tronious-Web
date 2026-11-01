import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next/navigation', () => ({ usePathname: () => '/services' }))

import Header from './Header'

describe('Header drawer — Review Focus 4', () => {
  it('renders exactly one link per nav entry (no duplicate desktop+drawer nodes)', () => {
    render(<Header />)
    // If there were two nav lists, this would throw "Found multiple elements with role link and name 'Services'"
    expect(screen.getAllByRole('link', { name: 'Services' })).toHaveLength(1)
  })

  it('closes on Escape and returns focus to the Menu button', () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: 'Menu' })
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(btn)
  })

  it('locks body scroll while open and releases it on close', () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: 'Menu' })

    fireEvent.click(btn)
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(btn)
    expect(document.body.style.overflow).toBe('')
  })

  it('releases the body scroll lock when unmounted while open', () => {
    const { unmount } = render(<Header />)
    const btn = screen.getByRole('button', { name: 'Menu' })
    fireEvent.click(btn)
    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('exposes open state as a data attribute on the nav', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).not.toHaveAttribute('data-open')

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(nav).toHaveAttribute('data-open')
  })
})
