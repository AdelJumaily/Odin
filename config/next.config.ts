import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
  },
  // Handle static assets from the new structure
  assetPrefix: process.env.NODE_ENV === 'production' ? '/company' : '',
  // Configure paths for the new structure
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@company': require('path').resolve(__dirname, 'company'),
      '@products': require('path').resolve(__dirname, 'products'),
      '@shared': require('path').resolve(__dirname, 'shared'),
    };
    return config;
  },
};

export default nextConfig;