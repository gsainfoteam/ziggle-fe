import { createFileRoute } from '@tanstack/react-router';

import { NoticeSidebarLayout } from '@/features/notice';

export const Route = createFileRoute('/_layout/_sidebar')({
  component: NoticeSidebarLayout,
});
