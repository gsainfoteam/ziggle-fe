import type { Meta, StoryObj } from '@storybook/react-vite';

import { MypageBox } from './mypage-box';

const meta = {
  title: 'Features/Auth/MypageBox',
  component: MypageBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MypageBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p className="text-text">마이페이지 박스 콘텐츠</p>,
  },
};
