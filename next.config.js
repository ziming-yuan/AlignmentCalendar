/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['uploadthing.com'],
    },
    experimental: {
      serverActions: true,
    },
    webpack: (config, { isServer, dev }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  };