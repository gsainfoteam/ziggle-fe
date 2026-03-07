import type { Meta, StoryObj } from '@storybook/react';
import LandingModal from './LandingModal';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/common/lib/i18n';
import { Suspense, useEffect, useMemo } from 'react';

import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';

const meta: Meta<typeof LandingModal> = {
  title: 'Modals/LandingModal',
  component: LandingModal,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { locale } = context.globals;

      useEffect(() => {
        i18n.changeLanguage(locale);
      }, [locale]);

      const router = useMemo(() => {
        const rootRoute = createRootRoute();

        const authRoute = createRoute({
          getParentRoute: () => rootRoute,
          path: '/_auth',
          component: () => <Story />,
        });
        const routeTree = rootRoute.addChildren([authRoute]);

        return createRouter({
          routeTree,
          history: createMemoryHistory({
            initialEntries: ['/_auth?redirect=/home'],
          }),
        });
      }, []);

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <I18nextProvider i18n={i18n}>
            <RouterProvider router={router} />
          </I18nextProvider>
        </Suspense>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof LandingModal>;

export const Default: Story = {};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ko', title: '한국어' },
      ],
      showName: true,
    },
  },
};
