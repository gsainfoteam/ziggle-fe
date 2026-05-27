import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';

import { LoginModal } from './login-modal';

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

const createLoginRouter = () => {
  const root = createRootRoute({ component: LoginModal });
  return createRouter({ routeTree: root });
};

const LoginModalWithProviders = () => (
  <AuthProvider authConfig={mockAuthConfig}>
    <RouterProvider router={createLoginRouter()} />
  </AuthProvider>
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
