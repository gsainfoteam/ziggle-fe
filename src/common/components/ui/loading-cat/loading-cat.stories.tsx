import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoadingCatAnimation } from './index';

const meta = {
  title: 'Common/UI/LoadingCat',
  component: LoadingCatAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingCatAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
