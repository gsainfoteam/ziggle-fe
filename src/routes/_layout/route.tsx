import { createFileRoute } from '@tanstack/react-router';

import { NoticeCommonLayout } from '@/features/notice';

export const Route = createFileRoute('/_layout')({
  component: NoticeCommonLayout,
});
