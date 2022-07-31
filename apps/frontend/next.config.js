/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ['unsplash.com', 'images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `${process.env.SERVER_URL}/api/:slug*`, // Proxy to Backend
      },
    ];
  },
};
const withPWA = require("next-pwa");

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
  },
});
