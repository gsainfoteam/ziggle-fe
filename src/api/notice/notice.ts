import dayjs from 'dayjs';

import api from '..';

interface NoticePaginationParams {
  offset?: number;
  limit?: number;
}

interface NoticeSearchParams {
  search?: string;
  tags?: string[];
  orderBy?: 'deadline' | 'hot' | 'recent';
  my?: 'own' | 'reminders';
}

interface NoticeBase {
  id: number;
  title: string;
  views: number;
  body: string;
  deadline: string | null;
  createdAt: string;
  author: string;
  tags: { id: number; name: string }[];
}

interface Notice extends NoticeBase {
  imageUrl: string | null;
}

interface NoticeDetail extends NoticeBase {
  imagesUrl: string[];
  reminder: boolean;
}

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams = {},
) =>
  api
    .get<{ list: Notice[]; total: number }>('/notice/all', { params })
    .then(({ data }) => ({
      ...data,
      list: data.list.map(({ imageUrl, ...notice }) => ({
        ...notice,
        // createdAt: dayjs(notice.createdAt),
        deadline: notice.deadline ? notice.deadline : undefined,
        ...(imageUrl && { thumbnailUrl: imageUrl }),
      })),
    }));

export const getNotice = async (id: number) =>
  api.get<NoticeDetail>(`/notice/${id}`).then(({ data }) => ({
    ...data,
    deadline: data.deadline ? data.deadline : undefined,
  }));
