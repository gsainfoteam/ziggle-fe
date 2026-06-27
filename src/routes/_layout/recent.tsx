import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { RecentFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/recent')({
  component: RecentFrame,
  validateSearch: z.object({
    deadline: z.boolean().optional().default(false),
    page: z.number().optional().default(0),
  }),
});
