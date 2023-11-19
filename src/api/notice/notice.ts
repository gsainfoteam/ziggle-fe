import dayjs from 'dayjs';

import { gql } from '@/generated';

import api from '..';

export enum NoticeKind {
  RECRUIT = 'recruit',
  EVENT = 'event',
  NORMAL = 'general',
  ACADEMIC = 'academic',
}

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
  views: number;
  currentDeadline?: dayjs.Dayjs | string | null;
  createdAt: dayjs.Dayjs | string;
  updatedAt: dayjs.Dayjs | string;
  deletedAt?: dayjs.Dayjs | string | null;
  author: string;
  tags: Tag[];
  logName?: string;
  contents: Content[];
  files: NoticeFile[];
  body: string;
}

export interface Content {
  id: number;
  lang: string; // TODO: enum graphql과의 호환성 문제로 임시로 string으로 사용
  title: string;
  body: string;
  deadline?: dayjs.Dayjs | string | null;
  createdAt: dayjs.Dayjs | string;
  noticeId: number;
}

interface NoticeFile {
  uuid: string;
  name: string;
  createdAt: dayjs.Dayjs | string;
  url: string;
  type: string; // TODO: enum
  noticeId: number;
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
  authorId: string;
}

export interface Notices {
  list: Notice[];
  total: number;
}

export const getAllNotices = async (
  params: NoticePaginationParams & NoticeSearchParams = {},
) =>
  api.get<Notices>('/notice', { params }).then(({ data }) => ({
    ...data,
    list: data.list.map(({ imageUrl, currentDeadline, ...notice }) => ({
      ...notice,
      currentDeadline: currentDeadline || null,
      imageUrl: imageUrl || null,
      contents: notice.contents.map(({ deadline, ...content }) => ({
        ...content,
        deadline: deadline || null,
      })),
    })),
  }));

export const getNotice = async (id: number) =>
  api.get<NoticeDetail>(`/notice/${id}`).then(({ data }) => ({
    ...data,
    currentDeadline: data.currentDeadline || null,
    contents: data.contents.map(({ deadline, ...content }) => ({
      ...content,
      deadline: deadline || null,
    })),
  }));

export const GET_NOTICES = gql(`
  query GetNotices($offset: Int, $limit: Int) {
    notices(offset: $offset, limit: $limit) {
      list {
        id
        views
        body
        currentDeadline
        createdAt
        updatedAt
        deletedAt
        author
        imageUrl
        tags {
          id
          name
        }
        contents {
          id
          lang
          title
          body
          deadline
          createdAt
          noticeId
        }
        files {
          uuid
          name
          createdAt
          url
          type
          noticeId
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
