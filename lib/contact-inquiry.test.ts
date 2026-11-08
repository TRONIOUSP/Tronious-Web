import { describe, expect, it } from 'vitest'
import { formatInquiryHtml, formatInquiryMessage, parseContactInquiry } from './contact-inquiry'

const validInquiry = {
  name: '  Alex Morgan  ',
  company: 'Acme Medical',
  email: 'ALEX@EXAMPLE.COM',
  country: 'Australia',
  deviceType: 'Thermal therapy',
  projectStage: 'Prototype',
  targetMarkets: ['us', 'eu', 'unknown', 'us'],
  annualVolume: '1,000–10,000',
  targetLaunch: 'Q3 2027',
  projectDescription: 'A home-use therapy device.',
  requestNda: true,
  website: '',
}

describe('parseContactInquiry', () => {
  it('normalizes and validates a complete inquiry', () => {
    const result = parseContactInquiry(validInquiry)

    expect(result).toEqual({
      ok: true,
      data: {
        ...validInquiry,
        name: 'Alex Morgan',
        email: 'alex@example.com',
        targetMarkets: ['us', 'eu'],
      },
    })
  })

  it('rejects missing required identity fields', () => {
    expect(parseContactInquiry({ ...validInquiry, email: 'not-an-email' })).toEqual({
      ok: false,
      message: 'Enter your name, company and a valid work email.',
    })
  })

  it('rejects values outside the controlled options', () => {
    expect(parseContactInquiry({ ...validInquiry, projectStage: 'Invalid stage' }).ok).toBe(false)
  })
})

describe('formatInquiryMessage', () => {
  it('creates a plain-text message containing the form details', () => {
    const result = parseContactInquiry(validInquiry)
    if (!result.ok) throw new Error('Test fixture should be valid')

    expect(formatInquiryMessage(result.data)).toContain('Company: Acme Medical')
    expect(formatInquiryMessage(result.data)).toContain(
      'Target markets: United States, European Union',
    )
    expect(formatInquiryMessage(result.data)).toContain('Mutual NDA requested: Yes')
  })
})

describe('formatInquiryHtml', () => {
  it('creates a branded HTML summary and escapes submitted markup', () => {
    const result = parseContactInquiry({
      ...validInquiry,
      projectDescription: '<script>alert("unsafe")</script>\nSecond line',
    })
    if (!result.ok) throw new Error('Test fixture should be valid')

    const html = formatInquiryHtml(result.data)
    expect(html).toContain('TRONIOUS')
    expect(html).toContain('Project snapshot')
    expect(html).toContain('&lt;script&gt;alert(&quot;unsafe&quot;)&lt;/script&gt;<br>Second line')
    expect(html).not.toContain('<script>')
  })
})
