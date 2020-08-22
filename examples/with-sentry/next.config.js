// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require('@zeit/next-source-maps')()

module.exports = withSourceMaps({
  experimental: {
    plugins: true,
  },
  env: {
    // Required for now because the experimental plugins API is not checking
    // for variables with the NEXT_PUBLIC prefix that are automatically pulled
    // in
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
})
