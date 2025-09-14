import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Keep unoptimized for static export, but we'll optimize manually
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dgwebsite' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/dgwebsite' : '',
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

export default nextConfig;
