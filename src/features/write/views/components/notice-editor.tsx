import { useEffect, useReducer, useRef, useState } from 'react';


import dayjs, { type Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { type Editor } from 'tinymce';

import AddPhotoIcon from '@/assets/icons/add-photo.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';
import GlobeIcon from '@/assets/icons/globe.svg?react';
import TagIcon from '@/assets/icons/tag.svg?react';
import TypeIcon from '@/assets/icons/type.svg?react';
import {
  Button,
  LogClick,
  Toggle,
  confirmDialog,
} from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { Category, type NoticeDetail } from '@/features/notice/models';

import {
  editorStateReducer,
  initialEditorState,
  retrieveDraftFromLocalStorage,
  type Draft,
} from '../../viewmodels/reducers/notice-editor-actions';
import { calculateRemainingTime } from '../utils';
import { AddAdditionalNotice } from './add-additional-notice';
import { AttachPhotoArea } from './attach-photo-area';
import { DateTimePicker } from './date-time-picker';
import { DeepLButton } from './deep-l-button';
import EditableTimer from './editable-timer';
import { LanguageTab } from './language-tab';
import { NoticeTypeSelector } from './notice-type-selector';
import { TagInput } from './tag-input';
import { TitleAndContent } from './title-and-content';
import {
  useHandleNoticeEdit,
  useHandleNoticeSubmit,
  type NoticeSubmitForm,
} from '../../viewmodels';

const NoticeTypeCategoryMapper = {
  recruit: Category.RECRUIT,
  event: Category.EVENT,
  general: Category.ETC,
};

interface NoticeEditorProps {
  notice?: NoticeDetail & {
    enTitle?: string;
    enContent?: string;
  };
  isEditMode: boolean;
}



export const NoticeEditor = ({ notice, isEditMode }: NoticeEditorProps) => {
  const { t } = useTranslation('write');


  const [state, dispatch] = useReducer(editorStateReducer, initialEditorState);
  const [isInitializing, setIsInitializing] = useState(true);

  const hasTimedOut = (() => {
    const remain = calculateRemainingTime(dayjs(notice?.createdAt));
    return remain.minutes <= 0 || remain.seconds <= 0;
  })();

  const koreanContentEditorRef = useRef<Editor | null>(null);
  const englishContentEditorRef = useRef<Editor | null>(null);
  const submitMutation = useHandleNoticeSubmit();
  const editMutation = useHandleNoticeEdit();

  const isLoading = isInitializing || submitMutation.isPending || editMutation.isPending;

  useEffect(() => {
    const loadDraft = async () => {
      const draft = retrieveDraftFromLocalStorage();
      if (!draft) {
        setIsInitializing(false);
        return;
      }

      setIsInitializing(true);

      const confirmed = await confirmDialog({
        description: t('auto_save.has_saved'),
      });
      if (!confirmed) {
        setIsInitializing(false);
        // TODO: send log
        // sendLog(LogEvents.writingRejectSaved);
        return;
      }
      // TODO: send log
      // sendLog(LogEvents.writingAcceptSaved, { draft });

      const { korean, english, deadline } = draft;
      dispatch({ type: 'SET_KOREAN_TITLE', koreanTitle: korean.title });
      dispatch({
        type: 'SET_KOREAN_CONTENT',
        koreanContent: korean.content,
      });
      if (english) {
        dispatch({ type: 'TOGGLE_ENGLISH_VERSION', value: true });
        dispatch({
          type: 'SET_ENGLISH_TITLE',
          englishTitle: english.title,
        });
        dispatch({
          type: 'SET_ENGLISH_CONTENT',
          englishContent: english.content,
        });
        if (english.additionalContent) {
          dispatch({
            type: 'SET_ADDITIONAL_ENGLISH_CONTENT',
            additionalEnglishContent: english.additionalContent,
          });
        }
      }
      if (deadline)
        dispatch({ type: 'SET_DEADLINE', deadline: dayjs(deadline) });

      setIsInitializing(false);
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
      if (englishTitle !== undefined && englishContent !== undefined) {
        dispatch({ type: 'TOGGLE_ENGLISH_VERSION', value: true });
        dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle });
        dispatch({ type: 'SET_ENGLISH_CONTENT', englishContent });
        dispatch({
          type: 'SET_ADDITIONAL_ENGLISH_CONTENT',
          additionalEnglishContent: '',
        });
      }
      if (deadline)
        dispatch({ type: 'SET_DEADLINE', deadline: dayjs(deadline) });

      setIsInitializing(false);
    };

    if (isEditMode) loadExistingNotice();
    else loadDraft();
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

      localStorage.setItem('notice', JSON.stringify(draft));
    };

    saveDraft();
  }, [isEditMode, state.korean, state.english, state.deadline, isLoading]);

  const handleSubmit = () => {
    if (isLoading) return;

    const noticeToSubmit: NoticeSubmitForm = {
      title: state.korean.title,
      deadline: state.deadline ? (state.deadline.toDate() ?? undefined) : undefined,
      noticeLanguage: state.english ? 'both' : 'ko',
      koreanBody: state.korean.content,
      enTitle: state.english?.title,
      englishBody: state.english?.content,
      tags: [...state.tags.map(({ name }) => name)],
      images: state.photos.map(({ file }) => file),
      category: NoticeTypeCategoryMapper[state.noticeType],
    };

    // TODO: send log
    // sendLog(LogEvents.writingSubmit, { notice: noticeToSubmit });

    submitMutation.mutate(noticeToSubmit);
  };

  const handleModify = () => {
    if (isLoading || !notice) return;

    // TODO: send log
    // sendLog(LogEvents.writingModify, ...);

    editMutation.mutate({
      noticeId: notice.id,
      originalNotice: {
        content: notice.content,
        enContent: notice.enContent,
      },
      koreanBody: state.korean.content,
      englishBody: state.english?.content,
      enTitle: state.english?.title,
      deadline: state.deadline ? state.deadline.toDate() : undefined,
      koreanAdditionalContent: state.korean.additionalContent,
      englishAdditionalContent: state.english?.additionalContent,
      hasTimedOut,
    });
  };

  return (
    <>
      {isEditMode && (
        <>
          {notice?.createdAt && <EditableTimer createdAt={notice.createdAt} />}
          <p className="bg-greyLight text-greyDark mt-2.5 rounded-[15px] px-5 py-3.75 text-lg">
            {t('edit_description')}
          </p>
        </>
      )}

      {!isEditMode && (
        <div className="flex justify-end">
          <p className="text-primary text-sm">{t('auto_save.description')}</p>
        </div>
      )}

      <div className="mt-10 mb-10 flex items-center gap-2">
        <GlobeIcon
          className={cn(
            'w-5 md:w-6',
            state.english
              ? 'stroke-text dark:stroke-dark_white'
              : 'stroke-grey dark:stroke-dark_grey',
          )}
        />
        <p
          className={cn(
            'mr-1 text-lg font-medium',
            state.english
              ? 'text-text dark:text-dark_white'
              : 'text-grey dark:text-dark_grey',
          )}
        >
          {t('buttons.write_english')}
        </p>
        <Toggle
          isSwitched={!!state.english}
          onSwitch={(e) => {
            dispatch({
              type: 'TOGGLE_ENGLISH_VERSION',
              value: e.target.checked,
            });
            // TODO: send log
            // sendLog(LogEvents.writingToggleEnglish, {
            //   hasEnglish: !!state.english,
            // });
          }}
        />
      </div>

      <div className="mb-3 flex gap-1.5">
        <TypeIcon className="stroke-text dark:stroke-dark_white w-5 md:w-6" />
        <p className="font-medium">{t('fields.notice_type')}</p>
      </div>

      <NoticeTypeSelector
        selectedNoticeType={state.noticeType}
        setNoticeType={(selectedNoticeType) => {
          dispatch({ type: 'SET_NOTICE_TYPE', selectedNoticeType });
          // TODO: send log
          // sendLog(LogEvents.writingSelectType, {
          //   type: selectedNoticeType,
          // });
        }}
        disabled={isEditMode}
      />

      {state.english && (
        <div className="mt-10">
          <LanguageTab
            writingTab={state.writingTab}
            setWritingTab={(selectedWritingTab) => {
              dispatch({ type: 'SET_WRITING_TAB', selectedWritingTab });
              // TODO: send log
              // sendLog(LogEvents.writingChangeTab, {
              //   tab: selectedWritingTab,
              // });
            }}
          />
        </div>
      )}

      {state.writingTab === 'korean' && (
        <div
          className={cn(
            'flex flex-col justify-stretch',
            state.writingTab !== 'korean' ? 'hidden' : '',
          )}
        >
          <TitleAndContent
            title={state.korean.title}
            titleLabel={t('fields.korean_title')}
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
            contentLabel={t('fields.korean_content')}
            editorRef={koreanContentEditorRef}
            disabled={isEditMode && hasTimedOut}
          />
        </div>
      )}

      {state.writingTab === 'english' && state.english && (
        <div className="flex flex-col justify-stretch">
          <TitleAndContent
            title={state.english.title}
            titleLabel={t('fields.english_title')}
            onChangeTitle={(newTitle: string) =>
              dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle: newTitle })
            }
            content={state.english.content}
            contentLabel={t('fields.english_content')}
            onChangeContent={(newContent: string) =>
              dispatch({
                type: 'SET_ENGLISH_CONTENT',
                englishContent: newContent,
              })
            }
            editorRef={englishContentEditorRef}
            disabled={
              (isEditMode && notice?.enTitle && hasTimedOut) || !state.english
            }
          />
        </div>
      )}

      {state.english && (
        <LogClick eventName={LogEvents.writingClickDeepl}>
          <DeepLButton
            editorRef={
              state.writingTab === 'korean'
                ? koreanContentEditorRef
                : englishContentEditorRef
            }
            originalLanguage={state.writingTab}
          />
        </LogClick>
      )}

      {/* 수정 모드이면서 (한국어 탭 && 수정 불가능) 또는 (영어 탭 && 수정 불가능 && 영어 공지 있음) */}
      {isEditMode &&
        ((state.writingTab === 'korean' && hasTimedOut) ||
          (state.writingTab === 'english' &&
            hasTimedOut &&
            notice?.enTitle)) && (
          <p className="bg-greyLight text-greyDark my-10 rounded-[10px] px-5 py-3.75 text-center text-lg">
            {t('edit_disabled')}
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
          />
        </>
      )}

      <div className="mt-10 mb-3 flex items-center gap-2">
        <ClockIcon className="stroke-text w-5 md:w-6" />

        <p className="text-lg font-medium">
          {t(isEditMode ? 'fields.deadline.change' : 'fields.deadline.setup')}
        </p>

        <Toggle
          isSwitched={!!state.deadline}
          onSwitch={(e) => {
            dispatch({ type: 'TOGGLE_DEADLINE' });
            // TODO: send log
            e.isDefaultPrevented();
            // sendLog(LogEvents.writingToggleDeadline, {
            //   hasDeadline: e.target.checked,
            // });
          }}
        />

        <div className="w-1" />

        {state.deadline && (
          <DateTimePicker
            dateTime={state.deadline}
            onChange={(dateTime: Dayjs) => {
              dispatch({ type: 'SET_DEADLINE', deadline: dateTime });
              // TODO: send log
              // sendLog(LogEvents.writingSetDeadline, {
              //   deadline: dateTime.toDate(),
              // });
            }}
          />
        )}
      </div>

      {!isEditMode && (
        <>
          <div className="mt-10 mb-2 flex gap-2">
            <TagIcon className="fill-text w-5 md:w-6" />
            <p className="font-medium md:text-lg">{t('fields.tags.setup')}</p>
            <p className="text-grey">{`(${t('optional')})`}</p>
          </div>

          <p className="font-regular text-secondaryText mb-3 text-sm">
            {t('fields.tags.description')}
          </p>

          <TagInput
            tags={state.tags}
            setTags={(tags) => dispatch({ type: 'SET_TAGS', tags })}
          />

          <div className="mt-10 mb-1 flex items-center gap-2">
            <AddPhotoIcon className="stroke-text w-5 md:w-6" />
            <p className="font-medium md:text-lg">{t('fields.photo.attach')}</p>
            <p className="text-grey">{`(${t('optional')})`}</p>
          </div>
          <p className="font-regular text-secondaryText mb-3 text-sm">
            {t('fields.photo.description')}
          </p>

          <AttachPhotoArea
            photos={state.photos}
            setPhotos={(photos) => dispatch({ type: 'SET_PHOTOS', photos })}
          />
        </>
      )}

      <div className="mt-40 flex flex-col items-center">
        <Button
          variant="contained"
          className="mb-4 w-60 rounded-[10px] py-2"
          onClick={isEditMode ? handleModify : handleSubmit}
          disabled={isLoading}
        >
          <p className="mx-3 my-1 text-base font-bold">{t('buttons.submit')}</p>
        </Button>
        <p className="font-regular text-secondaryText max-w-[70%] text-center text-sm">
          {t('submit_description')}
        </p>
      </div>
    </>
  );
};
