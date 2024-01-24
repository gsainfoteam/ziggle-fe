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

export interface Notice {
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
  imagesUrl: string[];
  files?: NoticeFile[] | null;
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

export interface NoticeDetail extends Notice {
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
    list: data.list.map(({ currentDeadline, ...notice }) => ({
      ...notice,
      currentDeadline: currentDeadline ?? null,
      contents: notice.contents.map(({ deadline, ...content }) => ({
        ...content,
        deadline: deadline ?? null,
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
    notices(offset: $offset, limit: $limit, orderBy: RECENT) {
      list {
        id
        views
        currentDeadline
        createdAt
        updatedAt
        deletedAt
        author
        imagesUrl
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
      }
      total
    }
  }
`);

export const CREATE_NOTICE = gql(`
  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {
    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {
      id
      contents {
        id
        lang
        title
        body
        deadline
        createdAt
        noticeId
      }
    }
  }
`);

export const ATTACH_INTERNATIONAL_NOTICE = gql(`
  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!, $lang: String!) {
    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId, lang: $lang) {
      id
      contents {
        id
        lang
        title
        body
        deadline
        createdAt
      }
    }
  }
`);

export const CREATE_ADDITIONAL_NOTICE = gql(`
  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {
    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {
      id
      contents {
        id
        lang
        title
        body
        deadline
        createdAt
        noticeId
      }
    }
  }
`);

export const DELETE_NOTICE = gql(`
  mutation DeleteNotice($id: Int!) {
    deleteNotice(id: $id)
  }
`);
