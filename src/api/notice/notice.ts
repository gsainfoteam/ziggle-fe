import dayjs from 'dayjs';
import useSWRInfinite from 'swr/infinite';

import { Locale } from '@/app/i18next/settings';

import { ziggleApi } from '..';
import { getGroupsToken } from '../group/group';

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

export interface Group {
  uuid: string;
  name: string;
  profileImageUrl: string | null;
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
  publishedAt: dayjs.Dayjs | string;
  tags: string[];
  views: number;
  imageUrls: string[];
  documentUrls: string[];
  isReminded: boolean;
  reactions: Reaction[];
  group: Group | null;
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

export const createNotice = async ({
  title,
  deadline,
  body,
  images,
  tags,
  category,
  groupId,
}: {
  title: string;
  deadline?: Date;
  body: string;
  images: string[];
  tags: number[];
  category: (typeof Category)[keyof typeof Category];
  groupId: string | null;
}): Promise<NoticeDetail> => {
  let groupsToken: string | null = null;

  if (groupId) {
    groupsToken = await getGroupsToken();
  }

  return ziggleApi
    .post(
      '/notice',
      {
        title,
        deadline,
        body,
        images,
        tags,
        category,
        groupId: groupId ?? undefined,
      },
      {
        ...(groupsToken
          ? {
              headers: {
                'Groups-Token': groupsToken,
              },
            }
          : {}),
      },
    )
    .then((res) => res.data);
};

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
  ziggleApi
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
  ziggleApi
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
  ziggleApi
    .post(`/notice/${noticeId}/additional`, { title: 'title', body, deadline })
    .then((res) => res.data);

export const deleteNotice = (id: number) => ziggleApi.delete(`/notice/${id}`);

export const addReaction = (noticeId: number, emoji: string) =>
  ziggleApi
    .post<NoticeDetail>(`/notice/${noticeId}/reaction`, { emoji })
    .then((res) => res.data);

export const deleteReaction = (noticeId: number, emoji: string) =>
  ziggleApi
    .delete<NoticeDetail>(`/notice/${noticeId}/reaction`, {
      data: { emoji },
    })
    .then((res) => res.data);
