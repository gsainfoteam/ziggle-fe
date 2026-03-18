import type { Meta, StoryObj } from '@storybook/react-vite';
import { type Decorator } from '@storybook/react-vite';

import { ThemeProvider } from '@/common/lib/theme';

import { ChangeDarkModeBox } from './change-dark-mode-box';

const withThemeProvider: Decorator = (Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

const meta = {
  title: 'Features/Notice/Sidebar/ChangeDarkModeBox',
  component: ChangeDarkModeBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withThemeProvider],
} satisfies Meta<typeof ChangeDarkModeBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
