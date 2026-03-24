import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { fn } from 'storybook/test';

import type { User } from '@/features/auth/models';

import { ProfileModalPanel } from './profile-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const createProfileModalRouter = (
  props: React.ComponentProps<typeof ProfileModalPanel>,
) => {
  const rootRoute = createRootRoute({
    component: () => <ProfileModalPanel {...props} />,
  });
  return createRouter({ routeTree: rootRoute });
};

const ProfileModalPanelWithRouter = (
  props: React.ComponentProps<typeof ProfileModalPanel>,
) => {
  const router = createProfileModalRouter(props);
  return <RouterProvider router={router} />;
};

const meta = {
  title: 'Features/Notice/ProfileModalPanel',
  component: ProfileModalPanelWithRouter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileModalPanelWithRouter>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseUser: User = {
  uuid: 'mock-uuid',
  name: '홍길동',
  email: 'gildong@gm.gist.ac.kr',
  picture: null,
  consent: true,
};

export const Default: Story = {
  args: {
    user: baseUser,
    onClose: fn(),
    onSignOut: fn(),
    onWithdrawal: fn(),
  },
};

export const WithProfileImage: Story = {
  args: {
    user: { ...baseUser, picture: 'https://picsum.photos/64/64' },
    onClose: fn(),
    onSignOut: fn(),
    onWithdrawal: fn(),
  },
};
