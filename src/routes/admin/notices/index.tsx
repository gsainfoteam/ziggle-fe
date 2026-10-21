import { createFileRoute } from '@tanstack/react-router';

import { AdminNoticesFrame, Category } from '@/features/admin';

type AdminNoticeSearch = { page: number; search?: string; category?: Category };

export const Route = createFileRoute('/admin/notices/')({
  validateSearch: (search: Record<string, unknown>): AdminNoticeSearch => ({
    page:
      Number.isSafeInteger(Number(search.page)) && Number(search.page) >= 0
        ? Number(search.page)
        : 0,
    search: typeof search.search === 'string' ? search.search : undefined,
    category: Object.values(Category).includes(search.category as Category)
      ? (search.category as Category)
      : undefined,
  }),
  component: AdminNoticesFrame,
});
