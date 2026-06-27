import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

import { NoticeCategoryFrame } from '@/features/notice';
import { Category } from '@/features/notice/models';

export const Route = createFileRoute('/_layout/$category')({
  component: NoticeCategoryFrame,
  params: {
    parse: z.object({
      category: z
        .string()
        .toUpperCase()
        .pipe(z.enum(Category))
        .catch(Category.ETC),
    }).parse,
    stringify: (params) => ({
      category: params.category.toLowerCase(),
    }),
  },
  validateSearch: z.object({
    deadline: z.boolean().optional().default(false),
    page: z.number().optional().default(0),
  }),
});
