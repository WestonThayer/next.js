import * as Sentry from '@sentry/browser'

export default async function initClient() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: !!process.env.VERCEL_URL,
    release: !!process.env.VERCEL_URL
      ? process.env.VERCEL_URL.replace(/\./g, '_')
      : '',
  })
}
