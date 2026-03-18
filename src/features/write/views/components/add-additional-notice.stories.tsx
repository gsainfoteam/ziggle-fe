import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AddAdditionalNotice } from './add-additional-notice';

const meta = {
  title: 'Features/Write/AddAdditionalNotice',
  component: AddAdditionalNotice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddAdditionalNotice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KoreanOnly: Story = {
  args: {
    noticeId: 1,
    koreanContent: '',
    onKoreanContentChange: fn(),
  },
};

export const WithEnglish: Story = {
  args: {
    noticeId: 1,
    koreanContent: '',
    englishContent: '',
    onKoreanContentChange: fn(),
    onEnglishContentChange: fn(),
  },
};

export const WithContent: Story = {
  args: {
    noticeId: 1,
    koreanContent:
      '이번 주 수요일 행사 시간이 오후 3시에서 오후 4시로 변경되었습니다.',
    englishContent:
      'This Wednesday event time has been changed from 3 PM to 4 PM.',
    onKoreanContentChange: fn(),
    onEnglishContentChange: fn(),
  },
};

export const WithDeadline: Story = {
  args: {
    noticeId: 1,
    originallyHasDeadline: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    koreanContent: '',
    onKoreanContentChange: fn(),
  },
};
