import { LoadingCatAnimation } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

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
