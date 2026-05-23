import { NoticeCardImageCarousel } from './image-carousel';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeCard/ImageCarousel',
  component: NoticeCardImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeCardImageCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    imageUrls: ['https://placehold.co/200x200?text=1:1'],
    title: '공지 제목',
  },
};

export const Landscape: Story = {
  args: {
    imageUrls: ['https://placehold.co/320x180?text=16:9'],
    title: '공지 제목',
  },
};

export const Portrait: Story = {
  args: {
    imageUrls: ['https://placehold.co/180x240?text=3:4'],
    title: '공지 제목',
  },
};

export const MultipleImages: Story = {
  args: {
    imageUrls: [
      'https://placehold.co/320x180?text=Image+1',
      'https://placehold.co/320x180?text=Image+2',
      'https://placehold.co/320x180?text=Image+3',
    ],
    title: '공지 제목',
  },
};
