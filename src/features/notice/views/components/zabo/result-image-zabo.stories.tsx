import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { ResultImageZabo } from './result-image-zabo';

import type { ResultZaboProps } from './type';
import type { Meta, StoryObj } from '@storybook/react-vite';

const mockNotice: ResultZaboProps = {
  id: 1,
  title: '2026 봄 학기 동아리 모집',
  content: '저희 동아리에서 신입 부원을 모집합니다. 많은 관심 부탁드립니다.',
  author: { uuid: 'author-1', name: '홍길동', picture: null },
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: [
    'https://placehold.co/400x300?text=Image+1',
    'https://placehold.co/400x300?text=Image+2',
  ],
  tags: ['모집', '동아리'],
  views: 42,
  langs: ['ko'],
  reactions: [{ emoji: '🔥', count: 5, isReacted: false }],
  isReminded: false,
  category: {},
  publishedAt: new Date().toISOString(),
  documentUrls: [],
};

const queryClient = new QueryClient();

const createResultImageZaboRouter = (props: ResultZaboProps) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-150">
        <ResultImageZabo {...props} />
      </div>
    ),
  });
  return createRouter({ routeTree: rootRoute });
};

const ResultImageZaboWithProviders = (props: ResultZaboProps) => {
  const router = createResultImageZaboRouter(props);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Features/Notice/Zabo/ResultImageZabo',
  component: ResultImageZaboWithProviders,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResultImageZaboWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockNotice,
};

export const WithSearchQuery: Story = {
  args: {
    ...mockNotice,
    searchQuery: '동아리',
  },
};

export const WithDeadline: Story = {
  args: {
    ...mockNotice,
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    currentDeadline: new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  },
};

export const NoDeadline: Story = {
  args: {
    ...mockNotice,
    deadline: undefined,
    currentDeadline: undefined,
  },
};

export const WithPicture: Story = {
  args: {
    ...mockNotice,
    author: {
      ...mockNotice.author,
      picture: 'https://picsum.photos/seed/author1/36/36',
    },
  },
};
