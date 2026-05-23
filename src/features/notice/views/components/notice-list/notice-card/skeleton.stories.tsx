import { NoticeCardSkeleton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeCard/Skeleton',
  component: NoticeCardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoticeCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
