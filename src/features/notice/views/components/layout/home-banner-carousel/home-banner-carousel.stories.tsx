import { HomeBannerCarousel } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/HomeBannerCarousel',
  component: HomeBannerCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeBannerCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
