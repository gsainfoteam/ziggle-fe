import { fn } from 'storybook/test';

import { AttachedPhoto } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Write/AttachedPhoto',
  component: AttachedPhoto,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AttachedPhoto>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/200',
    onDeleteClick: fn(),
  },
};
