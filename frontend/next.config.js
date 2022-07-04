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

module.exports = nextConfig
