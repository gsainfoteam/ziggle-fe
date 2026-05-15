import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { Navbar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient();

const NavbarWithProviders = () => {
  const rootRoute = createRootRoute({ component: Navbar });
  const router = createRouter({ routeTree: rootRoute });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Notice/Navbar',
  component: NavbarWithProviders,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavbarWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
