import dayjs from 'dayjs';

import { gql } from '@/generated';

import api from '..';

export interface NoticePaginationParams {
  offset?: number;
  limit?: number;
}

export enum NoticeKind {
  RECRUIT = 'recruit',
  EVENT = 'event',
  NORMAL = 'general',
  ACADEMIC = 'academic',
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
