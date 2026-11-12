import test from 'node:test'
import assert from 'node:assert/strict'
import { generateKeyPairSync } from 'node:crypto'
import {
  normalizeRef,
  createVisit,
  shouldTrack,
  recordVisit,
} from '../src/lib/qr-tracking.mjs'

const enabled = { QR_TRACKING_ENABLED: 'true', VERCEL_ENV: 'production' }
test('production tracking excludes previews, prefetches and known bots', () => {
  assert.equal(shouldTrack(new Headers(), enabled), true)
  assert.equal(
    shouldTrack(new Headers(), { ...enabled, VERCEL_ENV: 'preview' }),
    false,
  )
  assert.equal(
    shouldTrack(new Headers({ 'next-router-prefetch': '1' }), enabled),
    false,
  )
  assert.equal(
    shouldTrack(new Headers({ 'user-agent': 'Googlebot' }), enabled),
    false,
  )
  assert.equal(shouldTrack(new Headers(), {}), false)
})
test('reference and geo survive capture; missing or malformed data is safe', () => {
  assert.equal(normalizeRef(['winton']), 'direct')
  const visit = createVisit(
    'winton!?',
    new Headers({ 'x-vercel-ip-city': 'New%20York' }),
  )
  assert.equal(visit.ref, 'winton')
  assert.equal(visit.city, 'New York')
  assert.equal(createVisit(null, new Headers()).ref, 'direct')
})
test('stores RAW rows and sends alert with shared visit ID; failures are isolated', async () => {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
  const env = {
    GOOGLE_SERVICE_ACCOUNT_JSON: JSON.stringify({
      client_email: 'test@example.com',
      private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }),
    }),
    GOOGLE_SHEET_ID: 'test-sheet',
    RESEND_API_KEY: 'fake',
    QR_ALERT_FROM: 'test@example.com',
    QR_ALERT_TO: 'recipient@example.com',
  }
  const visit = createVisit('winton', new Headers())
  const calls = []
  const fetcher = async (url, options) => {
    calls.push({ url, options })
    return new Response(
      JSON.stringify(
        url.includes('oauth2') ? { access_token: 'fake-token' } : {},
      ),
    )
  }
  assert.deepEqual(await recordVisit(visit, env, fetcher), {
    sheet: true,
    email: true,
  })
  const sheet = calls.find(({ url }) => url.includes(':append'))
  assert.ok(sheet.url.includes('valueInputOption=RAW'))
  assert.equal(JSON.parse(sheet.options.body).values[0][5], visit.id)
  const email = calls.find(({ url }) => url.includes('resend'))
  assert.ok(JSON.parse(email.options.body).text.includes(visit.id))
  const originalError = console.error
  console.error = () => {}
  try {
    assert.deepEqual(
      await recordVisit(visit, env, async (url, options) => {
        if (url.includes('sheets.googleapis'))
          return new Response('', { status: 503 })
        return fetcher(url, options)
      }),
      { sheet: false, email: true },
    )
    assert.deepEqual(await recordVisit(visit, {}, fetcher), {
      sheet: false,
      email: false,
    })
  } finally {
    console.error = originalError
  }
})
