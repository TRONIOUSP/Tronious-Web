import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sendContactInquiry } from '@/lib/microsoft-graph-mail'
import { POST } from './route'

vi.mock('@/lib/microsoft-graph-mail', () => ({
  sendContactInquiry: vi.fn(),
}))

const validInquiry = {
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
  requestNda: false,
  website: '',
}

function contactRequest(body: object, address: string) {
  return new Request('https://tronious.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-For': address,
    },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.mocked(sendContactInquiry).mockReset().mockResolvedValue(undefined)
  })

  it('validates and delivers a legitimate inquiry', async () => {
    const response = await POST(contactRequest(validInquiry, '192.0.2.10'))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      message: 'Thank you. Your inquiry has been sent to our team.',
    })
    expect(sendContactInquiry).toHaveBeenCalledOnce()
  })

  it('rejects an invalid email address', async () => {
    const response = await POST(
      contactRequest({ ...validInquiry, email: 'not-an-email' }, '192.0.2.11'),
    )

    expect(response.status).toBe(400)
    expect(sendContactInquiry).not.toHaveBeenCalled()
  })

  it('silently accepts honeypot submissions without sending mail', async () => {
    const response = await POST(
      contactRequest({ ...validInquiry, website: 'https://spam.example' }, '192.0.2.12'),
    )

    expect(response.status).toBe(200)
    expect(sendContactInquiry).not.toHaveBeenCalled()
  })
})
