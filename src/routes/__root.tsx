import { TanStackDevtools } from '@tanstack/react-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import '../styles.css';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/common/lib/theme';
import { LandingModal } from '@/features/auth';

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <LandingModal />
        <Toaster />
        <Outlet />
      </ThemeProvider>
      <TanStackDevtools
        config={{ position: 'bottom-left' }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
