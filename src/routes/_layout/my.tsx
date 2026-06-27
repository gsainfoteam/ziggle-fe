import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { MyFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/my')({
  component: MyFrame,
  validateSearch: z.object({
    deadline: z.boolean().optional().default(false),
    page: z.number().optional().default(0),
  }),
});
