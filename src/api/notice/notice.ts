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

interface Notice {
  id: number;
  title: string;
  views: number;
  body: string;
  deadline: string | null;
  createdAt: string;
  author: string;
  tags: { id: number; name: string }[];
  imageUrl: string | null;
}

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams = {},
) =>
  api.get<{ list: Notice[] }>('/notice/all', { params }).then(({ data }) => ({
    ...data,
    list: data.list.map(({ imageUrl, ...notice }) => ({
      ...notice,
      // createdAt: dayjs(notice.createdAt),
      deadline: notice.deadline ? notice.deadline : undefined,
      ...(imageUrl && { thumbnailUrl: imageUrl }),
    })),
  }));
