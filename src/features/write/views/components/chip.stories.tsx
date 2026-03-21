import Chip from './chip';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Write/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['selected', 'deselected'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    variant: 'selected',
    children: '선택된 칩',
  },
};

export const Deselected: Story = {
  args: {
    variant: 'deselected',
    children: '비선택 칩',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'selected',
    disabled: true,
    children: '비활성화',
  },
};
