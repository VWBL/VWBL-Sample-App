/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // output: 'export',
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //     config.resolve.fallback.child_process = false;
  //     config.resolve.fallback.net = false;
  //     config.resolve.fallback.dns = false;
  //     config.resolve.fallback.tls = false;
  //   }
  //   return config;
  // },
  // compiler: {
  //   styledComponents: true,
  // },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
