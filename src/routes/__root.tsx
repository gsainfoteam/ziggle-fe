import { TanStackDevtools } from '@tanstack/react-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import '@/common/lib/dayjs-init';
import '@/common/lib/init-amplitude';
import '@/common/lib/i18n';

import '../styles.css';
import { ThemeProvider } from '@/common/lib/theme';

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
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
