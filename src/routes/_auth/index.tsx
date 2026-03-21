import { createFileRoute, redirect } from '@tanstack/react-router';

import { z } from 'zod';

import LandingModal from '@/features/landing/LandingModal/landing-modal';

export const Route = createFileRoute('/_auth/')({
  beforeLoad: () => {
    throw redirect({
      to: '/$category',
      params: { category: 'home' },
    });
  },
  component: LandingModal,
  validateSearch: z.object({ redirect: z.string().optional() }),
});
