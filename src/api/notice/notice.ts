import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import useSWRInfinite from 'swr/infinite';

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
  deadline: Date | null;
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

export const useNotices = () => {
  const { data, setSize, isLoading } = useSWRInfinite<Notices>(
    (page) => `/notice?offset=${page * 10}`,
  );
  const fetchMore = () => {
    setSize((data?.length ?? 0) + 1);
  };
  return {
    notices: data?.flatMap((page) => page.list) ?? [],
    fetchMore,
    isLoading,
  };
};

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
    addReaction(noticeId: $noticeId, emoji: $emoji) {
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
  }
`);

export const DELETE_REACTION = gql(`
  mutation DeleteReaction($noticeId: Int!, $emoji: String!) {
    deleteReaction(noticeId: $noticeId, emoji: $emoji) {
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
  }
`);
