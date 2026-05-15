import { NoticeCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const Skeleton = NoticeCard.Skeleton;

const meta = {
  title: 'Notice/NoticeCard/Skeleton',
  component: Skeleton,
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
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
