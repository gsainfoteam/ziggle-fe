import { Category } from '@/api/notice/notice';

export type HomePath =
  | keyof typeof Category
  | 'home'
  | 'deadline'
  | 'zigglepick';
