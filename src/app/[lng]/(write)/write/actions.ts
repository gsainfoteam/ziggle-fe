import dayjs, { Dayjs } from 'dayjs';
import { t } from 'i18next';
import Swal from 'sweetalert2';

import { Category } from '@/api/notice/notice';
import { NOTICE_LOCAL_STORAGE_KEY } from '@/utils/constants';

import { FileWithUrl } from './AttachPhotoArea';
import { NoticeType } from './NoticeTypeSelector';
import { Tag } from './TagInput';

export interface EditorState {
  noticeType: NoticeType;
  writingTab: "korean" | "english" ;
  korean: {
    title: string;
    content: string;
    additionalContent?: string
  }
  english?: {
    title: string;
    content: string;
    additionalContent?: string
  }
  deadline?: Dayjs;
  tags: Tag[];
  photos: FileWithUrl[];
  isLoading: boolean;
}

export const initialEditorState: EditorState = {
  noticeType: "recruit",
  writingTab: 'korean',
  korean: {
    title: "", 
    content: "", 
    additionalContent: undefined, 
  },
  english: undefined, 
  deadline: undefined,
  tags: [],
  photos: [],
  isLoading: false,
};

export type EditorAction =
  | { type: 'TOGGLE_ENGLISH_VERSION' }
  | { type: 'SET_NOTICE_TYPE'; selectedNoticeType: NoticeType }
  | { type: "SET_WRITING_TAB"; selectedWritingTab: "korean" | "english"}
  | { type: 'SET_KOREAN_TITLE'; koreanTitle: string }
  | { type: 'SET_KOREAN_CONTENT'; koreanContent: string }
  | { type: 'SET_ENGLISH_TITLE'; englishTitle: string }
  | { type: 'SET_ENGLISH_CONTENT'; englishContent: string }
  | { type: 'TOGGLE_DEADLINE' }
  | { type: 'SET_DEADLINE'; deadline: Dayjs }
  | { type: 'SET_TAGS'; tags: Tag[] }
  | { type: 'SET_PHOTOS'; photos: FileWithUrl[] }
  | { type: "SET_ADDITIONAL_KOREAN_CONTENT"; additionalKoreanContent: string}
  | { type: "SET_ADDITIONAL_ENGLISH_CONTENT"; additionalEnglishContent: string}

export type Draft = Pick<EditorState,
  'korean' | 'english' | "deadline"
>

export const retrieveDraftFromLocalStorage = (): Draft | null => {
  const retrievedDraftData = localStorage.getItem(NOTICE_LOCAL_STORAGE_KEY);
  if (!retrievedDraftData) return null;

  try {
    const { korean, english, deadline } =
      JSON.parse(retrievedDraftData);
    const isValid =
      typeof korean === "object" &&
      "title" in korean && typeof korean.title === "string" &&
      "content" in korean && typeof korean.content === "string" &&
      (typeof english === "undefined" || (
        typeof english === "object" &&
        "title" in english && typeof english.title === "string" &&
        "content" in english && typeof english.content === "string"
      )) &&
      (typeof deadline === "string" || typeof deadline === "undefined")
    if (!isValid) throw new Error('Parsed data have invalid type');

    return {
      korean, 
      english, 
      deadline: deadline ? dayjs(deadline) : undefined
    };
  } catch (error) {
    return null;
  }
};
