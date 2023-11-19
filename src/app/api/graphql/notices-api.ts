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
    return this.get<Notices>('notice', {
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

  async createNotice(
    data: {
      title: string;
      body: string;
      deadline?: Date;
      tags?: number[] | null;
      images?: string[] | null;
    },
    token: string,
  ) {
    return this.post<NoticeDetail>('notice', {
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async attachInternationalNotice(
    data: {
      title: string;
      body: string;
      deadline?: Date;
      noticeId: number;
      contentId: number;
    },
    token: string,
  ) {
    const { noticeId, contentId, ...body } = data;

    return this.post<NoticeDetail>(`notice/${noticeId}/${contentId}/foreign}`, {
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createAdditionalNotice(
    data: {
      title?: string;
      body: string;
      deadline?: Date;
      noticeId: number;
    },
    token: string,
  ) {
    const { noticeId, ...body } = data;

    return this.post<NoticeDetail>(`notice/${noticeId}/additional`, {
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
