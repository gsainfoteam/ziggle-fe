import { createFileRoute } from '@tanstack/react-router';

import z from 'zod';

import { NoticeListFrame } from '@/features/notice';
import { Category } from '@/features/notice/models';

export const Route = createFileRoute('/_layout/_sidebar/$category')({
  component: NoticeListFrame,
  params: z.object({
    category: z
      .string()
      .toUpperCase()
      .pipe(z.enum(Category))
      .or(z.enum(['home', 'deadline', 'zigglepick', 'reminded', 'own']))
      .catch('home'),
  }),
  validateSearch: z.object({
    deadline: z.boolean().optional().default(false),
    page: z.number().optional().default(0),
  }),
});
