import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

export type NoticeType = 'recruit' | 'event' | 'general';

export interface Tag {
  id: number;
  name: string;
}

export interface FileWithUrl {
  file: File;
  url: string;
}

export interface NoticeFormValues {
  noticeType: NoticeType;
  writingTab: 'korean' | 'english';
  korean: {
    title: string;
    content: string;
    additionalContent?: string;
  };
  english?: {
    title: string;
    content: string;
    additionalContent?: string;
  };
  deadline?: Dayjs;
  tags: Tag[];
  photos: FileWithUrl[];
}

const localizedBody = z.object({
  title: z.string(),
  content: z.string(),
  additionalContent: z.string().optional(),
});

export const noticeFormSchema = z.object({
  noticeType: z.enum(['recruit', 'event', 'general']),
  writingTab: z.enum(['korean', 'english']),
  korean: localizedBody,
  english: localizedBody.optional(),
  deadline: z.custom<Dayjs>((v) => dayjs.isDayjs(v)).optional(),
  tags: z.array(z.object({ id: z.number(), name: z.string() })),
  photos: z.array(
    z.object({
      file: z.custom<File>((v) => v instanceof File),
      url: z.string(),
    }),
  ),
}) satisfies z.ZodType<NoticeFormValues, NoticeFormValues>;

export const defaultNoticeFormValues: NoticeFormValues = {
  noticeType: 'recruit',
  writingTab: 'korean',
  korean: { title: '', content: '', additionalContent: undefined },
  english: undefined,
  deadline: undefined,
  tags: [],
  photos: [],
};

export type Draft = Pick<NoticeFormValues, 'korean' | 'english' | 'deadline'>;

const DRAFT_KEY = 'notice';

export const retrieveDraftFromLocalStorage = (): Draft | null => {
  const retrieved = localStorage.getItem(DRAFT_KEY);
  if (!retrieved) return null;

  try {
    const { korean, english, deadline } = JSON.parse(retrieved);
    const isValid =
      typeof korean === 'object' &&
      'title' in korean &&
      typeof korean.title === 'string' &&
      'content' in korean &&
      typeof korean.content === 'string' &&
      (typeof english === 'undefined' ||
        (typeof english === 'object' &&
          'title' in english &&
          typeof english.title === 'string' &&
          'content' in english &&
          typeof english.content === 'string')) &&
      (typeof deadline === 'string' || typeof deadline === 'undefined');
    if (!isValid) throw new Error('Parsed data have invalid type');

    return {
      korean,
      english,
      deadline: deadline ? dayjs(deadline) : undefined,
    };
  } catch {
    return null;
  }
};

export const saveDraftToLocalStorage = (draft: Draft) => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};
