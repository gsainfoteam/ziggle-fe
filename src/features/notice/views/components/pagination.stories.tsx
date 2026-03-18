import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';

import Pagination from './pagination';

interface PaginationStoryProps {
  items: number;
  itemsPerPage: number;
  page: number;
}

const createPaginationRouter = (props: PaginationStoryProps) => {
  const rootRoute = createRootRoute({
    component: () => <Pagination {...props} />,
  });
  return createRouter({ routeTree: rootRoute });
};

const PaginationWithRouter = (props: PaginationStoryProps) => {
  const router = createPaginationRouter(props);
  return <RouterProvider router={router} />;
};

const meta = {
  title: 'Features/Notice/Pagination',
  component: PaginationWithRouter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'number' },
    itemsPerPage: { control: 'number' },
    page: { control: 'number' },
  },
} satisfies Meta<typeof PaginationWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    items: 100,
    itemsPerPage: 10,
    page: 0,
  },
};

export const MiddlePage: Story = {
  args: {
    items: 100,
    itemsPerPage: 10,
    page: 4,
  },
};

export const LastPage: Story = {
  args: {
    items: 100,
    itemsPerPage: 10,
    page: 9,
  },
};

export const FewItems: Story = {
  args: {
    items: 5,
    itemsPerPage: 10,
    page: 0,
  },
};
