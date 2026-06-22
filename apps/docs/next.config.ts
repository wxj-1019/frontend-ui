import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frontend-ui/ui'],
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // React Compiler: 自动 memoization，替代手动 useMemo/useCallback
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
