import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { NoticeEditor } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient();

const NoticeEditorWithProviders = ({ isEditMode }: { isEditMode: boolean }) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="mx-auto max-w-200 px-4 py-8">
        <NoticeEditor isEditMode={isEditMode} />
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
  title: 'Write/NoticeEditor',
  component: NoticeEditorWithProviders,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeEditorWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewNotice: Story = {
  args: { isEditMode: false },
};
