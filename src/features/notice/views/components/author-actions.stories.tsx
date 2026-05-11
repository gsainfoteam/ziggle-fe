import { useMemo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { AuthorActions } from './author-actions';

import type { Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const StoryComponent = ({ noticeId }: { noticeId: number }) => {
  const router = useMemo(() => {
    const rootRoute = createRootRoute({
      component: () => (
        <div className="rounded-lg p-4">
          <AuthorActions noticeId={noticeId} />
        </div>
      ),
    });
    return createRouter({ routeTree: rootRoute });
  }, [noticeId]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Notice/AuthorActions',
  component: StoryComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    noticeId: { control: 'number' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    noticeId: 123,
  },
};
