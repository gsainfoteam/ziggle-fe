import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { NoticeInfo } from './notice-info';

import type { NoticeDetail } from '../models';
import type { Meta, StoryObj } from '@storybook/react-vite';

const mockNotice: NoticeDetail = {
  id: 1,
  title: '2026 봄 학기 동아리 모집',
  author: { uuid: 'author-1', name: '홍길동', picture: null },
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  tags: ['모집', '동아리'],
  views: 42,
  langs: ['ko'],
  content: '<p>저희 동아리에서 신입 부원을 모집합니다.</p>',
  reactions: [{ emoji: '🔥', count: 5, isReacted: false }],
  isReminded: false,
  category: {},
  publishedAt: new Date().toISOString(),
  imageUrls: [],
  documentUrls: [],
  additionalContents: [],
};

const queryClient = new QueryClient();

const createNoticeInfoRouter = (props: NoticeDetail) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-120 p-6">
        <NoticeInfo {...props} />
      </div>
    ),
  });
  return createRouter({ routeTree: rootRoute });
};

const NoticeInfoWithProviders = (props: NoticeDetail) => {
  const router = createNoticeInfoRouter(props);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Features/Notice/NoticeInfo',
  component: NoticeInfoWithProviders,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeInfoWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockNotice,
};

export const WithDeadline: Story = {
  args: {
    ...mockNotice,
    currentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export const WithTags: Story = {
  args: {
    ...mockNotice,
    tags: ['모집', '동아리', '중앙동아리', '스포츠', '봄학기'],
  },
};

export const LongTitle: Story = {
  args: {
    ...mockNotice,
    title: '제목이 매우 긴 경우 최대 세 줄까지만 표시되는지 확인하기 위한 아주 긴 제목의 공지사항 테스트 케이스입니다',
  },
};
