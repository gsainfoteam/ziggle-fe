import dayjs from 'dayjs';
import useSWRInfinite from 'swr/infinite';

import { Locale } from '@/app/i18next/settings';

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
  fetch('/api/notice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      deadline,
      body,
      images,
      tags,
    }),
  }).then((res) => {
    const response = res.json();
    if (!res.ok) throw response;
    return response;
  });

export const updateNotice = ({
  noticeId,
  content,
  deadline,
  lng,
}: {
  noticeId: number;
  content: string;
  deadline?: Date;
  lng: 'ko' | 'en';
}) =>
  fetch(`/notice/${noticeId}?lang=${lng}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deadline,
      content,
    }),
  }).then((res) => {
    const response = res.json();
    if (!res.ok) throw response;
    return response;
  });

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
  fetch(`/api/notice/${noticeId}/${contentId}/foreign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lang,
      title,
      deadline,
      body,
    }),
  }).then((res) => {
    const response = res.json();
    if (!res.ok) throw response;
    return response;
  });

export const createAdditionalNotice = ({
  noticeId,
  body,
  deadline,
}: {
  noticeId: number;
  body: string;
  deadline?: Date;
}) =>
  fetch(`/api/notice/${noticeId}/additional`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'title',
      body,
      deadline,
    }),
  }).then((res) => {
    const response = res.json();
    if (!res.ok) throw response;
    return response;
  });

export const deleteNotice = (id: number) =>
  fetch(`/api/notice/${id}`, {
    method: 'DELETE',
  });

export const addReaction = (noticeId: number, emoji: string) =>
  fetch(`/api/bff/notice/${noticeId}/reaction`, {
    method: 'POST',
    body: JSON.stringify({ emoji }),
  }).then<NoticeDetail>((res) => {
    if (!res.ok) throw `failed with status: ${res.status}`;
    return res.json();
  });

export const deleteReaction = (noticeId: number, emoji: string) =>
  fetch(`/api/bff/notice/${noticeId}/reaction`, {
    method: 'DELETE',
    body: JSON.stringify({ emoji }),
  }).then<NoticeDetail>((res) => {
    if (!res.ok) throw `failed with status: ${res.status}`;
    return res.json();
  });
