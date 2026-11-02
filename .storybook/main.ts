import type { StorybookConfig } from '@storybook/react-vite';

// stories import src/common/lib, which throws at import time without these
process.env.VITE_IDP_ISSUER ??= 'staging';
process.env.VITE_IDP_CLIENT_ID ??= 'storybook';
process.env.VITE_API_BASE_URL ??= '/api';

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
};
export default config;
