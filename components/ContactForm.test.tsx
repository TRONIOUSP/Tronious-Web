import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  afterEach(() => vi.restoreAllMocks())

  it('reveals the preview note on submit without console warnings', () => {
    const errorSpy = vi.spyOn(console, 'error')
    render(<ContactForm />)
    expect(screen.getByText(/this is a preview form/i)).not.toBeVisible()
    fireEvent.submit(screen.getByRole('button', { name: /send inquiry/i }).closest('form')!)
    expect(screen.getByText(/this is a preview form/i)).toBeVisible()
    expect(errorSpy).not.toHaveBeenCalled()
  })
})
