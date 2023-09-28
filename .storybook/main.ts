import type { StorybookConfig } from '@storybook/nextjs';

import { join, dirname, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-postcss'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      nextConfigPath: join(__dirname, '../next.config.js'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.module ??= {};
    config.module.rules ??= [];
    config.resolve ??= {};
    config.resolve.alias ??= {};

    config.resolve.alias['@'] = resolve(__dirname, '../src');

    const imageRule = config.module.rules.find((rule) =>
      rule?.['test']?.test('.svg'),
    );
    if (imageRule) imageRule['exclude'] = /\.svg$/;
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
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    return config;
  },
};
export default config;
