import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { DeadlineFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/deadline')({
  component: DeadlineFrame,
  validateSearch: z.object({
    orderBy: z.enum(['recent', 'deadline', 'hot']).optional(),
    page: z.number().optional().default(0),
  }),
});
