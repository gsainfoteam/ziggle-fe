import { NoticeCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const Tags = NoticeCard.Tags;

const meta = {
  title: 'Notice/NoticeCard/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTags: Story = {
  args: {
    tags: ['모집', '동아리', '스터디'],
  },
};

export const ManyTags: Story = {
  args: {
    tags: [
      '모집',
      '동아리',
      '스터디',
      '개발',
      '디자인',
      '기획',
      '봄학기',
      '2026',
    ],
  },
};

export const NoTags: Story = {
  args: {
    tags: [],
  },
};
