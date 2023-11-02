// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        pathname: '/gsainfoteam-ziggle-notice-images-production/*',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        pathname: '/gsainfoteam-ziggle-notice-images-staging/*',
      },
    ],
  },
  /** @argument {import('webpack').Configuration} config */
  webpack: (config) => {
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : []),
      'jsdom',
      'debug',
      'node-fetch',
    ];
    config.module ??= {};
    config.module.rules ??= [];
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [{ name: 'removeViewBox', active: false }],
              },
            },
          },
        ],
      },
      { test: /\.graphql$/, use: [{ loader: 'graphql-tag/loader' }] },
    );
    return config;
  },
};

module.exports = nextConfig;
