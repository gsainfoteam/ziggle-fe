import { fn } from 'storybook/test';

import { NoticeCardActionsDisplay } from './actions';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockFire = { emoji: '🔥', count: 5, isReacted: false };
const mockFireReacted = { emoji: '🔥', count: 6, isReacted: true };

const meta = {
  title: 'Notice/NoticeCard/Actions',
  component: NoticeCardActionsDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isBookmarked: { control: 'boolean' },
  },
  args: {
    id: 1,
    fire: mockFire,
    isBookmarked: false,
    onFireToggle: fn().mockResolvedValue([mockFireReacted]),
    onBookmarkToggle: fn().mockResolvedValue(undefined),
    onShare: fn(),
  },
} satisfies Meta<typeof NoticeCardActionsDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllActive: Story = {
  args: {
    fire: mockFireReacted,
    isBookmarked: true,
  },
};
