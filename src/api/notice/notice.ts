import dayjs from 'dayjs';

import { gql } from '@/generated';

import api from '..';

export interface NoticePaginationParams {
  offset?: number;
  limit?: number;
}

export interface Tag {
  id: number;
  name: string;
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
  title: string;
  deadline: dayjs.Dayjs | string | null;
  currentDeadline: dayjs.Dayjs | string | null;
  langs: string[];
  content: string;
  author: {
    name: string;
    uuid: string;
  };
  createdAt: dayjs.Dayjs | string;
  tags: string[];
  views: number;
  imageUrls: string[];
  documentUrls: string[];
  isReminded: boolean;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  isReacted: boolean;
}

export interface Content {
  id: number;
  deadline: Date;
  content: string;
  lang: string;
  createdAt: Date;
}

export interface NoticeDetail extends Notice {
  additionalContents: Content[];
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
    })),
  }));

export const getNotice = async (id: number) =>
  api.get<NoticeDetail>(`/notice/${id}`).then(({ data }) => ({
    ...data,
    currentDeadline: data.currentDeadline || null,
  }));

export const GET_NOTICES = gql(`
  query GetNotices($offset: Int, $limit: Int) {
    notices(offset: $offset, limit: $limit, orderBy: RECENT) {
      list {
        id
        title
        deadline
        currentDeadline
        langs
        content
        author {
          name
          uuid
        }
        createdAt
        tags
        views
        imageUrls
        documentUrls
        isReminded
        reactions {
          emoji
          count
          isReacted
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
      additionalContents {
        id
        deadline
        content
        lang
        createdAt
      }
    }
  }
`);

export const ATTACH_INTERNATIONAL_NOTICE = gql(`
  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!, $lang: String!) {
    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId, lang: $lang) {
      id
    }
  }
`);

export const CREATE_ADDITIONAL_NOTICE = gql(`
  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {
    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {
      id
      additionalContents {
        id
        deadline
        content
        lang
        createdAt
      }
    }
  }
`);

export const DELETE_NOTICE = gql(`
  mutation DeleteNotice($id: Int!) {
    deleteNotice(id: $id)
  }
`);

export const ADD_REACTION = gql(`
  mutation AddReaction($noticeId: Int!, $emoji: String!) {
    addReaction(noticeId: $noticeId, emoji: $emoji)
  }
`);

export const DELETE_REACTION = gql(`
  mutation DeleteReaction($noticeId: Int!, $emoji: String!) {
    deleteReaction(noticeId: $noticeId, emoji: $emoji)
  }
`);
