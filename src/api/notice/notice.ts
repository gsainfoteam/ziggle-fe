import dayjs from 'dayjs';
import useSWRInfinite from 'swr/infinite';

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

export const createNotice = ({
  title,
  deadline,
  body,
  images,
  tags,
}: {
  title: string;
  deadline?: Date;
  body: string;
  images: string[];
  tags: number[];
}) =>
  api
    .post<NoticeDetail>(
      '/notice',
      {
        title,
        body,
        deadline,
        tags,
        images,
      },
      {
        headers: {
          Hello: 'World',
        },
      },
    )
    .then(({ data }) => data);

export const attachInternationalNotice = ({
  lang,
  title,
  deadline,
  body,
  noticeId,
  contentId,
}: {
  lang: string;
  title: string;
  deadline?: Date;
  body: string;
  noticeId: number;
  contentId: number;
}) =>
  api
    .post<NoticeDetail>(`/notice/${noticeId}/${contentId}/foreign`, {
      lang,
      title,
      deadline,
      body,
    })
    .then(({ data }) => data);

export const createAdditionalNotice = ({
  noticeId,
  body,
  deadline,
}: {
  noticeId: number;
  body: string;
  deadline?: Date;
}) =>
  api
    .post<NoticeDetail>(`notice/${noticeId}/additional`)
    .then(({ data }) => data);

export const deleteNotice = (id: number) =>
  api.delete(`/notice/${id}`).then(({ data }) => data);

export const addReaction = (noticeId: number, emoji: string) =>
  api
    .post<NoticeDetail>(`/notice/${noticeId}/reaction`, {
      emoji,
    })
    .then(({ data }) => data);

export const deleteReaction = (noticeId: number, emoji: string) =>
  api
    .delete<NoticeDetail>(`/notice/${noticeId}/reaction`, { data: { emoji } })
    .then(({ data }) => data);
