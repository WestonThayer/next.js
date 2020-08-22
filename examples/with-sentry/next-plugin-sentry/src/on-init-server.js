import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'

export default async function initServer() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: !!process.env.VERCEL_URL,
    release: !!process.env.VERCEL_URL
      ? process.env.VERCEL_URL.replace(/\./g, '_')
      : '',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(
            /\S+\/\.next\//,
            'app:///_next/'
          )
          frame.filename = frame.filename.replace(
            /\S+\/node_modules\//,
            'app:///node_modules/'
          )
          return frame
        },
      }),
    ],
  })
}
