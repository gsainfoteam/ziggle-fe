import type { Meta, StoryObj } from '@storybook/react-vite';

import dayjs from 'dayjs';

import EditableTimer from './editable-timer';

const meta = {
  title: 'Features/Write/EditableTimer',
  component: EditableTimer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditableTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Editable: Story = {
  args: {
    createdAt: dayjs().subtract(1, 'minute'),
  },
};

export const Expired: Story = {
  args: {
    createdAt: dayjs().subtract(20, 'minute'),
  },
};
