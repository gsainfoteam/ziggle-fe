import { createFileRoute } from '@tanstack/react-router';

import z from 'zod';

import { LandingFrame } from '@/features/landing';

export const Route = createFileRoute('/')({
  component: LandingFrame,
  validateSearch: z.object({ redirect: z.string().optional() }),
});
