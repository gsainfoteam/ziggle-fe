import '../src/app/globals.css';

import { ApolloProvider } from '@apollo/client';
import type { Preview } from '@storybook/react';
import React from 'react';

import { apolloClient } from '../src/app/[lng]/InitClient';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ApolloProvider client={apolloClient}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export default preview;
