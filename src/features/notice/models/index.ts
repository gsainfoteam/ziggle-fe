import type dayjs from 'dayjs';

export type Reaction = {
  emoji: string;
  count: number;
  isReacted: boolean;
};

export type Group = {
  uuid: string;
  name: string;
  profileImageUrl: string | null;
};

export type Notice = {
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
};

export enum EmojiString {
  FIRE = '🔥',
  CRYING = '😭',
  ANGUISHED = '😧',
  THINKING = '🤔',
  SURPRISED = '😮',
}

export { ApiPaths } from '@/@types/api-schema';
