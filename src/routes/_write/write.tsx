import { createFileRoute, notFound, redirect } from '@tanstack/react-router';

import z from 'zod';

import { api } from '@/common/lib';
import { ApiPaths } from '@/features/notice/models';
import { WriteFrame } from '@/features/write';

export const Route = createFileRoute('/_write/write')({
  component: WriteFrame,
  validateSearch: z.object({
    noticeId: z.number().optional(),
  }),
  loaderDeps: ({ search }) => ({ noticeId: search.noticeId }),
  loader: async ({ deps: { noticeId } }) => {
    if (!noticeId) return;
    const notice = await api.GET(ApiPaths.NoticeController_getNotice, {
      params: { path: { id: noticeId } },
    });
    if (!notice.data) throw notFound();
    const user = await api.GET(ApiPaths.UserController_getUserInfo);
    if (user.data?.uuid !== notice.data.author.uuid)
      throw redirect({
        to: '/notice/$id',
        params: { id: noticeId.toString() },
      });
    const englishNotice = notice.data.langs.includes('en')
      ? await api.GET(ApiPaths.NoticeController_getNotice, {
          params: { path: { id: noticeId }, query: { lang: 'en' } },
        })
      : null;
    return { notice: notice.data, englishNotice: englishNotice?.data };
  },
});
