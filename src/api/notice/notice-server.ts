import { cookies } from 'next/headers';

import api from '..';
import { NoticePaginationParams, Notices, NoticeSearchParams } from './notice';

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams = {},
) => {
  const cookieStore = cookies();
  return api
    .get<Notices>('/notice', {
      params,
      headers: {
        Authorization: `Bearer ${cookieStore.get('access_token')?.value}`,
      },
    })
    .then((res) => res.data);
};
