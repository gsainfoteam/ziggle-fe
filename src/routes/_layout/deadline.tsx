import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { DeadlineFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/deadline')({
  component: DeadlineFrame,
  validateSearch: z.object({
    deadline: z.boolean().optional().default(false),
    page: z.number().optional().default(0),
  }),
});
