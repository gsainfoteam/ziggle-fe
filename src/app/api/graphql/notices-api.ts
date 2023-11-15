import { RESTDataSource } from '@apollo/datasource-rest';

import {
  NoticeDetail,
  NoticePaginationParams,
  Notices,
  NoticeSearchParams,
} from '@/api/notice/notice';

export default class NoticesAPI extends RESTDataSource {
  override baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  async getNotices({
    offset,
    limit,
    tags = [],
    ...params
  }: NoticeSearchParams & NoticePaginationParams = {}) {
    return this.get<Notices>('notice/all', {
      params: {
        ...params,
        offset: offset?.toString(),
        limit: limit?.toString(),
        tags: tags.length > 0 ? tags.join(',') : undefined,
      },
    });
  }

  async getNotice(id: number) {
    return this.get<NoticeDetail>(`notice/${id}`);
  }
}
