import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { MyFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/my')({
  component: MyFrame,
  validateSearch: z.object({
    orderBy: z.enum(['recent', 'deadline', 'hot']).optional(),
    page: z.number().optional().default(0),
  }),
});
