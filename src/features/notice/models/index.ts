import type { components } from '@/@types/api-schema';

export enum EmojiString {
  FIRE = '🔥',
  CRYING = '😭',
  ANGUISHED = '😧',
  THINKING = '🤔',
  SURPRISED = '😮',
}

export type Author = components['schemas']['AuthorDto'];
export type NoticeDetail = components['schemas']['ExpandedGeneralNoticeDto'];
export type AdditionalContent = components['schemas']['AdditionalContentsDto'];
export type Notice = components['schemas']['GeneralNoticeDto'];
// TODO: temporary remove userId. should be removed from dto
export type Reaction = Omit<
  components['schemas']['GeneralReactionDto'],
  'userId'
>;
/** NoticeController_getNoticeList `order-by` — 스키마는 string, 스펙상 deadline|hot|recent */
export type OrderBy = 'recent' | 'deadline' | 'hot';
/** NoticeController_getNoticeList `my` — 스키마는 string, 스펙상 own|reminders|bookmarked */
export type My = 'own' | 'reminders' | 'bookmarked';
export {
  ApiPaths,
  PathsNoticeGetParametersQueryCategory as Category,
} from '@/@types/api-schema';
