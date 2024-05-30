import dayjs from 'dayjs';
import useSWRInfinite from 'swr/infinite';

import { Locale } from '@/app/i18next/settings';

import api from '..';

export interface NoticePaginationParams {
  offset?: number;
  limit?: number;
}

export interface Tag {
  id: number;
  name: string;
}

export const Category = {
  academic: 'ACADEMIC',
  recruit: 'RECRUIT',
  event: 'EVENT',
  club: 'CLUB',
  etc: 'ETC',
} as const;

export interface NoticeSearchParams {
  lang?: Locale;
  search?: string;
  tags?: string[];
  category?: (typeof Category)[keyof typeof Category];
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

export enum EmojiString {
  FIRE = '🔥',
  CRYING = '😭',
  ANGUISHED = '😧',
  THINKING = '🤔',
  SURPRISED = '😮',
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
}): Promise<NoticeDetail> =>
  api
    .post('/notice', { title, deadline, body, images, tags })
    .then((res) => res.data);

export const updateNotice = ({
  noticeId,
  body,
  deadline,
  lng,
}: {
  noticeId: number;
  body: string;
  deadline?: Date;
  lng: 'ko' | 'en';
}) =>
  api
    .patch(`/notice/${noticeId}?lang=${lng}`, { deadline, body })
    .then((res) => res.data);

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
    .post(`/notice/${noticeId}/${contentId}/foreign`, {
      lang,
      title,
      deadline,
      body,
    })
    .then((res) => res.data);

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
    .post(`/notice/${noticeId}/additional`, { title: 'title', body, deadline })
    .then((res) => res.data);

export const deleteNotice = (id: number) => api.delete(`/notice/${id}`);

export const addReaction = (noticeId: number, emoji: string) =>
  api
    .post<NoticeDetail>(`/notice/${noticeId}/reaction`, { emoji })
    .then((res) => res.data);

export const deleteReaction = (noticeId: number, emoji: string) =>
  api
    .delete<NoticeDetail>(`/notice/${noticeId}/reaction`, {
      data: { emoji },
    })
    .then((res) => res.data);
