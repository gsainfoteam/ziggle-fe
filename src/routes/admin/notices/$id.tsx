import { createFileRoute } from '@tanstack/react-router';

import { AdminNoticeFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/notices/$id')({
  component: AdminNoticeFrame,
});
