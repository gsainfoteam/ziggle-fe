import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ChangeDarkModeBox } from './change-dark-mode-box';

const meta = {
  title: 'Notice/Sidebar/ChangeDarkModeBox',
  component: ChangeDarkModeBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChangeDarkModeBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
