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
        Authorization: `Bearer ${cookieStore.get('access_token')}`,
      },
    })
    .then(({ data }) => ({
      ...data,
      list: data.list.map(({ imageUrl, ...notice }) => ({
        ...notice,
        deadline: notice.deadline ? notice.deadline : null,
        imageUrl: imageUrl ? imageUrl : null,
      })),
    }));
};
