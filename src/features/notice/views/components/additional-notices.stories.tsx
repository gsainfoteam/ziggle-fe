import type { Meta, StoryObj } from '@storybook/react-vite';

import type { AdditionalContent, NoticeDetail } from '../../models';

import { AdditionalNotices } from './additional-notices';

const mockNotice: NoticeDetail = {
  id: 1,
  title: '2026 봄 학기 동아리 모집',
  content: '공지 본문 내용입니다.',
  author: { uuid: 'author-1', name: '홍길동' },
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  tags: ['모집', '동아리'],
  views: 120,
  langs: ['ko'],
  reactions: [],
  isReminded: false,
  category: {},
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: [],
  documentUrls: [],
  additionalContents: [],
};

const mockAdditionalContents: AdditionalContent[] = [
  {
    id: 1,
    lang: 'ko',
    content: '장소가 변경되었습니다. 기존 학생회관 3층 → 도서관 세미나실로 변경됩니다.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    lang: 'ko',
    content: '모집 인원이 10명에서 15명으로 증가했습니다.',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const meta = {
  title: 'Features/Notice/AdditionalNotices',
  component: AdditionalNotices,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdditionalNotices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    notice: mockNotice,
    additionalContents: [mockAdditionalContents[0]],
  },
};

export const Multiple: Story = {
  args: {
    notice: mockNotice,
    additionalContents: mockAdditionalContents,
  },
};

export const WithDeadlineChange: Story = {
  args: {
    notice: mockNotice,
    additionalContents: [mockAdditionalContents[1]],
  },
};
