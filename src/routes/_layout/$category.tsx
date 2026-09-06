import { createFileRoute, notFound } from '@tanstack/react-router';

import { z } from 'zod';

import { NoticeCategoryFrame, NoticeNotFoundFrame } from '@/features/notice';
import { Category } from '@/features/notice/models';

const categoryParamSchema = z.object({
  category: z.string().toUpperCase().pipe(z.enum(Category)),
});

export const Route = createFileRoute('/_layout/$category')({
  component: NoticeCategoryFrame,
  notFoundComponent: NoticeNotFoundFrame,
  params: {
    parse: (raw) => {
      const result = categoryParamSchema.safeParse(raw);
      if (!result.success) throw notFound();
      return result.data;
    },
    stringify: (params) => ({
      category: params.category.toLowerCase(),
    }),
  },
  validateSearch: z.object({
    orderBy: z.enum(['recent', 'deadline', 'hot']).optional(),
    page: z.number().optional().default(0),
  }),
});
