import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';

import { SearchBar } from './search-bar';

const createSearchBarRouter = () => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-150 p-4">
        <SearchBar />
      </div>
    ),
  });
  return createRouter({ routeTree: rootRoute });
};

const SearchBarWithRouter = () => {
  const router = createSearchBarRouter();
  return <RouterProvider router={router} />;
};

const meta = {
  title: 'Features/Notice/SearchBar',
  component: SearchBarWithRouter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBarWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
