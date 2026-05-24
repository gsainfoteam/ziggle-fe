import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { useAuthPrompt } from '@/features/auth';

import { ConsentModal } from './consent-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const createConsentRouter = () => {
  const root = createRootRoute({
    component: () => <ConsentModal onTermsClick={() => {}} />,
  });
  return createRouter({ routeTree: root });
};

const ConsentModalWithRouter = () => (
  <RouterProvider router={createConsentRouter()} />
);

const meta = {
  title: 'Auth/ConsentModal',
  component: ConsentModalWithRouter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsentModalWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: () => {
    useAuthPrompt.setState({ requiredConsents: true });
    return () => useAuthPrompt.setState({ requiredConsents: undefined });
  },
};
