import dayjs from 'dayjs';

import { DateTimePicker } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Write/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateTime: dayjs(),
    onChange: () => {},
  },
};
