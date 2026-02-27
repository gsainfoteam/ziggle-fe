import { createFileRoute } from '@tanstack/react-router';

import { NoticeDetailFrame, NoticeNotFoundFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/_sidebar/notice/$id')({
  component: NoticeDetailFrame,
  notFoundComponent: NoticeNotFoundFrame,
});
