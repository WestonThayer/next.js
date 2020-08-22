const SentryWebpackPlugin = require('@sentry/webpack-plugin')

module.exports = function babelPreset({ plugins }) {
  // When all the Sentry configuration env variables are available/configured
  // The Sentry webpack plugin gets pushed to the webpack plugins to build
  // and upload the source maps to sentry.
  // This is an alternative to manually uploading the source maps
  // Note: This is disabled unless the VERCEL_URL environment variable is
  // present, which is usually only during a Vercel build
  if (
    process.env.NEXT_PUBLIC_SENTRY_DSN &&
    process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_AUTH_TOKEN &&
    process.env.VERCEL_URL
  ) {
    console.log('IN')
    // Set the SENTRY_DSN environment variable so that SentryWebpackPlugin can
    // use it
    process.env.SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

    // Use the VERCEL_URL for the release, but conform to their naming
    // restrictions: https://docs.sentry.io/product/releases/
    console.log(`VERCEL_URL: ${process.env.VERCEL_URL}`)
    const release = process.env.VERCEL_URL.replace(/\./g, '_')

    plugins.push(
      new SentryWebpackPlugin({
        include: '.next',
        stripPrefix: ['webpack://_N_E/'],
        urlPrefix: '~/_next',
        release,
      })
    )
  }
}
