import { NoticeDetailMetadata as Metadata } from './metadata';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/Metadata',
  component: Metadata,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Metadata>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: { uuid: 'author-1', name: '홍길동', picture: null },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export const WithPicture: Story = {
  args: {
    author: {
      uuid: 'author-1',
      name: '홍길동',
      picture: 'https://picsum.photos/seed/author1/36/36',
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
};
