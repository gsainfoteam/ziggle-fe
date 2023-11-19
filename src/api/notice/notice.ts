import dayjs from 'dayjs';
import { cookies } from 'next/headers';

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
  deadline?: dayjs.Dayjs | string | null;
  createdAt: dayjs.Dayjs | string;
  author: string;
  tags: Tag[];
  logName?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Notice extends NoticeBase {
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
        imageUrl
        tags {
          id
          name
        }
      }
      total
    }
  }
`);

export const CREATE_NOTICE = gql(`
  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {
    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {
      id
    }
  }
`);
