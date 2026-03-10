import type { Meta, StoryObj } from '@storybook/react-vite';

import dayjs from 'dayjs';

import DDay from './d-day';

const meta = {
  title: 'Features/Notice/DDay',
  component: DDay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DDay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    deadline: dayjs().add(3, 'day'),
  },
};

export const Closed: Story = {
  args: {
    deadline: dayjs().subtract(1, 'day'),
  },
};
