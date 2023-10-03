/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com'],
  },
  /** @argument {import('webpack').Configuration} config */
  webpack: (config) => {
    config.externals = [...config.externals, 'jsdom'];
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
