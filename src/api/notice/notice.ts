<<<<<<< HEAD
import { Dayjs } from 'dayjs';
=======
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
>>>>>>> origin/118-feature-migration-to-nextjs-search-page

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
  title: string;
  views: number;
  body: string;
<<<<<<< HEAD
  deadline?: Dayjs | string | null;
  createdAt: Dayjs | string;
=======
  deadline?: dayjs.Dayjs | string | null;
  createdAt: dayjs.Dayjs | string;
>>>>>>> origin/118-feature-migration-to-nextjs-search-page
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
) =>
  api.get<Notices>('/notice', { params }).then(({ data }) => ({
    ...data,
    list: data.list.map(({ imageUrl, ...notice }) => ({
      ...notice,
      // createdAt: dayjs(notice.createdAt),
      deadline: notice.deadline ? notice.deadline : null,
      imageUrl: imageUrl ? imageUrl : null,
    })),
  }));

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
