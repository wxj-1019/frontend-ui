import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Monorepo: 使 @frontend-ui/ui 的源码被正确转译
  transpilePackages: ['@frontend-ui/ui'],

  // Docker standalone 输出模式
  output: 'standalone',

  // 禁用不必要的压缩（Docker 层自带压缩）
  compress: true,

  // 生产环境优化
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@frontend-ui/ui'],
};

export default nextConfig;
