/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle .splinecode files
    config.module.rules.push({
      test: /\.splinecode$/,
      type: 'asset/resource',
    });
    
    return config;
  },
  // Enable static exports if needed for deployment
  // output: 'export',
  // trailingSlash: true,
  
  // Optimize for 3D content
  compress: true,
  poweredByHeader: false,
  
  // Handle external domains for Spline CDN
  images: {
    domains: ['prod.spline.design'],
  },
};

module.exports = nextConfig;