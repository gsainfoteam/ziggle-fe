import dayjs, { type Dayjs } from 'dayjs';

import { NOTICE_LOCAL_STORAGE_KEY } from '../components';

export interface EditorState {
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
  isLoading: boolean;
  account: string | null;
}

export const initialEditorState: EditorState = {
  noticeType: 'recruit',
  writingTab: 'korean',
  korean: {
    title: '',
    content: '',
    additionalContent: undefined,
  },
  english: undefined,
  deadline: undefined,
  tags: [],
  photos: [],
  isLoading: false,
  account: null,
};

export type EditorAction =
  | { type: 'TOGGLE_ENGLISH_VERSION' }
  | { type: 'SET_NOTICE_TYPE'; selectedNoticeType: NoticeType }
  | { type: 'SET_WRITING_TAB'; selectedWritingTab: 'korean' | 'english' }
  | { type: 'SET_KOREAN_TITLE'; koreanTitle: string }
  | { type: 'SET_KOREAN_CONTENT'; koreanContent: string }
  | { type: 'SET_ENGLISH_TITLE'; englishTitle: string }
  | { type: 'SET_ENGLISH_CONTENT'; englishContent: string }
  | { type: 'TOGGLE_DEADLINE' }
  | { type: 'SET_DEADLINE'; deadline: Dayjs }
  | { type: 'SET_TAGS'; tags: Tag[] }
  | { type: 'SET_PHOTOS'; photos: FileWithUrl[] }
  | { type: 'SET_ADDITIONAL_KOREAN_CONTENT'; additionalKoreanContent: string }
  | {
      type: 'SET_ADDITIONAL_ENGLISH_CONTENT';
      additionalEnglishContent: string;
    }
  | { type: 'SET_ACCOUNT'; account: string | null };

export const editorStateReducer = (
  state: EditorState,
  action: EditorAction,
) => {
  switch (action.type) {
    case 'TOGGLE_ENGLISH_VERSION':
      return {
        ...state,
        english: state.english
          ? undefined
          : {
              title: '',
              content: '',
              additionalContent: undefined,
            },
      };
    case 'SET_NOTICE_TYPE':
      return { ...state, noticeType: action.selectedNoticeType };
    case 'SET_WRITING_TAB': {
      if (action.selectedWritingTab === 'english' && !state.english) {
        throw new Error(
          'Invalid action: cannot set writing tab to english when englishVersion is not enabled. ',
        );
      }
      return { ...state, writingTab: action.selectedWritingTab };
    }
    case 'SET_KOREAN_TITLE':
      return {
        ...state,
        korean: { ...state.korean, title: action.koreanTitle },
      };
    case 'SET_KOREAN_CONTENT':
      return {
        ...state,
        korean: { ...state.korean, content: action.koreanContent },
      };
    case 'SET_ENGLISH_TITLE': {
      if (!state.english) {
        throw new Error(
          'Invalid action: cannot set english title when englishVersion is not enabled. ',
        );
      }
      return {
        ...state,
        english: { ...state.english, title: action.englishTitle },
      };
    }
    case 'SET_ENGLISH_CONTENT': {
      if (!state.english) {
        throw new Error(
          'Invalid action: cannot set english content when englishVersion is not enabled. ',
        );
      }
      return {
        ...state,
        english: { ...state.english, content: action.englishContent },
      };
    }
    case 'TOGGLE_DEADLINE':
      return {
        ...state,
        deadline: state.deadline ? undefined : dayjs(),
      };
    case 'SET_DEADLINE':
      return {
        ...state,
        deadline: action.deadline,
      };
    case 'SET_TAGS':
      return { ...state, tags: action.tags };
    case 'SET_PHOTOS':
      return { ...state, photos: action.photos };
    case 'SET_ADDITIONAL_KOREAN_CONTENT':
      return {
        ...state,
        korean: {
          ...state.korean,
          additionalContent: action.additionalKoreanContent,
        },
      };
    case 'SET_ADDITIONAL_ENGLISH_CONTENT': {
      if (!state.english) {
        throw new Error(
          'Invalid action: cannot set english additional content when englishVersion is not enabled. ',
        );
      }
      return {
        ...state,
        english: {
          ...state.english,
          additionalContent: action.additionalEnglishContent,
        },
      };
    }
    case 'SET_ACCOUNT':
      return { ...state, account: action.account };
    default:
      return state;
  }
};

export type Draft = Pick<EditorState, 'korean' | 'english' | 'deadline'>;

export const retrieveDraftFromLocalStorage = (): Draft | null => {
  const retrievedDraftData = localStorage.getItem(NOTICE_LOCAL_STORAGE_KEY);
  if (!retrievedDraftData) return null;

  try {
    const { korean, english, deadline } = JSON.parse(retrievedDraftData);
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
