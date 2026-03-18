import type { Meta, StoryObj } from '@storybook/react-vite';

import { Loading } from './index';

const meta = {
  title: 'Common/UI/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullScreen: { control: 'boolean' },
  },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
};

export const Inline: Story = {
  args: {
    fullScreen: false,
  },
};
