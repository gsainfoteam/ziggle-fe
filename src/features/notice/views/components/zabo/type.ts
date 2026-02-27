import type { Notice } from '@/features/notice/models';

export type ResultZaboProps = Notice & {
  searchQuery?: string;
  logName?: string;
};
