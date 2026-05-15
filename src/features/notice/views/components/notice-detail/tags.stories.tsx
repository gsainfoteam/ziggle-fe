import { NoticeDetailTags as Tags } from './tags';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: ['모집', '동아리', '스터디'],
  },
};

export const WithCategory: Story = {
  args: {
    tags: ['event', 'recruit', '봄학기'],
  },
};

export const Many: Story = {
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

export const Empty: Story = {
  args: {
    tags: [],
  },
};
