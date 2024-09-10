const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

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

    // PDF.jsのエイリアス設定
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist'),
      'pdfjs-dist/build/pdf.worker.min.mjs': path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs'),
    };

    // PDF.jsのワーカーファイルを正しく処理するためのルール
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?mjs$/,
      type: 'asset/resource',
    });

    return config;
  },
};

module.exports = nextConfig;

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
