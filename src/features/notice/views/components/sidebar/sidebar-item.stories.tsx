import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import BoldHomeIcon from '@/assets/icons/bold-home.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';

import { SidebarItem } from './sidebar-item';

import type { Meta, StoryObj } from '@storybook/react-vite';

const createSidebarItemRouter = (
  props: React.ComponentProps<typeof SidebarItem>,
) => {
  const rootRoute = createRootRoute({
    component: () => <SidebarItem {...props} />,
  });
  return createRouter({ routeTree: rootRoute });
};

const SidebarItemWithRouter = (
  props: React.ComponentProps<typeof SidebarItem>,
) => {
  const router = createSidebarItemRouter(props);
  return <RouterProvider router={router} />;
};

const meta = {
  title: 'Features/Notice/Sidebar/SidebarItem',
  component: SidebarItemWithRouter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: { control: 'boolean' },
  },
} satisfies Meta<typeof SidebarItemWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '홈',
    icon: <HomeIcon className="stroke-text dark:stroke-dark_white" />,
    boldIcon: (
      <BoldHomeIcon className="fill-text stroke-text dark:fill-dark_white dark:stroke-none" />
    ),
    isSelected: false,
    to: '/',
  },
};

export const Selected: Story = {
  args: {
    title: '홈',
    icon: <HomeIcon className="stroke-text dark:stroke-dark_white" />,
    boldIcon: (
      <BoldHomeIcon className="fill-text stroke-text dark:fill-dark_white dark:stroke-none" />
    ),
    isSelected: true,
    to: '/',
  },
};
