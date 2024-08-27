'use client';

import {
  attachInternationalNotice,
  createAdditionalNotice,
  NoticeDetail,
} from '@/api/notice/notice';
import {
  Draft,
  EditorAction,
  EditorState,
  initialEditorState,
  retrieveDraftFromLocalStorage,
} from './actions';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { emit } from 'process';
import { RefObject, useEffect, useReducer, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Editor } from 'tinymce';

import { Category } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { NOTICE_LOCAL_STORAGE_KEY } from '@/utils/constants';
import { WarningSwal } from '@/utils/swals';
import { calculateRemainingTime } from '@/utils/utils';
import AddAdditionalNotice from '@/app/[lng]/(common)/(needSidebar)/notice/[id]/AddAdditionalNotice';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';
import Button from '@/app/components/atoms/Button';
import ClockIcon from '@/assets/icons/clock.svg';
import DateTimePicker from '@/app/components/organisms/DateTimePicker';
import GlobeIcon from '@/assets/icons/globe.svg';
import handleNoticeEdit from '@/app/[lng]/(write)/write/handle-notice-edit';
import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import TagIcon from '@/assets/icons/tag.svg';
import Toggle from '@/app/components/atoms/Toggle/Toggle';
import TypeIcon from '@/assets/icons/type.svg';

import AttachPhotoArea, { FileWithUrl } from './AttachPhotoArea';
import DeepLButton from './DeepLButton';
import EditableTimer from './EditableTimer';
import handleNoticeSubmit from './handle-notice-submit';
import LanguageTab from './LanguageTab';
import NoticeTypeSelector, { NoticeType } from './NoticeTypeSelector';
import TagInput, { Tag } from './TagInput';
import TitleAndContent from './TitleAndContent';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

interface NoticeEditorProps {
  params: PropsWithLng;
  notice?: NoticeDetail & {
    enTitle?: string;
    enContent?: string;
  };
  isEditMode: boolean;
}

const NoticeTypeCatgoryMapper = {
  recruit: Category.recruit,
  event: Category.event,
  general: Category.etc,
};

const NoticeEditor = ({
  params: { lng },
  notice,
  isEditMode,
}: NoticeEditorProps) => {
  const { t } = useTranslation(lng);
  const { push } = useRouter();

  const reducer = (state: EditorState, action: EditorAction) => {
    switch (action.type) {
      case 'TOGGLE_ENGLISH_VERSION': 
        return {
          ...state,
          english: state.english ? undefined : {
            title: "", 
            content: "", 
            additionalContent: undefined, 
          }
        };
      case 'SET_NOTICE_TYPE':
        return { ...state, noticeType: action.selectedNoticeType };
      case "SET_WRITING_TAB": {
        if (action.selectedWritingTab === "english" && !state.english) {
          throw new Error(
            "Invalid action: cannot set writing tab to english when englishVersion is not enabled. "
          )
        }
        return { ...state, writingTab: action.selectedWritingTab}
      }
      case 'SET_KOREAN_TITLE': 
        return { ...state, korean: {...state.korean, title: action.koreanTitle} };
      case 'SET_KOREAN_CONTENT':
        return { ...state, korean: {...state.korean, content: action.koreanContent} };
      case 'SET_ENGLISH_TITLE': {
        if (!state.english) {
          throw new Error(
            'Invalid action: cannot set english title when englishVesion is not enabled. ',
          );
        }
        return { ...state, english: {...state.english, title: action.englishTitle}};
      }
      case 'SET_ENGLISH_CONTENT': {
        if (!state.english) {
          throw new Error(
            'Invalid action: cannot set english content when englishVesion is not enabled. ',
          );
        }
        return { ...state, english: {...state.english, content: action.englishContent} };
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
      case "SET_ADDITIONAL_KOREAN_CONTENT": 
        return { ...state, korean: {...state.korean, additionalContent: action.additionalKoreanContent}}
      case "SET_ADDITIONAL_ENGLISH_CONTENT": {
        if (!state.english) {
          throw new Error(
            'Invalid action: cannot set english additional content when englishVesion is not enabled. ',
          );
        }
        return {...state, english: {...state.english, additionalContent: action.additionalEnglishContent}}
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialEditorState);

  const hasTimedOut = (() => {
    const remain = calculateRemainingTime(dayjs(notice?.createdAt));
    return remain.minutes <= 0 || remain.seconds <= 0;
  })();

  const [isLoading, setIsLoading] = useState(true);

  const koreanContentEditorRef = useRef<Editor | null>(null)
  const englishContentEditorRef = useRef<Editor | null>(null);

  

  useEffect(() => {
    const loadDraft = async () => {
      const draft = retrieveDraftFromLocalStorage();
      if (!draft) return "";

      console.log("load")
      console.log(draft)

      setIsLoading(true)

      const { isConfirmed } = await Swal.fire({
        text: t('write.hasSavedNotice'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: t('alertResponse.yes'),
        cancelButtonText: t('alertResponse.no'),
      });
      if (!isConfirmed) {
        setIsLoading(false)
        return
      };

      dispatch({ type: 'SET_KOREAN_TITLE', koreanTitle: draft.korean.title });
      console.log("laskjdlfj")
      dispatch({ type: 'SET_KOREAN_CONTENT', koreanContent: draft.korean.content});
      if (!draft.english) return
      dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle: draft.english.title });
      dispatch({type: 'SET_ENGLISH_CONTENT', englishContent: draft.english.content });

      setIsLoading(false)
    };

    const loadExistingNotice = () => {
      if (!notice) return;

      const {
        title: koreanTitle,
        content: koreanContent,
        enTitle: englishTitle,
        enContent: englishContent,
        currentDeadline: deadline,
      } = notice;

      dispatch({ type: 'SET_KOREAN_TITLE', koreanTitle });
      dispatch({ type: 'SET_KOREAN_CONTENT', koreanContent });
      dispatch({ type: "SET_ADDITIONAL_KOREAN_CONTENT", additionalKoreanContent: ""})
      if (englishTitle === undefined || englishContent === undefined) return
      dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle });
      dispatch({ type: 'SET_ENGLISH_CONTENT', englishContent });
      dispatch({ type: "SET_ADDITIONAL_ENGLISH_CONTENT", additionalEnglishContent: ""})
      dispatch({ type: 'SET_DEADLINE', deadline: dayjs(deadline) });
    };

    isEditMode ? loadExistingNotice() : loadDraft();
  }, [isEditMode, notice, t]);

  const saveDraft = async () => {
    if (isLoading) return;

    const draft: Draft = {
      korean: {
        ...state.korean
      }, 
      english: state.english ? {
        ...state.english
      } : undefined, 
      deadline: state.deadline
    };
    console.log("save")
    console.log(draft)

    localStorage.setItem(NOTICE_LOCAL_STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    if (!isEditMode && !isLoading) saveDraft();
  }, [isEditMode, state.korean, state.english, state.deadline])

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const noticeId = await handleNoticeSubmit({
      title: state.korean.title,
      deadline: state.deadline ? state.deadline.toDate() ?? undefined : undefined,
      noticeLanguage: state.english ? 'both' : 'ko',
      koreanBody: state.korean.title,
      enTitle: state.english?.title,
      englishBody: state.english?.content,
      tags: [...state.tags.map(({name}) => name)],
      images: state.photos.map(({file}) => file),
      category: NoticeTypeCatgoryMapper[state.noticeType],
      t,
    });
    if (!noticeId) {
      setIsLoading(false);
      Swal.fire({
        text: t('write.alerts.submitFail'),
        icon: 'error',
        confirmButtonText: t('alertResponse.confirm'),
      });
      return;
    }

    localStorage.removeItem(NOTICE_LOCAL_STORAGE_KEY);

    push(`/${lng}/notice/${noticeId}`);
  };

  const handleModify = async () => {
    if (isLoading || !notice) return;

    const warningSwal = WarningSwal(t);
    if (!state.korean.additionalContent && state.english?.additionalContent) {
      warningSwal(t('write.alerts.needKoreanAdditionalNotice'));
      return;
    }

    setIsLoading(true);

    Swal.fire({
      text: t('write.alerts.modifyingNotice'),
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    if (!hasTimedOut) {
      const editedLangs: ('ko' | 'en')[] = [];
      if (state.korean.content !== notice.content) editedLangs.push("ko")
      if (notice.enContent && state.english?.content !== notice.enContent) editedLangs.push("en")  
      
      if (editedLangs.length) {
        const updatedNoticeId = await handleNoticeEdit({
          noticeId: notice.id,
          koreanBody: state.korean.content,
          englishBody: state.english?.content,
          noticeLanguage: editedLangs.length === 1 ? editedLangs[0] : 'both',
          deadline: state.deadline ? state.deadline.toDate() : undefined,
          t,
        });

        if (!updatedNoticeId) {
          Swal.fire({
            text: t('write.alerts.modificationFail'),
            icon: 'error',
            confirmButtonText: t('alertResponse.confirm'),
          });
        }
      }
    } 

    if (notice.enContent === undefined && state.english) {
      const englishNotice = await attachInternationalNotice({
        lang: 'en',
        title: state.english.title,
        deadline: state.deadline ? state.deadline.toDate() : undefined,
        body: state.english.content,
        noticeId: notice.id,
        contentId: 1,
      }).catch(() => null);

      if (!englishNotice) {
        Swal.fire({
          text: t('write.alerts.attachInternationalFail'),
          icon: 'error',
          confirmButtonText: t('alertResponse.confirm'),
          showDenyButton: true,
          denyButtonText: t('write.alerts.copyEnglishContent'),
        }).then((result) => {
          if (result.isDenied) {
            navigator.clipboard.writeText(state.english?.content!);
            toast.success(t('write.alerts.copySuccess'));
          }
        });
        return;
      }
    }

    if (state.korean.additionalContent) {
      const additionalKoreanNotice = await createAdditionalNotice({
        noticeId: notice.id,
        body: state.korean.additionalContent,
        deadline: state.deadline ? state.deadline.toDate() : undefined,
      }).catch(() => null)

      if (additionalKoreanNotice === null) {
        Swal.fire({
          text: t('write.alerts.attachAdditionalNoticeFail'),
          icon: 'error',
          confirmButtonText: t('alertResponse.confirm'),
          showDenyButton: true,
          denyButtonText: t('write.alerts.copyAdditionalNotice'),
        }).then((result) => {
          if (result.isDenied) {
            navigator.clipboard.writeText(state.korean.additionalContent!);
            toast.success(t('write.alerts.copySuccess'));
          }
        });
        return
      }

      const contents = additionalKoreanNotice?.additionalContents
      const contentId = contents?.pop().id // TODO: Might not be an array

      if (contentId && state.english?.additionalContent) {
        const additionalEnglishNotice = await attachInternationalNotice({
          title: '',
          body: state.english.additionalContent,
          lang: 'en',
          noticeId: notice.id,
          contentId,
          deadline: state.deadline ? state.deadline.toDate() : undefined,
        }).catch(() => null)

        if (additionalEnglishNotice === null) {
          Swal.fire({
            text: t('write.alerts.attachInternationalAdditionalNoticeFail'),
            icon: 'error',
            confirmButtonText: t('alertResponse.confirm'),
            showDenyButton: true,
            denyButtonText: t('write.alerts.copyInternationalAdditionalNotice'),
          }).then((result) => {
            if (result.isDenied) {
              navigator.clipboard.writeText(state?.english?.additionalContent!);
              toast.success(t('write.alerts.copySuccess'));
            }
          });
          return;
        }
      }
    }
    
    Swal.fire({
      text: t('write.alerts.modificationSuccess'),
      icon: 'success',
      confirmButtonText: t('alertResponse.confirm'),
    });

    localStorage.removeItem(NOTICE_LOCAL_STORAGE_KEY);
    push(`/${lng}/notice/${notice.id}`);
  };
  
  return (
    <>
      {isEditMode && (
        <>
          {notice?.createdAt && (
            <EditableTimer createdAt={notice.createdAt} lng={lng} />
          )}
          <p
            className={
              'mt-[10px] rounded-[15px] bg-greyLight px-5 py-[15px] text-lg text-greyDark'
            }
          >
            {t('write.editDescription')}
          </p>
        </>
      )}

      {!isEditMode && (
        <div className={'flex justify-end'}>
          <p className={'text-sm text-primary'}>
            {t('write.autoSaveDescription')}
          </p>
        </div>
      )}

      <div className={'mb-10 mt-10 flex items-center gap-2'}>
        <GlobeIcon
          className={
            'w-5 md:w-6 ' +
            (state.english
              ? 'stroke-text dark:stroke-dark_white'
              : 'stroke-grey dark:stroke-dark_grey')
          }
        />
        <p
          className={
            'mr-1 text-lg font-medium ' +
            (state.english
              ? 'text-text dark:text-dark_white'
              : 'text-grey dark:text-dark_grey')
          }
        >
          {t('write.writeEnglishNotice')}
        </p>
        <Toggle
          isSwitched={!!state.english}
          onSwitch={() => {
            dispatch({type: "TOGGLE_ENGLISH_VERSION"})
            sendLog(LogEvents.noticeWritingPageCheckEnglish, {
              hasEnglishContent: !!state.english,
            });
          }}
        />
      </div>

      <div className="mb-3 flex gap-[6px]">
        <TypeIcon className="w-5 stroke-text dark:stroke-dark_white md:w-6" />
        <p className="font-medium">{t('write.noticeType')}</p>
      </div>

      <NoticeTypeSelector
        selectedNoticeType={state.noticeType}
        setNoticeType={(selectedNoticeType) => dispatch({type: "SET_NOTICE_TYPE", selectedNoticeType})}
        t={t}
        disabled={isEditMode}
      />

      {state.english && (
        <div className="mt-10">
          <LanguageTab
            writingTab={state.writingTab}
            setWritingTab={(selectedWritingTab) => dispatch({type: "SET_WRITING_TAB", selectedWritingTab})}
            t={t}
          />
        </div>
      )}

      {state.writingTab === "korean" && <div
        className={
          'flex flex-col justify-stretch ' +
          (state.writingTab !== 'korean' ? 'hidden' : '')
        }
      >
        <TitleAndContent
          title={state.korean.title}
          titleLabel={t('write.koreanTitle')}
          onChangeTitle={(newTitle: string) =>
            dispatch({ type: 'SET_KOREAN_TITLE', koreanTitle: newTitle })
          }
          content={state.korean.content}
          onChangeContent={(newContent: string) =>
            dispatch({ type: 'SET_KOREAN_CONTENT', koreanContent: newContent })
          }
          contentLabel={t('write.koreanContent')}
          editorRef={koreanContentEditorRef}
          t={t}
          disabled={isEditMode && hasTimedOut}
        />
      </div>}

      {
        state.writingTab === "english" && state.english && 
          <div className={'flex flex-col justify-stretch'}>
            <TitleAndContent
              title={state.english.title}
              titleLabel={t('write.englishTitle')}
              onChangeTitle={(newTitle: string) =>
                dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle: newTitle })
              }
              content={state.english.content}
              contentLabel={t('write.englishContent')}
              onChangeContent={(newContent: string) =>
                dispatch({
                  type: 'SET_ENGLISH_CONTENT',
                  englishContent: newContent,
                })
              }
              editorRef={englishContentEditorRef}
              t={t}
              disabled={(isEditMode && notice?.enTitle && hasTimedOut) || !state.english}
            />
        </div>
      }

      {state.english && (
        <DeepLButton
          t={t}
          editorRef={
            state.writingTab === 'korean' ? koreanContentEditorRef : englishContentEditorRef
          }
          originalLanguage={state.writingTab}
        />
      )}

      {/* 수정 모드이면서 (한국어 탭 && 수정 불가능) 또는 (영어 탭 && 수정 불가능 && 영어 공지 있음) */}
      {isEditMode &&
        ((state.writingTab === 'korean' && hasTimedOut) ||
          (state.writingTab === 'english' && hasTimedOut && notice?.enTitle)) && (
          <p
            className={
              'my-10 rounded-[10px] bg-greyLight px-[20px] py-[15px] text-center text-lg text-greyDark'
            }
          >
            {t('write.editDisabled')}
          </p>
        )}

      {isEditMode && notice && (state.korean.additionalContent !== undefined) && (
        <>
          <div className="h-10" />
          <AddAdditionalNotice
            noticeId={notice.id}
            originallyHasDeadline={notice.deadline}
            koreanContent={state.korean.additionalContent}
            englishContent={state.english?.additionalContent}
            onKoreanContentChange={(value: string) => dispatch({type: "SET_ADDITIONAL_KOREAN_CONTENT", additionalKoreanContent: value})}
            onEnglishContentChange={(value: string) => dispatch({type: "SET_ADDITIONAL_ENGLISH_CONTENT", additionalEnglishContent: value})}
            lng={lng}
          />
        </>
      )}

      <div className={'mb-3 mt-10 flex items-center gap-2'}>
        <ClockIcon className={'w-5 stroke-text md:w-6'} />

        <p className="text-lg font-medium">
          {t(isEditMode ? 'write.changeDeadline' : 'write.setupDeadline')}
        </p>

        <Toggle
          isSwitched={!!state.deadline}
          onSwitch={(e) => {
            dispatch({type: "TOGGLE_DEADLINE"})
            sendLog(LogEvents.noticeWritingPageCheckDeadline, {
              hasDeadline: e.target.checked,
            });
          }}
        />

        <div className={'w-1'} />

        {state.deadline && (
          <DateTimePicker dateTime={state.deadline} onChange={(dateTime: Dayjs) => dispatch({type: "SET_DEADLINE", deadline: dateTime})} />
        )}
      </div>

      {!isEditMode && (
        <>
          <div className="mb-2 mt-10 flex gap-2">
            <TagIcon className="w-5 fill-text md:w-6" />
            <p className="font-medium md:text-lg">{t('write.setupTags')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>

          <p className="font-regular mb-3 text-sm text-secondaryText">
            {t('write.writeTagsDescription')}
          </p>

          <TagInput tags={state.tags} setTags={(tags: Tag[]) => dispatch({type: "SET_TAGS", tags})} t={t} />

          <div className="mb-1 mt-10 flex items-center gap-2">
            <AddPhotoIcon className="w-5 stroke-text md:w-6" />
            <p className="font-medium md:text-lg">{t('write.attachPhoto')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>
          <p className="font-regular mb-3 text-sm text-secondaryText">
            {t('write.photoDescription')}
          </p>

          <AttachPhotoArea t={t} photos={state.photos} setPhotos={(photos: FileWithUrl[]) => dispatch({type: "SET_PHOTOS", photos})} />
        </>
      )}

      <div className={'mt-[10rem] flex flex-col items-center'}>
        <Button
          variant="contained"
          className="mb-4 w-60 rounded-[10px] py-2"
          onClick={isEditMode ? handleModify : handleSubmit}
          disabled={isLoading}
        >
          <p className="mx-3 my-1 text-base font-bold">{t('write.submit')}</p>
        </Button>
        <p className="font-regular max-w-[70%] text-center text-sm text-secondaryText">
          {t('write.submitDescription')}
        </p>
      </div>
    </>
  );
};

export default NoticeEditor;
