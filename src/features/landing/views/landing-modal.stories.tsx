import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';
import { useAuthPrompt } from '@/features/auth';

import { LandingModal } from './landing-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockAuthConfig: TAuthConfig = {
  clientId: 'storybook',
  authorizationEndpoint: 'https://example.com/auth',
  tokenEndpoint: 'https://example.com/token',
  redirectUri: 'http://localhost:6006',
  scope: 'openid',
  autoLogin: false,
  decodeToken: false,
};

const createLandingRouter = () => {
  const root = createRootRoute({ component: LandingModal });
  return createRouter({ routeTree: root });
};

const LandingModalWithProviders = () => (
  <AuthProvider authConfig={mockAuthConfig}>
    <RouterProvider router={createLandingRouter()} />
  </AuthProvider>
);

const meta = {
  title: 'Landing/LandingModal',
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

