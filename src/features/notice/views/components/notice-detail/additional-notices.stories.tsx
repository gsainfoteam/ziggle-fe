import type { AdditionalContent } from '@/features/notice/models';

import { NoticeDetailAdditionalNotices as AdditionalNotices } from './additional-notices';

import type { Meta, StoryObj } from '@storybook/react-vite';

const originalDeadline = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000,
).toISOString();

const mockAdditionalContents: AdditionalContent[] = [
  {
    id: 1,
    lang: 'ko',
    content:
      '장소가 변경되었습니다. 기존 학생회관 3층 → 도서관 세미나실로 변경됩니다.',
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
  title: 'Notice/NoticeDetail/AdditionalNotices',
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
    originalDeadline,
    additionalContents: [mockAdditionalContents[0]],
  },
};

export const Multiple: Story = {
  args: {
    originalDeadline,
    additionalContents: mockAdditionalContents,
  },
};

export const WithDeadlineChange: Story = {
  args: {
    originalDeadline,
    additionalContents: [mockAdditionalContents[1]],
  },
};
