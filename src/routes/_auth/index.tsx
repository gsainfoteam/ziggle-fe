import { createFileRoute, redirect } from '@tanstack/react-router';

import { z } from 'zod';

import { LandingModal } from '@/features/landing';

export const Route = createFileRoute('/_auth/')({
  validateSearch: z.object({ redirect: z.string().optional() }),
  component: LandingModal,
  beforeLoad: () => {
    throw redirect({
      to: '/$category',
      params: { category: 'home' },
    });
  },
});
