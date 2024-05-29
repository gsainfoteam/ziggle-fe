import api from '..';
import { NoticePaginationParams, Notices, NoticeSearchParams } from './notice';

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams,
) => {
  return api.get<Notices>('/notice', { params }).then((res) => res.data);
};
