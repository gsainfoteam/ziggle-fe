import ImageStack from './image-stack';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Notice/ImageStack',
  component: ImageStack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    sources: ['https://picsum.photos/400/300'],
    alt: '이미지 설명',
  },
};

export const Multiple: Story = {
  args: {
    sources: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],
    alt: '갤러리 이미지',
  },
};
