import { Content } from './content';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Notice/Content',
  component: Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Content>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    content: '<p>간단한 HTML 콘텐츠입니다.</p>',
  },
};

export const WithHeading: Story = {
  args: {
    content: `
      <h1>제목</h1>
      <p>본문 텍스트입니다. 여러 줄의 내용을 포함할 수 있습니다.</p>
      <h2>부제목</h2>
      <p>추가 내용...</p>
    `,
  },
};
