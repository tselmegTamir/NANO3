/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.splinecode$/,
      type: 'asset/resource',
    });
    return config;
  },
  turbopack: {},
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod.spline.design',
      },
    ],
  },
};

module.exports = nextConfig;