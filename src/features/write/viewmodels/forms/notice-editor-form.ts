import dayjs, { type Dayjs } from 'dayjs';
import { isFile, isPlainObject, isString } from 'es-toolkit';
import type { TFunction } from 'i18next';
import { z } from 'zod';

export const TITLE_MAX_LENGTH = 50;
export const BODY_MAX_LENGTH = 20000;

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

/** TinyMCE 빈 본문(`<p></p>` 등)을 미입력으로 취급 */
export const isBlankRichText = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim().length === 0;

export const createNoticeFormSchema = (t: TFunction<'write'>) => {
  const koreanLocalizedBody = z.object({
    title: z
      .string()
      .trim()
      .min(1, { error: t('validations.title_required') })
      .max(TITLE_MAX_LENGTH, {
        error: t('validations.title_too_long', {
          titleMaxLength: TITLE_MAX_LENGTH,
        }),
      }),
    content: z.string().superRefine((value, ctx) => {
      if (isBlankRichText(value)) {
        ctx.addIssue({
          code: 'custom',
          message: t('validations.body_required'),
        });
        return;
      }
      if (value.length > BODY_MAX_LENGTH) {
        ctx.addIssue({
          code: 'custom',
          message:
            t('validations.body_too_long', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
            t('validations.char_count', {
              length: value.length,
              maxLength: BODY_MAX_LENGTH,
            }),
        });
      }
    }),
    additionalContent: z.string().optional(),
  });

  const englishLocalizedBody = z.object({
    title: z
      .string()
      .trim()
      .min(1, { error: t('validations.english_title_required') })
      .max(TITLE_MAX_LENGTH, {
        error: t('validations.title_too_long', {
          titleMaxLength: TITLE_MAX_LENGTH,
        }),
      }),
    content: z.string().superRefine((value, ctx) => {
      if (isBlankRichText(value)) {
        ctx.addIssue({
          code: 'custom',
          message: t('validations.english_body_required'),
        });
        return;
      }
      if (value.length > BODY_MAX_LENGTH) {
        ctx.addIssue({
          code: 'custom',
          message:
            t('validations.english_body_too_long', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
            t('validations.char_count', {
              length: value.length,
              maxLength: BODY_MAX_LENGTH,
            }),
        });
      }
    }),
    additionalContent: z.string().optional(),
  });

  return z
    .object({
      noticeType: z.enum(['recruit', 'event', 'general']),
      writingTab: z.enum(['korean', 'english']),
      korean: koreanLocalizedBody,
      english: englishLocalizedBody.optional(),
      deadline: z
        .custom<Dayjs>((value) => dayjs.isDayjs(value))
        .refine((value) => !value.isBefore(dayjs()), {
          error: t('validations.deadline_invalid'),
        })
        .optional(),
      tags: z.array(z.object({ id: z.number(), name: z.string() })),
      photos: z.array(
        z.object({
          file: z.custom<File>((value) => isFile(value)),
          url: z.string(),
        }),
      ),
    })
    .superRefine((data, ctx) => {
      const englishAdditional = data.english?.additionalContent?.trim();
      const koreanAdditional = data.korean.additionalContent?.trim();
      if (englishAdditional && !koreanAdditional) {
        ctx.addIssue({
          code: 'custom',
          message: t('validations.korean_additional_required'),
          path: ['korean', 'additionalContent'],
        });
      }
    }) satisfies z.ZodType<NoticeFormValues, NoticeFormValues>;
};

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
    const isLocalized = (value: unknown) =>
      isPlainObject(value) && isString(value.title) && isString(value.content);

    const isValid =
      isLocalized(korean) &&
      (english === undefined || isLocalized(english)) &&
      (isString(deadline) || deadline === undefined);
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
