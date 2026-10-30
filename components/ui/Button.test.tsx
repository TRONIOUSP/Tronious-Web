import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders a link when href is set', () => {
    render(<Button href="/contact">Start a project</Button>)
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })

  it('renders a button when href is absent', () => {
    render(<Button>Send inquiry</Button>)
    expect(screen.getByRole('button', { name: 'Send inquiry' })).toBeInTheDocument()
  })

  it('defaults a bare button to type="button" so it cannot submit a form by accident', () => {
    render(<Button>Menu</Button>)
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('type', 'button')
  })

  it('passes an explicit type through', () => {
    render(<Button type="submit">Send inquiry</Button>)
    expect(screen.getByRole('button', { name: 'Send inquiry' })).toHaveAttribute('type', 'submit')
  })

  it('carries the variant and size so CSS can style them', () => {
    render(
      <Button variant="ghost" size="lg">
        How we work
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'How we work' })
    expect(button).toHaveAttribute('data-variant', 'ghost')
    expect(button).toHaveAttribute('data-size', 'lg')
  })

  it('forwards the click handler', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Menu</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
