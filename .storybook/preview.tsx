import '../src/app/globals.css';

import type { Preview } from '@storybook/react';
import React from 'react';
import { OverlayProvider } from '@toss/use-overlay';

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
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
};

export default preview;
