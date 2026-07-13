import { Outlet, createRootRoute } from '@tanstack/react-router';

import { OverlayProvider } from 'overlay-kit';

import '../styles.css';

export const Route = createRootRoute({
  component: () => (
    <OverlayProvider>
      <Outlet />
      {/* <TanStackDevtools
        config={{ position: 'top-right' }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </OverlayProvider>
  ),
});
