'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useReducer, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Editor } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import {
  attachInternationalNotice,
  createAdditionalNotice,
  NoticeDetail,
} from '@/api/notice/notice';
import { Category } from '@/api/notice/notice';
import { calculateRemainingTime } from '@/app/[lng]/write/calculateRemainingTime';
import DateTimePicker from '@/app/[lng]/write/DateTimePicker';
import handleNoticeEdit from '@/app/[lng]/write/handle-notice-edit';
import { WarningSwal } from '@/app/[lng]/write/swals';
import Analytics from '@/app/components/shared/Analytics';
import Button from '@/app/components/shared/Button';
import Toggle from '@/app/components/shared/Toggle/Toggle';
import { PropsWithLng, T } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import GlobeIcon from '@/assets/icons/globe.svg';
import TagIcon from '@/assets/icons/tag.svg';
import TypeIcon from '@/assets/icons/type.svg';

import AddAdditionalNotice from '../(with-page-layout)/(with-sidebar-layout)/notice/[id]/AddAdditionalNotice';
import AttachPhotoArea, { FileWithUrl } from './AttachPhotoArea';
import DeepLButton from './DeepLButton';
import EditableTimer from './EditableTimer';
import handleNoticeSubmit, { NoticeSubmitForm } from './handle-notice-submit';
import LanguageTab from './LanguageTab';
import {
  Draft,
  EditorAction,
  EditorState,
  editorStateReducer,
  initialEditorState,
  retrieveDraftFromLocalStorage,
} from './noticeEditorActions';
import NoticeTypeSelector from './NoticeTypeSelector';
import TagInput, { Tag } from './TagInput';
import TitleAndContent from './TitleAndContent';

const NoticeTypeCatgoryMapper = {
  recruit: Category.recruit,
  event: Category.event,
  general: Category.etc,
};

interface NoticeEditorProps {
  params: PropsWithLng;
  notice?: NoticeDetail & {
    enTitle?: string;
    enContent?: string;
  };
  isEditMode: boolean;
}

export const NOTICE_LOCAL_STORAGE_KEY = 'notice';

const NoticeEditor = ({
  params: { lng },
  notice,
  isEditMode,
}: NoticeEditorProps) => {
  const { t } = useTranslation(lng);
  const { push } = useRouter();

  const [state, dispatch] = useReducer(editorStateReducer, initialEditorState);
  const [isLoading, setIsLoading] = useState(true);

  const hasTimedOut = (() => {
    const remain = calculateRemainingTime(dayjs(notice?.createdAt));
    return remain.minutes <= 0 || remain.seconds <= 0;
  })();

  const koreanContentEditorRef = useRef<Editor | null>(null);
  const englishContentEditorRef = useRef<Editor | null>(null);

  useEffect(() => {
    const loadDraft = async () => {
      const draft = retrieveDraftFromLocalStorage();
      if (!draft) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const { isConfirmed } = await Swal.fire({
        text: t('write.hasSavedNotice'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: t('alertResponse.yes'),
        cancelButtonText: t('alertResponse.no'),
      });
      if (!isConfirmed) {
        setIsLoading(false);
        sendLog(LogEvents.writingRejectSaved);
        return;
      }

      sendLog(LogEvents.writingAcceptSaved, {
        draft,
      });
      dispatch({ type: 'SET_KOREAN_TITLE', koreanTitle: draft.korean.title });
      dispatch({
        type: 'SET_KOREAN_CONTENT',
        koreanContent: draft.korean.content,
      });
      if (!draft.english) return;
      dispatch({
        type: 'SET_ENGLISH_TITLE',
        englishTitle: draft.english.title,
      });
      dispatch({
        type: 'SET_ENGLISH_CONTENT',
        englishContent: draft.english.content,
      });

      setIsLoading(false);
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
      dispatch({
        type: 'SET_ADDITIONAL_KOREAN_CONTENT',
        additionalKoreanContent: '',
      });
      if (englishTitle === undefined || englishContent === undefined) return;
      dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle });
      dispatch({ type: 'SET_ENGLISH_CONTENT', englishContent });
      dispatch({
        type: 'SET_ADDITIONAL_ENGLISH_CONTENT',
        additionalEnglishContent: '',
      });
      dispatch({ type: 'SET_DEADLINE', deadline: dayjs(deadline) });
      setIsLoading(false);
    };

    isEditMode ? loadExistingNotice() : loadDraft();
  }, [isEditMode, notice, t]);

  useEffect(() => {
    const saveDraft = async () => {
      if (isLoading || isEditMode) return;

      const draft: Draft = {
        korean: {
          ...state.korean,
        },
        english: state.english
          ? {
              ...state.english,
            }
          : undefined,
        deadline: state.deadline,
      };

      localStorage.setItem(NOTICE_LOCAL_STORAGE_KEY, JSON.stringify(draft));
    };

    saveDraft();
  }, [isEditMode, state.korean, state.english, state.deadline, isLoading]);

  const handleSubmit = async () => {
    if (isLoading) return;

    await Swal.fire({
      text: t('write.alerts.pushWillDelayedNotice'),
      icon: 'info',
      confirmButtonText: t('alertResponse.confirm'),
    });

    setIsLoading(true);

    const noticeToSubmit: NoticeSubmitForm & { t: T } = {
      title: state.korean.title,
      deadline: state.deadline
        ? state.deadline.toDate() ?? undefined
        : undefined,
      noticeLanguage: state.english ? 'both' : 'ko',
      koreanBody: state.korean.content,
      enTitle: state.english?.title,
      englishBody: state.english?.content,
      tags: [...state.tags.map(({ name }) => name)],
      images: state.photos.map(({ file }) => file),
      category: NoticeTypeCatgoryMapper[state.noticeType],
      t,
    };

    sendLog(LogEvents.writingSubmit, {
      notice: noticeToSubmit,
    });

    const noticeId = await handleNoticeSubmit(noticeToSubmit);
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

    const editedLangs: ('ko' | 'en')[] = [
      state.korean.content !== notice.content && 'ko',
      notice.enContent && state.english?.content !== notice.enContent && 'en',
    ].filter(Boolean) as ('ko' | 'en')[];

    const isEdited = !!editedLangs.length;

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
      if (isEdited) {
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

    const isEnglishAttached = notice.enContent === undefined && !!state.english;

    if (isEnglishAttached) {
      const englishNotice = await attachInternationalNotice({
        lang: 'en',
        title: (state.english as { title: string }).title,
        deadline: state.deadline ? state.deadline.toDate() : undefined,
        body: (state.english as { content: string }).content,
        noticeId: notice.id,
        contentId: 1,
      }).catch(() => null);

      if (!englishNotice) {
        setIsLoading(false);
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

    const isAdditionalAttached = state.korean.additionalContent !== undefined;

    if (isAdditionalAttached) {
      const additionalKoreanNotice = await createAdditionalNotice({
        noticeId: notice.id,
        body: state.korean.additionalContent ?? '',
        deadline: state.deadline ? state.deadline.toDate() : undefined,
      }).catch(() => null);

      if (additionalKoreanNotice === null) {
        setIsLoading(false);
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
        return;
      }

      const contents = additionalKoreanNotice?.additionalContents;

      if (
        Array.isArray(contents) &&
        contents.pop().id &&
        state.english?.additionalContent
      ) {
        const additionalEnglishNotice = await attachInternationalNotice({
          title: '',
          body: state.english.additionalContent,
          lang: 'en',
          noticeId: notice.id,
          contentId: contents.pop().id,
          deadline: state.deadline ? state.deadline.toDate() : undefined,
        }).catch(() => null);

        if (additionalEnglishNotice === null) {
          setIsLoading(false);
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

    sendLog(LogEvents.writingModify, {
      isEdited,
      isEnglishAttached,
      isAdditionalAttached,
    });

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
            dispatch({ type: 'TOGGLE_ENGLISH_VERSION' });
            sendLog(LogEvents.writingToggleEnglish, {
              hasEnglish: !!state.english,
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
        setNoticeType={(selectedNoticeType) => {
          dispatch({ type: 'SET_NOTICE_TYPE', selectedNoticeType });
          sendLog(LogEvents.writingSelectType, {
            type: selectedNoticeType,
          });
        }}
        t={t}
        disabled={isEditMode}
      />

      {state.english && (
        <div className="mt-10">
          <LanguageTab
            writingTab={state.writingTab}
            setWritingTab={(selectedWritingTab) => {
              dispatch({ type: 'SET_WRITING_TAB', selectedWritingTab });
              sendLog(LogEvents.writingChangeTab, {
                tab: selectedWritingTab,
              });
            }}
            t={t}
          />
        </div>
      )}

      {state.writingTab === 'korean' && (
        <div
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
              dispatch({
                type: 'SET_KOREAN_CONTENT',
                koreanContent: newContent,
              })
            }
            contentLabel={t('write.koreanContent')}
            editorRef={koreanContentEditorRef}
            t={t}
            disabled={isEditMode && hasTimedOut}
          />
        </div>
      )}

      {state.writingTab === 'english' && state.english && (
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
            disabled={
              (isEditMode && notice?.enTitle && hasTimedOut) || !state.english
            }
          />
        </div>
      )}

      {state.english && (
        <Analytics event={LogEvents.writingClickDeepl}>
          <DeepLButton
            t={t}
            editorRef={
              state.writingTab === 'korean'
                ? koreanContentEditorRef
                : englishContentEditorRef
            }
            originalLanguage={state.writingTab}
          />
        </Analytics>
      )}

      {/* 수정 모드이면서 (한국어 탭 && 수정 불가능) 또는 (영어 탭 && 수정 불가능 && 영어 공지 있음) */}
      {isEditMode &&
        ((state.writingTab === 'korean' && hasTimedOut) ||
          (state.writingTab === 'english' &&
            hasTimedOut &&
            notice?.enTitle)) && (
          <p
            className={
              'my-10 rounded-[10px] bg-greyLight px-[20px] py-[15px] text-center text-lg text-greyDark'
            }
          >
            {t('write.editDisabled')}
          </p>
        )}

      {isEditMode && notice && state.korean.additionalContent !== undefined && (
        <>
          <div className="h-10" />
          <AddAdditionalNotice
            noticeId={notice.id}
            originallyHasDeadline={notice.deadline}
            koreanContent={state.korean.additionalContent}
            englishContent={state.english?.additionalContent}
            onKoreanContentChange={(value: string) =>
              dispatch({
                type: 'SET_ADDITIONAL_KOREAN_CONTENT',
                additionalKoreanContent: value,
              })
            }
            onEnglishContentChange={(value: string) =>
              dispatch({
                type: 'SET_ADDITIONAL_ENGLISH_CONTENT',
                additionalEnglishContent: value,
              })
            }
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
            dispatch({ type: 'TOGGLE_DEADLINE' });
            sendLog(LogEvents.writingToggleDeadline, {
              hasDeadline: e.target.checked,
            });
          }}
        />

        <div className={'w-1'} />

        {state.deadline && (
          <DateTimePicker
            dateTime={state.deadline}
            onChange={(dateTime: Dayjs) => {
              dispatch({ type: 'SET_DEADLINE', deadline: dateTime });
              sendLog(LogEvents.writingSetDeadline, {
                deadline: dateTime.toDate(),
              });
            }}
          />
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

          <TagInput
            tags={state.tags}
            setTags={(tags: Tag[]) => dispatch({ type: 'SET_TAGS', tags })}
            t={t}
          />

          <div className="mb-1 mt-10 flex items-center gap-2">
            <AddPhotoIcon className="w-5 stroke-text md:w-6" />
            <p className="font-medium md:text-lg">{t('write.attachPhoto')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>
          <p className="font-regular mb-3 text-sm text-secondaryText">
            {t('write.photoDescription')}
          </p>

          <AttachPhotoArea
            t={t}
            photos={state.photos}
            setPhotos={(photos: FileWithUrl[]) =>
              dispatch({ type: 'SET_PHOTOS', photos })
            }
          />
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
