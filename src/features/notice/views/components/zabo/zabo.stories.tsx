import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import type { Notice } from '@/features/notice/models';

import { Zabo } from './zabo';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockNotice: Notice = {
  id: 1,
  title: '모의 공지 제목입니다',
  content: '모의 공지 본문입니다. 여러 줄로 구성된 내용을 보여줍니다.',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  author: { uuid: 'author-1', name: '홍길동' },
  deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: ['https://placehold.co/400x200?text=Image'],
  tags: ['태그1', '태그2'],
  views: 42,
  langs: ['ko'],
  reactions: [{ emoji: '🔥', count: 5, isReacted: false }],
  isReminded: false,
  category: {},
  publishedAt: new Date().toISOString(),
  documentUrls: [],
};

const queryClient = new QueryClient();

const createZaboRouter = (notice: Notice) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-160">
        <Zabo {...notice} />
      </div>
    ),
  });
  return createRouter({ routeTree: rootRoute });
};

const ZaboWithProviders = (props: Notice) => {
  const router = createZaboRouter(props);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Features/Notice/Zabo/Zabo',
  component: ZaboWithProviders,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ZaboWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockNotice,
};

export const WithoutDeadline: Story = {
  args: {
    ...mockNotice,
    deadline: undefined,
  },
};

export const MultipleImages: Story = {
  args: {
    ...mockNotice,
    imageUrls: [
      'https://placehold.co/400x200?text=Image+1',
      'https://placehold.co/400x200?text=Image+2',
      'https://placehold.co/400x200?text=Image+3',
    ],
  },
};

export const WithoutImage: Story = {
  args: {
    ...mockNotice,
    imageUrls: [],
  },
};

export const WithoutTags: Story = {
  args: {
    ...mockNotice,
    tags: [],
  },
};
