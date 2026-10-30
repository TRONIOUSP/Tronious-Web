import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'
import { THEME_ATTRIBUTE } from '@/lib/theme'

afterEach(() => {
  vi.restoreAllMocks()
  localStorage.clear()
  document.documentElement.removeAttribute(THEME_ATTRIBUTE)
})

const toggle = () => screen.getByRole('button', { name: /theme/i })

describe('ThemeToggle', () => {
  it('exposes an accessible name that names the current preference', () => {
    render(<ThemeToggle />)
    expect(toggle()).toHaveAccessibleName(/system/i)
  })

  it('cycles system -> light -> dark -> system', () => {
    render(<ThemeToggle />)

    fireEvent.click(toggle())
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('light')

    fireEvent.click(toggle())
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark')

    fireEvent.click(toggle())
    expect(document.documentElement.hasAttribute(THEME_ATTRIBUTE)).toBe(false)
  })

  it('persists the chosen preference', () => {
    render(<ThemeToggle />)
    fireEvent.click(toggle())
    expect(localStorage.getItem('tronious-theme')).toBe('light')
  })

  it('still renders and cycles when localStorage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('The operation is insecure.')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('The operation is insecure.')
    })

    render(<ThemeToggle />)
    expect(toggle()).toBeInTheDocument()

    fireEvent.click(toggle())
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('light')
  })
})
