import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ContactForm from './ContactForm'

function completeRequiredFields() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alex Morgan' } })
  fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Acme Medical' } })
  fireEvent.change(screen.getByLabelText('Work email'), {
    target: { value: 'alex@example.com' },
  })
}

describe('ContactForm', () => {
  afterEach(() => vi.restoreAllMocks())

  it('submits the inquiry and announces success', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Thank you. Your inquiry has been sent to our team.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    render(<ContactForm />)
    completeRequiredFields()
    fireEvent.click(screen.getByLabelText('United States'))
    fireEvent.submit(screen.getByRole('button', { name: /send inquiry/i }).closest('form')!)

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    expect(
      await screen.findByText(/thank you\. your inquiry has been sent to our team/i),
    ).toBeVisible()

    expect(fetchMock).toHaveBeenCalledOnce()
    const [, request] = fetchMock.mock.calls[0]
    const body = JSON.parse(String(request?.body))
    expect(body).toMatchObject({
      name: 'Alex Morgan',
      company: 'Acme Medical',
      email: 'alex@example.com',
      targetMarkets: ['us'],
    })
  })

  it('announces a delivery error and keeps the entered values', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'We could not send your inquiry right now.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    render(<ContactForm />)
    completeRequiredFields()
    fireEvent.submit(screen.getByRole('button', { name: /send inquiry/i }).closest('form')!)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'We could not send your inquiry right now.',
    )
    await waitFor(() => expect(screen.getByRole('button', { name: /send inquiry/i })).toBeEnabled())
    expect(screen.getByLabelText('Name')).toHaveValue('Alex Morgan')
  })
})
