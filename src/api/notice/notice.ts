import dayjs from 'dayjs';

import { gql } from '@/generated';

import api from '..';

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
  deadline?: dayjs.Dayjs | string | null;
  createdAt: dayjs.Dayjs | string;
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

export const getNotice = async (id: number) =>
  api.get<NoticeDetail>(`/notice/${id}`).then(({ data }) => ({
    ...data,
    deadline: data.deadline ? data.deadline : undefined,
  }));
