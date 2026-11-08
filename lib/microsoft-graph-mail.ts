import type { ContactInquiry } from '@/lib/contact-inquiry'
import { formatInquiryHtml } from '@/lib/contact-inquiry'

type AccessToken = {
  value: string
  expiresAt: number
}

let cachedToken: AccessToken | null = null

function requiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value
  }

  const tenantId = requiredEnvironmentVariable('MICROSOFT_TENANT_ID')
  const clientId = requiredEnvironmentVariable('MICROSOFT_CLIENT_ID')
  const clientSecret = requiredEnvironmentVariable('MICROSOFT_CLIENT_SECRET')

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`Microsoft authentication failed with status ${response.status}`)
  }

  const token = (await response.json()) as { access_token?: unknown; expires_in?: unknown }
  if (typeof token.access_token !== 'string') {
    throw new Error('Microsoft authentication response did not include an access token')
  }

  const expiresIn = typeof token.expires_in === 'number' ? token.expires_in : 3600
  cachedToken = {
    value: token.access_token,
    expiresAt: Date.now() + expiresIn * 1000,
  }

  return cachedToken.value
}

function safeSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120)
}

export async function sendContactInquiry(inquiry: ContactInquiry) {
  const mailbox = requiredEnvironmentVariable('MICROSOFT_MAILBOX_ADDRESS')
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || mailbox
  const accessToken = await getAccessToken()

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          subject: `[Website inquiry] ${safeSubjectPart(inquiry.company)} — ${safeSubjectPart(inquiry.name)}`,
          body: {
            contentType: 'HTML',
            content: formatInquiryHtml(inquiry),
          },
          toRecipients: [{ emailAddress: { address: recipient } }],
          replyTo: [
            {
              emailAddress: {
                address: inquiry.email,
                name: inquiry.name,
              },
            },
          ],
        },
        saveToSentItems: true,
      }),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`Microsoft Graph sendMail failed with status ${response.status}`)
  }
}
