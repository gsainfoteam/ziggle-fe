/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
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
    });
    return config;
  },
};

module.exports = nextConfig;
