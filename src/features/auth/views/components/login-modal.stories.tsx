import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { AccountProvider } from '@infoteam/account-react';

import { account } from '@/common/lib';

import { LoginModal } from './login-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const createLoginRouter = () => {
  const root = createRootRoute({ component: LoginModal });
  return createRouter({ routeTree: root });
};

const LoginModalWithProviders = () => (
  <AccountProvider client={account}>
    <RouterProvider router={createLoginRouter()} />
  </AccountProvider>
);

const meta = {
  title: 'Auth/LoginModal',
  component: LoginModalWithProviders,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginModalWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
