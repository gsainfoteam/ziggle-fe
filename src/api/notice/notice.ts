import dayjs from 'dayjs';

import { gql } from '@/generated';

import api from '..';

export interface NoticePaginationParams {
  offset?: number;
  limit?: number;
}

export interface NoticeSearchParams {
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

export interface NoticeDetail extends NoticeBase {
  imagesUrl: string[];
  reminder: boolean;
}

export interface Notices {
  list: Notice[];
  total: number;
}

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams = {},
) =>
  api.get<Notices>('/notice/all', { params }).then(({ data }) => ({
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

export const GET_NOTICES = gql(`
  query GetNotices($offset: Int, $limit: Int) {
    notices(offset: $offset, limit: $limit) {
      list {
        id
        title
        views
        body
        deadline
        createdAt
        author
        thumbnailUrl
        tags {
          id
          name
        }
      }
      total
    }
  }
`);
