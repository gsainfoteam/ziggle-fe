import { fn } from 'storybook/test';

import { AttachPhotoArea } from './attach-photo-area';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Write/AttachPhotoArea',
  component: AttachPhotoArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AttachPhotoArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    photos: [],
    setPhotos: fn(),
  },
};
