import api from '..';
import { auth } from '../auth/auth';
import { NoticePaginationParams, Notices, NoticeSearchParams } from './notice';

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams,
) => {
  const session = await auth();
  return api
    .get<Notices>('/notice', {
      params,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => res.data);
};
