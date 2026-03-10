import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { AttachedPhoto } from './attached-photo';

const meta = {
  title: 'Features/Write/AttachedPhoto',
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
