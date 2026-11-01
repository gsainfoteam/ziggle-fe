import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { AccountProvider } from '@gsainfoteam/account-react';

import { account } from '@/common/lib';
import { useAuthPrompt } from '@/features/auth';

import { LandingModal } from './landing-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const createLandingRouter = () => {
  const root = createRootRoute({ component: LandingModal });
  return createRouter({ routeTree: root });
};

const LandingModalWithProviders = () => (
  <AccountProvider client={account}>
    <RouterProvider router={createLandingRouter()} />
  </AccountProvider>
);

const meta = {
  title: 'Auth/LandingModal',
  component: LandingModalWithProviders,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof LandingModalWithProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {};

export const Consent: Story = {
  beforeEach: () => {
    useAuthPrompt.setState({ requiredConsents: true });
    return () => useAuthPrompt.setState({ requiredConsents: undefined });
  },
};
