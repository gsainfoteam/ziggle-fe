import { ziggleApi } from '..';
import { NoticePaginationParams, Notices, NoticeSearchParams } from './notice';

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams,
) => {
  return ziggleApi.get<Notices>('/notice', { params }).then((res) => res.data);
};
