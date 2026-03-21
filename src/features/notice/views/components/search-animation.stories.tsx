import { SearchAnimation } from './search-animation';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Notice/SearchAnimation',
  component: SearchAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
