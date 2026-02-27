import { createFileRoute } from '@tanstack/react-router';

import z from 'zod';

import { CallbackFrame } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackFrame,
  validateSearch: z.object({ code: z.string().optional() }),
});
