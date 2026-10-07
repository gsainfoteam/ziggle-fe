import { createFileRoute, notFound } from '@tanstack/react-router';

import { LoadingCatAnimation } from '@/common/components';
import { NoticeDetailFrame, NoticeNotFoundFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/notice/$id')({
  loader: async ({ params }) => {
    const { id } = params;
    const numId = Number.parseInt(id);
    if (Number.isNaN(numId)) throw notFound();
    return { numId };
  },
  pendingComponent: () => (
    <>
      <div className="h-48" />
      <LoadingCatAnimation />
      <div className="h-48" />
    </>
  ),
  component: NoticeDetailFrame,
  notFoundComponent: NoticeNotFoundFrame,
});
