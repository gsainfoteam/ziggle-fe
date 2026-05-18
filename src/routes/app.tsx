import { createFileRoute, redirect } from '@tanstack/react-router';

import { z } from 'zod';

import { isMobile } from '@/common/utils';
import { AppRedirectPage } from '@/features/landing';

export const Route = createFileRoute('/app')({
  validateSearch: z.object({ redirect: z.string().optional() }),
  beforeLoad: () => {
    if (!isMobile()) {
      throw redirect({ to: '/$category', params: { category: 'home' } });
    }
  },
  component: AppRedirectPage,
});
