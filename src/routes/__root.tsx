import { Outlet, createRootRoute } from '@tanstack/react-router';

import { OverlayProvider } from 'overlay-kit';

import '../styles.css';

import { LandingModal } from '@/features/auth';

export const Route = createRootRoute({
  component: () => (
    <OverlayProvider>
      <LandingModal />
      <Outlet />
    </OverlayProvider>
  ),
});
