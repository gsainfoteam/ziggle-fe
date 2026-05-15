import { NoticeDetailDeadline as Deadline } from './deadline';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/Deadline',
  component: Deadline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Deadline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export const Past: Story = {
  args: {
    deadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
};

export const None: Story = {
  args: {
    deadline: undefined,
  },
};
