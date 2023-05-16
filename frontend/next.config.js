/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   apiBaseUrl:
  //     process.env.NODE_ENV === 'production'
  //       ? 'https://your-production-domain.com'
  //       : 'http://localhost:3000',
  // },
};

module.exports = nextConfig;
