import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frontend-ui/ui'],
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
