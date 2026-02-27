import { useEffect, useReducer, useRef, useState } from 'react';

import { useRouter } from '@tanstack/react-router';

import dayjs, { type Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { type Editor } from 'tinymce';

import AddPhotoIcon from '@/assets/icons/add-photo.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';
import GlobeIcon from '@/assets/icons/globe.svg?react';
import TagIcon from '@/assets/icons/tag.svg?react';
import TypeIcon from '@/assets/icons/type.svg?react';
import { Button, LogClick, Toggle } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { Category, type NoticeDetail } from '@/features/notice/models';

import {
  editorStateReducer,
  initialEditorState,
  retrieveDraftFromLocalStorage,
  type Draft,
} from '../reducers';
import { calculateRemainingTime } from '../utils';
import { AddAdditionalNotice } from './add-additional-notice';
import { AttachPhotoArea } from './attach-photo-area';
import { DateTimePicker } from './date-time-picker';
import { DeepLButton } from './deep-l-button';
import { LanguageTab } from './language-tab';
import { NoticeTypeSelector } from './notice-type-selector';
import { TagInput } from './tag-input';
import { TitleAndContent } from './title-and-content';

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

export const NOTICE_LOCAL_STORAGE_KEY = 'notice';

export const NoticeEditor = ({ notice, isEditMode }: NoticeEditorProps) => {
  const { t } = useTranslation('notice');
  const router = useRouter();

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

      // t('alertResponse.yes')
      // t('alertResponse.no')
      const confirmed = confirm(t('write.hasSavedNotice'));
      if (!confirmed) {
        setIsLoading(false);
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
        dispatch({
          type: 'TOGGLE_ENGLISH_VERSION',
        });
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
      if (englishTitle !== undefined && englishContent !== undefined) {
        dispatch({ type: 'SET_ENGLISH_TITLE', englishTitle });
        dispatch({ type: 'SET_ENGLISH_CONTENT', englishContent });
        dispatch({
          type: 'SET_ADDITIONAL_ENGLISH_CONTENT',
          additionalEnglishContent: '',
        });
      }
      if (deadline)
        dispatch({ type: 'SET_DEADLINE', deadline: dayjs(deadline) });

      setIsLoading(false);
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

      localStorage.setItem(NOTICE_LOCAL_STORAGE_KEY, JSON.stringify(draft));
    };

    saveDraft();
  }, [isEditMode, state.korean, state.english, state.deadline, isLoading]);

  const handleSubmit = async () => {
    if (isLoading) return;

    // TODO: change with custom overlay
    alert(t('write.alerts.pushWillDelayedNotice'));

    setIsLoading(true);

    const noticeToSubmit: NoticeSubmitForm & { t: T } = {
      title: state.korean.title,
      deadline: state.deadline
        ? (state.deadline.toDate() ?? undefined)
        : undefined,
      noticeLanguage: state.english ? 'both' : 'ko',
      koreanBody: state.korean.content,
      enTitle: state.english?.title,
      englishBody: state.english?.content,
      tags: [...state.tags.map(({ name }) => name)],
      images: state.photos.map(({ file }) => file),
      category: NoticeTypeCategoryMapper[state.noticeType],
      groupId: state.account,
      t,
    };

    // TODO: send log
    // sendLog(LogEvents.writingSubmit, { notice: noticeToSubmit });

    const noticeId = await handleNoticeSubmit(noticeToSubmit);
    if (!noticeId) {
      setIsLoading(false);
      alert(t('write.alerts.submitFail'));
      return;
    }

    localStorage.removeItem(NOTICE_LOCAL_STORAGE_KEY);

    router.navigate({ to: '/notice/$id', params: { id: noticeId } });
  };

  const handleModify = async () => {
    if (isLoading || !notice) return;

    const editedLangs: ('ko' | 'en')[] = [
      state.korean.content !== notice.content && 'ko',
      notice.enContent && state.english?.content !== notice.enContent && 'en',
    ].filter(Boolean) as ('ko' | 'en')[];

    const isEdited = !!editedLangs.length;

    if (!state.korean.additionalContent && state.english?.additionalContent) {
      alert(t('write.alerts.needKoreanAdditionalNotice'));
      return;
    }

    setIsLoading(true);

    alert(t('write.alerts.modifyingNotice'));

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
          alert(t('write.alerts.modificationFail'));
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

    const isAdditionalAttached = !!state.korean.additionalContent;

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

    // TODO: send log
    // sendLog(LogEvents.writingModify, {
    //   isEdited,
    //   isEnglishAttached,
    //   isAdditionalAttached,
    // });

    alert(t('write.alerts.modificationSuccess'));

    localStorage.removeItem(NOTICE_LOCAL_STORAGE_KEY);
    router.navigate({ to: '/notice/$id', params: { id: notice.id } });
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
              'bg-greyLight text-greyDark mt-[10px] rounded-[15px] px-5 py-[15px] text-lg'
            }
          >
            {t('write.editDescription')}
          </p>
        </>
      )}

      {!isEditMode && (
        <div className={'flex justify-end'}>
          <p className={'text-primary text-sm'}>
            {t('write.autoSaveDescription')}
          </p>
        </div>
      )}

      <div className={'mt-10 mb-10 flex items-center gap-2'}>
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
            // TODO: send log
            // sendLog(LogEvents.writingToggleEnglish, {
            //   hasEnglish: !!state.english,
            // });
          }}
        />
      </div>

      <div className="mb-3 flex gap-[6px]">
        <TypeIcon className="stroke-text dark:stroke-dark_white w-5 md:w-6" />
        <p className="font-medium">{t('write.noticeType')}</p>
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
          <p
            className={
              'bg-greyLight text-greyDark my-10 rounded-[10px] px-[20px] py-[15px] text-center text-lg'
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
          />
        </>
      )}

      <div className={'mt-10 mb-3 flex items-center gap-2'}>
        <ClockIcon className={'stroke-text w-5 md:w-6'} />

        <p className="text-lg font-medium">
          {t(isEditMode ? 'write.changeDeadline' : 'write.setupDeadline')}
        </p>

        <Toggle
          isSwitched={!!state.deadline}
          onSwitch={(e) => {
            dispatch({ type: 'TOGGLE_DEADLINE' });
            // TODO: send log
            // sendLog(LogEvents.writingToggleDeadline, {
            //   hasDeadline: e.target.checked,
            // });
          }}
        />

        <div className={'w-1'} />

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
            <p className="font-medium md:text-lg">{t('write.setupTags')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>

          <p className="font-regular text-secondaryText mb-3 text-sm">
            {t('write.writeTagsDescription')}
          </p>

          <TagInput
            tags={state.tags}
            setTags={(tags) => dispatch({ type: 'SET_TAGS', tags })}
          />

          <div className="mt-10 mb-1 flex items-center gap-2">
            <AddPhotoIcon className="stroke-text w-5 md:w-6" />
            <p className="font-medium md:text-lg">{t('write.attachPhoto')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>
          <p className="font-regular text-secondaryText mb-3 text-sm">
            {t('write.photoDescription')}
          </p>

          <AttachPhotoArea
            photos={state.photos}
            setPhotos={(photos) => dispatch({ type: 'SET_PHOTOS', photos })}
          />

          {/* TODO: implement groups feature */}
          {/* <div className="mt-10 mb-1 flex items-center gap-2">
            <ColorFilterIcon className="stroke-text w-5 md:w-6" />
            <p className="font-medium md:text-lg">{t('write.selectAccount')}</p>
          </div> */}
          {/* <SelectAccountArea
            account={state.account}
            setAccount={(account: string | null) =>
              dispatch({ type: 'SET_ACCOUNT', account })
            }
          /> */}
        </>
      )}

      <div className={'mt-40 flex flex-col items-center'}>
        <Button
          variant="contained"
          className="mb-4 w-60 rounded-[10px] py-2"
          onClick={isEditMode ? handleModify : handleSubmit}
          disabled={isLoading}
        >
          <p className="mx-3 my-1 text-base font-bold">{t('write.submit')}</p>
        </Button>
        <p className="font-regular text-secondaryText max-w-[70%] text-center text-sm">
          {t('write.submitDescription')}
        </p>
      </div>
    </>
  );
};
