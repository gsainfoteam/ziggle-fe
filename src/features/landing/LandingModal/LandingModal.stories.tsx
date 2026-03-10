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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from 'react-oauth2-code-pkce';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, 
    },
  },
});

const mockAuthContextValue = {
  token: '', 
  tokenData: undefined,
  idToken: '',
  idTokenData: undefined,
  loginInProgress: false,
  error: null,
  logIn: () => console.log('Log in clicked'), 
  logOut: () => console.log('Log out clicked'),
};

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
          <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={mockAuthContextValue as any}>
              <I18nextProvider i18n={i18n}>
                <RouterProvider router={router} />
              </I18nextProvider>
            </AuthContext.Provider>
          </QueryClientProvider>
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
