import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { NavbarWrite } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient();

const NavbarWriteWithProviders = () => {
  const rootRoute = createRootRoute({ component: NavbarWrite });
  const router = createRouter({ routeTree: rootRoute });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Write/Navbar',
  component: NavbarWriteWithProviders,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavbarWriteWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
