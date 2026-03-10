import type { Meta, StoryObj } from '@storybook/react-vite';

import { HighlightedText } from './highlighted-text';

const meta = {
  title: 'Features/Notice/HighlightedText',
  component: HighlightedText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HighlightedText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithMatch: Story = {
  args: {
    children: '검색어가 강조되는 텍스트입니다',
    query: '강조',
  },
};

export const NoMatch: Story = {
  args: {
    children: '매칭되는 검색어가 없습니다',
    query: '없음',
  },
};

export const EmptyQuery: Story = {
  args: {
    children: '검색어가 비어있으면 원본 텍스트 그대로 표시',
    query: '',
  },
};
