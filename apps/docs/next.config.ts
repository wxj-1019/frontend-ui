import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frontend-ui/ui'],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
