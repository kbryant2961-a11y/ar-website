import { createSign, randomUUID } from 'node:crypto'

export function normalizeRef(ref) {
  if (!ref || typeof ref !== 'string') return 'direct'
  return ref.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'direct'
}

function decodeLocation(value) {
  try {
    return decodeURIComponent(value || '')
  } catch {
    return value || ''
  }
}

export function createVisit(ref, headers) {
  return {
    id: randomUUID(),
    ref: normalizeRef(ref),
    timestamp: new Date().toISOString(),
    city: decodeLocation(headers.get('x-vercel-ip-city')),
    region: headers.get('x-vercel-ip-country-region') || '',
    country: headers.get('x-vercel-ip-country') || '',
  }
}

export function shouldTrack(headers, env = process.env) {
  return (
    env.QR_TRACKING_ENABLED === 'true' &&
    env.VERCEL_ENV === 'production' &&
    !headers.get('next-router-prefetch') &&
    !/prefetch/i.test(
      headers.get('purpose') || headers.get('sec-purpose') || '',
    ) &&
    !/bot|crawler|spider|preview|slurp/i.test(headers.get('user-agent') || '')
  )
}

async function request(url, options, fetcher) {
  const response = await fetcher(url, {
    ...options,
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error(`Provider returned HTTP ${response.status}`)
  return response
}

async function appendVisit(visit, env, fetcher) {
  const credentials = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON)
  const now = Math.floor(Date.now() / 1000)
  const encode = (value) =>
    Buffer.from(JSON.stringify(value)).toString('base64url')
  const payload = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`
  const signature = createSign('RSA-SHA256')
    .update(payload)
    .sign(credentials.private_key, 'base64url')
  const tokenResponse = await request(
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: `${payload}.${signature}`,
      }),
    },
    fetcher,
  )
  const { access_token: token } = await tokenResponse.json()
  if (!token) throw new Error('Google access token missing')
  const range = encodeURIComponent(env.QR_SHEET_RANGE || "'QR Visits'!A:F")
  await request(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEET_ID)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            visit.timestamp,
            visit.ref,
            visit.city,
            visit.region,
            visit.country,
            visit.id,
          ],
        ],
      }),
    },
    fetcher,
  )
}

async function sendAlert(visit, env, fetcher) {
  const location =
    [visit.city, visit.region, visit.country].filter(Boolean).join(', ') ||
    'Location unavailable'
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(visit.timestamp))
  await request(
    'https://api.resend.com/emails',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `qr-visit/${visit.id}`,
      },
      body: JSON.stringify({
        from: env.QR_ALERT_FROM,
        to: env.QR_ALERT_TO.split(',')
          .map((email) => email.trim())
          .filter(Boolean),
        subject: `QR letter opened — Ref ${visit.ref}`,
        text: `ref=${visit.ref} opened ${time} (America/New_York).\nApproximate location: ${location}\n\nVisit ID: ${visit.id}\nThis records a page visit, not a verified person's identity. Repeat visits may generate additional alerts.`,
      }),
    },
    fetcher,
  )
}

export async function recordVisit(visit, env = process.env, fetcher = fetch) {
  const required = [
    'GOOGLE_SERVICE_ACCOUNT_JSON',
    'GOOGLE_SHEET_ID',
    'RESEND_API_KEY',
    'QR_ALERT_FROM',
    'QR_ALERT_TO',
  ]
  if (required.some((name) => !env[name])) {
    console.error(
      '[qr-tracking] Missing required configuration; visit not recorded',
    )
    return { sheet: false, email: false }
  }
  // Independent delivery: a Sheets failure must not prevent the email alert.
  const results = await Promise.allSettled([
    appendVisit(visit, env, fetcher),
    sendAlert(visit, env, fetcher),
  ])
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      // Do not print credentials, provider response bodies, or visitor location.
      console.error(
        `[qr-tracking] ${index === 0 ? 'sheet' : 'email'} delivery failed for visit ${visit.id}`,
      )
    }
  })
  return {
    sheet: results[0].status === 'fulfilled',
    email: results[1].status === 'fulfilled',
  }
}
