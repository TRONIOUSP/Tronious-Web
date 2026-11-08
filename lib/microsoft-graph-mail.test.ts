import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ContactInquiry } from './contact-inquiry'
import { sendContactInquiry } from './microsoft-graph-mail'

const inquiry: ContactInquiry = {
  name: 'Alex Morgan',
  company: 'Acme Medical',
  email: 'alex@example.com',
  country: 'Australia',
  deviceType: 'Thermal therapy',
  projectStage: 'Prototype',
  targetMarkets: ['us'],
  annualVolume: 'Under 1,000',
  targetLaunch: 'Q3 2027',
  projectDescription: 'A home-use therapy device.',
  requestNda: true,
  website: '',
}

describe('sendContactInquiry', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('authenticates with Microsoft and sends from the shared mailbox', async () => {
    vi.stubEnv('MICROSOFT_TENANT_ID', 'tenant-id')
    vi.stubEnv('MICROSOFT_CLIENT_ID', 'client-id')
    vi.stubEnv('MICROSOFT_CLIENT_SECRET', 'client-secret')
    vi.stubEnv('MICROSOFT_MAILBOX_ADDRESS', 'inquiries@tronious.com')

    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: 'access-token', expires_in: 3600 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(new Response(null, { status: 202 }))
    vi.stubGlobal('fetch', fetchMock)

    await sendContactInquiry(inquiry)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[1][0]).toBe(
      'https://graph.microsoft.com/v1.0/users/inquiries%40tronious.com/sendMail',
    )

    const request = fetchMock.mock.calls[1][1]
    const body = JSON.parse(String(request?.body))
    expect(body.message.toRecipients).toEqual([
      { emailAddress: { address: 'inquiries@tronious.com' } },
    ])
    expect(body.message.replyTo).toEqual([
      { emailAddress: { address: 'alex@example.com', name: 'Alex Morgan' } },
    ])
    expect(body.message.body.contentType).toBe('HTML')
    expect(body.message.body.content).toContain('A new conversation is ready to review')
    expect(body.message.body.content).toContain('mailto:alex@example.com')
  })
})
