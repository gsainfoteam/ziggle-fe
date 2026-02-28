import { defineConfig } from 'i18next-cli';

import { SUPPORTED_LANGUAGES } from './src/common/lib/i18n';

export default defineConfig({
  locales: [...SUPPORTED_LANGUAGES],

  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',

    defaultNS: '_',
    nsSeparator: ':',
    keySeparator: '.',

    removeUnusedKeys: true,
    sort: true,
    indentation: 2,

    functions: ['t', '*.t'],
    transComponents: ['Trans'],
    useTranslationNames: ['useTranslation'],

    primaryLanguage: 'ko',
    secondaryLanguages: ['en'],

    defaultValue: '',

    extractFromComments: true,
  },

  lint: {
    ignoredAttributes: ['data-testid', 'aria-label'],
    ignoredTags: ['pre', 'code'],
    ignore: ['**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  },

  types: {
    input: ['public/locales/ko/*.json'],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: false,
  },
});
