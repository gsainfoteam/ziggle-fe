import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { SendPushAlarm } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient();

interface ComposedArgs {
  id: number;
  author: { uuid: string; name: string; picture: string | null };
  publishedAt: string;
}

const SendPushAlarmWithProviders = (props: ComposedArgs) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="mx-auto max-w-200 p-4">
        <SendPushAlarm {...props} />
      </div>
    ),
  });
  const router = createRouter({ routeTree: rootRoute });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Notice/SendPushAlarm',
  component: SendPushAlarmWithProviders,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SendPushAlarmWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RecentlyPublished: Story = {
  args: {
    id: 1,
    author: { uuid: 'me', name: '나', picture: null },
    publishedAt: new Date(Date.now() - 30 * 1000).toISOString(),
  },
};

export const AlmostExpired: Story = {
  args: {
    id: 1,
    author: { uuid: 'me', name: '나', picture: null },
    publishedAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
  },
};

export const Expired: Story = {
  args: {
    id: 1,
    author: { uuid: 'me', name: '나', picture: null },
    publishedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
};
