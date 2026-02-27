import type { components } from '@/@types/api-schema';

export enum EmojiString {
  FIRE = '🔥',
  CRYING = '😭',
  ANGUISHED = '😧',
  THINKING = '🤔',
  SURPRISED = '😮',
}

export type NoticeDetail = components['schemas']['ExpandedGeneralNoticeDto'];
export type AdditionalContent = components['schemas']['AdditionalContentsDto'];
export type Notice = components['schemas']['GeneralNoticeDto'];
export type Group = components['schemas']['GroupDto'];
export type Reaction = components['schemas']['GeneralReactionDto'];
export {
  ApiPaths,
  PathsNoticeGetParametersQueryCategory as Category,
} from '@/@types/api-schema';
