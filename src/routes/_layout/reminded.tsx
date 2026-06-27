import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { RemindedFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/reminded')({
  component: RemindedFrame,
  validateSearch: z.object({
    deadline: z.boolean().optional().default(false),
    page: z.number().optional().default(0),
  }),
});
