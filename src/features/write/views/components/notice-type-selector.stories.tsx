import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { NoticeTypeSelector } from './notice-type-selector';

const meta = {
  title: 'Features/Write/NoticeTypeSelector',
  component: NoticeTypeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedNoticeType: {
      control: 'radio',
      options: ['recruit', 'event', 'general'],
    },
  },
} satisfies Meta<typeof NoticeTypeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Recruit: Story = {
  args: {
    selectedNoticeType: 'recruit',
    setNoticeType: fn(),
  },
};

export const Event: Story = {
  args: {
    selectedNoticeType: 'event',
    setNoticeType: fn(),
  },
};

export const General: Story = {
  args: {
    selectedNoticeType: 'general',
    setNoticeType: fn(),
  },
};

export const Disabled: Story = {
  args: {
    selectedNoticeType: 'recruit',
    setNoticeType: fn(),
    disabled: true,
  },
};
