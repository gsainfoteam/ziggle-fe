import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tags } from './tags';

const meta = {
  title: 'Features/Notice/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTags: Story = {
  args: {
    tags: ['event', 'general', 'recruit'],
  },
};

export const WithCustom: Story = {
  args: {
    tags: ['event', '커스텀태그', 'academic'],
  },
};
