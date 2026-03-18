import type { Meta, StoryObj } from '@storybook/react-vite';

import type { Notice } from '@/features/notice/models';

import ZaboTags from './zabo-tags';

const mockNotice: Notice = {
  id: 1,
  title: '2026 봄 학기 동아리 모집',
  content: '공지 본문입니다.',
  author: { uuid: 'author-1', name: '홍길동' },
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: [],
  tags: ['모집', '동아리', '스터디'],
  views: 42,
  langs: ['ko'],
  reactions: [{ emoji: '🔥', count: 5, isReacted: false }],
  isReminded: false,
  category: {},
  publishedAt: new Date().toISOString(),
  documentUrls: [],
};

const meta = {
  title: 'Features/Notice/Zabo/ZaboTags',
  component: ZaboTags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ZaboTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTags: Story = {
  args: {
    notice: mockNotice,
  },
};

export const ManyTags: Story = {
  args: {
    notice: {
      ...mockNotice,
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
  },
};

export const NoTags: Story = {
  args: {
    notice: {
      ...mockNotice,
      tags: [],
    },
  },
};
