import { createFileRoute } from '@tanstack/react-router';

import z from 'zod';

import { SearchFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/search')({
  component: SearchFrame,
  validateSearch: z.object({
    query: z.string().optional(),
    tags: z.string().optional(),
    page: z.string().optional(),
  }),
});
