import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { ResultTextZabo } from './result-text-zabo';

import type { ResultZaboProps } from './type';
import type { Meta, StoryObj } from '@storybook/react-vite';

const mockNotice: ResultZaboProps = {
  id: 1,
  title: '2026 봄 학기 장학금 공고',
  content:
    '2026학년도 봄 학기 성적우수장학금 신청을 받습니다. 대상은 직전 학기 성적 3.5 이상인 재학생이며, 학생처 홈페이지를 통해 신청하시기 바랍니다.',
  author: { uuid: 'author-1', name: '학생처', picture: null },
  createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: [],
  tags: ['장학금', '공지'],
  views: 256,
  langs: ['ko'],
  reactions: [{ emoji: '🔥', count: 12, isReacted: false }],
  isReminded: false,
  category: {},
  publishedAt: new Date().toISOString(),
  documentUrls: [],
};

const queryClient = new QueryClient();

const createResultTextZaboRouter = (props: ResultZaboProps) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-150">
        <ResultTextZabo {...props} />
      </div>
    ),
  });
  return createRouter({ routeTree: rootRoute });
};

const ResultTextZaboWithProviders = (props: ResultZaboProps) => {
  const router = createResultTextZaboRouter(props);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Features/Notice/Zabo/ResultTextZabo',
  component: ResultTextZaboWithProviders,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResultTextZaboWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockNotice,
};

export const WithSearchQuery: Story = {
  args: {
    ...mockNotice,
    searchQuery: '장학금',
  },
};

export const EmptyContent: Story = {
  args: {
    ...mockNotice,
    content: '',
  },
};

export const WithDeadline: Story = {
  args: {
    ...mockNotice,
    currentDeadline: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  },
};
