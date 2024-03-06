import '../src/app/globals.css';

import type { Preview } from '@storybook/react';
import React from 'react';


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
      <Story />
    ),
  ],
};

export default preview;
