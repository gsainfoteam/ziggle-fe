import { ZaboImageCarousel } from './zabo-image-carousel';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Notice/Zabo/ZaboImageCarousel',
  component: ZaboImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageSize: { control: 'number' },
    gap: { control: 'number' },
    maxControls: { control: 'number' },
  },
} satisfies Meta<typeof ZaboImageCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleImage: Story = {
  args: {
    imageUrls: ['https://placehold.co/200x200?text=Image+1'],
    title: '공지 제목',
  },
};

export const MultipleImages: Story = {
  args: {
    imageUrls: [
      'https://placehold.co/200x200?text=Image+1',
      'https://placehold.co/200x200?text=Image+2',
      'https://placehold.co/200x200?text=Image+3',
      'https://placehold.co/200x200?text=Image+4',
    ],
    title: '공지 제목',
  },
};

export const ManyImages: Story = {
  args: {
    imageUrls: Array.from(
      { length: 8 },
      (_, i) => `https://placehold.co/200x200?text=Image+${i + 1}`,
    ),
    title: '공지 제목',
    maxControls: 6,
  },
};

export const LargeSize: Story = {
  args: {
    imageUrls: [
      'https://placehold.co/300x300?text=Image+1',
      'https://placehold.co/300x300?text=Image+2',
      'https://placehold.co/300x300?text=Image+3',
    ],
    title: '큰 이미지 공지',
    imageSize: 300,
  },
};
