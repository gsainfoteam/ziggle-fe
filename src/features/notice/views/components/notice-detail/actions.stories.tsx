import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { EmojiString, type Reaction } from '@/features/notice/models';

import {
  NoticeDetailActions as Actions,
  NoticeDetailActionsProvider,
} from './actions';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient();

type StoryArgs = {
  id: number;
  title: string;
  reactions: Reaction[];
  isBookmarked: boolean;
  variant?: 'inline' | 'rail';
};

const QueryDecorator: Decorator = (Story) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const ActionsDecorator: Decorator<StoryArgs> = (Story, { args }) => (
  <NoticeDetailActionsProvider
    id={args.id}
    title={args.title}
    reactions={args.reactions}
    isBookmarked={args.isBookmarked}
  >
    <Story />
  </NoticeDetailActionsProvider>
);

const meta = {
  title: 'Notice/NoticeDetail/Actions',
  component: Actions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [QueryDecorator, ActionsDecorator],
  render: ({ variant }) => <Actions variant={variant} />,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoReactions: Story = {
  args: {
    id: 1,
    title: '2026 봄 학기 동아리 모집',
    reactions: [],
    isBookmarked: false,
  },
};

export const WithReactions: Story = {
  args: {
    id: 1,
    title: '2026 봄 학기 동아리 모집',
    reactions: [
      { emoji: EmojiString.FIRE, count: 12, isReacted: false },
      { emoji: EmojiString.THINKING, count: 3, isReacted: true },
    ],
    isBookmarked: false,
  },
};

export const FireActive: Story = {
  args: {
    id: 1,
    title: '2026 봄 학기 동아리 모집',
    reactions: [{ emoji: EmojiString.FIRE, count: 15, isReacted: true }],
    isBookmarked: true,
  },
};

export const Rail: Story = {
  args: {
    id: 1,
    title: '2026 봄 학기 동아리 모집',
    reactions: [
      { emoji: EmojiString.FIRE, count: 12, isReacted: false },
      { emoji: EmojiString.THINKING, count: 3, isReacted: true },
    ],
    isBookmarked: false,
    variant: 'rail',
  },
};
