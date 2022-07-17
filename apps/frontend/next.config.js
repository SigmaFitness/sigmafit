/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${process.env.SERVER_URL}/api/:slug*` // Proxy to Backend
      }
    ]
  }
}
const withPWA = require('next-pwa')

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public'
  }
})
