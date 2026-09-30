import { NoticeDetailSummary as Summary } from './summary';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/Summary',
  component: Summary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    summary:
      '2026 봄 학기 동아리 신입 부원을 모집합니다. 개발·디자인·기획 분야로 재학생 누구나 지원할 수 있으며, 자기소개서를 제출하면 됩니다.',
  },
} satisfies Meta<typeof Summary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { summary: undefined },
};

export const Blank: Story = {
  args: { summary: '   ' },
};
