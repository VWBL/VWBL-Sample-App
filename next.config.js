/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
  webpack: (config, {  isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.resolve.alias.canvas = false;
    // クライアント側でファイルシステム関連のモジュールを無効化
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        net: false,
        dns: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;