import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { AuthLayout } from '@/features/auth';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  validateSearch: z.object({
    redirect: z
      .string()
      .min(1, 'Redirect cannot be empty')
      .refine(
        (val) => val.startsWith('/') && !val.startsWith('//'),
        'Redirect must be a relative path',
      )
      .optional(),
  }),
});
