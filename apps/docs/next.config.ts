import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT_STANDALONE === '1' ? 'standalone' : undefined,
  transpilePackages: ['@frontend-ui/ui'],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
