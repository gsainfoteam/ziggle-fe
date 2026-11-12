import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  env: (config) => ({
    ...config,
    VITE_IDP_ISSUER: 'staging',
    VITE_IDP_CLIENT_ID: 'storybook',
  }),
};
export default config;
