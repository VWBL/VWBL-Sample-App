/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  return {
    reactStrictMode: true,
    swcMinify: false,
    experimental: {
      serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },
    webpack: (config, { isServer }) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      config.resolve.alias.canvas = false;
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
    output: phase === 'phase-production-build' ? 'export' : 'standalone',
  };
};

module.exports = nextConfig;
