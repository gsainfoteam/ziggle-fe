import { createFileRoute, notFound } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { NoticeDetailFrame, NoticeNotFoundFrame } from '@/features/notice';
import { getNotice } from '@/features/notice/viewmodels';

export const Route = createFileRoute('/_layout/_sidebar/notice/$id')({
  loader: async ({ params }) => {
    const { id } = params;
    const notice = await getNotice(Number.parseInt(id));
    if (!notice.data) throw notFound();
    return notice.data;
  },
  pendingComponent: Loading,
  component: NoticeDetailFrame,
  notFoundComponent: NoticeNotFoundFrame,
});
