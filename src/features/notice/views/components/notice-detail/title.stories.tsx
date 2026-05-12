import { NoticeDetailTitle as Title } from './title';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    children: '2026 봄 학기 동아리 모집',
  },
};

export const Long: Story = {
  args: {
    children:
      '2026학년도 봄 학기 신입생 환영회 및 동아리 박람회 일정 안내 — 학생회관 1층 로비에서 개최됩니다',
  },
};
