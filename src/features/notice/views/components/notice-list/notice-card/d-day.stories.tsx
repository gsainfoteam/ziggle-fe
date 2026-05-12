import dayjs from 'dayjs';

import { NoticeCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const DDay = NoticeCard.DDay;

const meta = {
  title: 'Notice/NoticeCard/DDay',
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
