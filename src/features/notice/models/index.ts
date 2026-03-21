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
export {
  ApiPaths,
  PathsNoticeGetParametersQueryCategory as Category,
} from '@/@types/api-schema';
