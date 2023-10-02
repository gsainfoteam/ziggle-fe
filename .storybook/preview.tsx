import React from 'react';

import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../src/app/globals.css';
import '@/app/initDayjs';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
