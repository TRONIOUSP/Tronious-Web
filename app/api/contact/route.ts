import { parseContactInquiry } from '@/lib/contact-inquiry'
import { sendContactInquiry } from '@/lib/microsoft-graph-mail'

const MAX_REQUEST_BYTES = 32_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

type RateLimitEntry = {
  count: number
  resetsAt: number
}

const rateLimits = new Map<string, RateLimitEntry>()

function clientAddress(request: Request) {
  const realIp = request.headers.get('x-real-ip')?.trim()
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim()
  return realIp || forwardedFor || 'unknown'
}

function isRateLimited(key: string) {
  const now = Date.now()

  if (rateLimits.size > 1000) {
    for (const [address, entry] of rateLimits) {
      if (entry.resetsAt <= now) rateLimits.delete(address)
    }
  }

  const existing = rateLimits.get(key)
  if (!existing || existing.resetsAt <= now) {
    rateLimits.set(key, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  existing.count += 1
  return existing.count > RATE_LIMIT_MAX_REQUESTS
}

function json(body: object, status: number, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

export async function POST(request: Request) {
  if (isRateLimited(clientAddress(request))) {
    return json(
      { message: 'Too many inquiries were submitted. Please wait a few minutes and try again.' },
      429,
      { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) },
    )
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ message: 'This request format is not supported.' }, 415)
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return json({ message: 'The inquiry is too large to submit.' }, 413)
  }

  let input: unknown
  try {
    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return json({ message: 'The inquiry is too large to submit.' }, 413)
    }
    input = JSON.parse(rawBody)
  } catch {
    return json({ message: 'The inquiry could not be read.' }, 400)
  }

  const parsed = parseContactInquiry(input)
  if (!parsed.ok) {
    return json({ message: parsed.message }, 400)
  }

  // Bots commonly fill every input. Return a neutral success response without
  // sending mail so the field does not teach automated clients how it works.
  if (parsed.data.website) {
    return json({ message: 'Your inquiry has been sent.' }, 200)
  }

  try {
    await sendContactInquiry(parsed.data)
    return json({ message: 'Thank you. Your inquiry has been sent to our team.' }, 200)
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown contact delivery error'
    console.error('[contact-form]', reason)
    return json(
      { message: 'We could not send your inquiry right now. Please try again shortly.' },
      502,
    )
  }
}
