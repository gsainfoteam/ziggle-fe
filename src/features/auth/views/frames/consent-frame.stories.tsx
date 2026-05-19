import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { ConsentFrame } from './consent-frame';

import type { Meta, StoryObj } from '@storybook/react-vite';

const createConsentRouter = () => {
  const root = createRootRoute({
    component: () => (
      <ConsentFrame onTermsClick={() => {}} />
    ),
  });
  return createRouter({ routeTree: root });
};

const ConsentFrameWithRouter = () => (
  <RouterProvider router={createConsentRouter()} />
);

const meta = {
  title: 'Auth/ConsentFrame',
  component: ConsentFrameWithRouter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsentFrameWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
