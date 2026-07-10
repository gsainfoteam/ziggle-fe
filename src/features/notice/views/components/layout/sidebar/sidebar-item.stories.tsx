import {
  createRootRoute,
  createRouter,
  Link,
  RouterProvider,
} from '@tanstack/react-router';

import { HouseIcon } from '@phosphor-icons/react';

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
  title: 'Notice/Sidebar/SidebarItem',
  component: SidebarItemWithRouter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { control: 'boolean' },
  },
} satisfies Meta<typeof SidebarItemWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <HouseIcon className="text-text dark:text-dark_white" />,
    activeIcon: <HouseIcon weight="fill" className="text-primary" />,
    isActive: false,
    children: <Link to="/">홈</Link>,
  },
};

export const Active: Story = {
  args: {
    icon: <HouseIcon className="text-text dark:text-dark_white" />,
    activeIcon: <HouseIcon weight="fill" className="text-primary" />,
    isActive: true,
    children: <Link to="/">홈</Link>,
  },
};
