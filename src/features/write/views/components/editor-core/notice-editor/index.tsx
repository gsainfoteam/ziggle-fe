import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
  type FieldErrors,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AddPhotoIcon from '@/assets/icons/add-photo.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';
import GlobeIcon from '@/assets/icons/globe.svg?react';
import TagIcon from '@/assets/icons/tag.svg?react';
import TypeIcon from '@/assets/icons/type.svg?react';
import { Button, LogClick, Toggle, confirmDialog } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { Category, type NoticeDetail } from '@/features/notice/models';
import {
  createNoticeFormSchema,
  defaultNoticeFormValues,
  retrieveDraftFromLocalStorage,
  saveDraftToLocalStorage,
  type NoticeFormValues,
  useHandleNoticeEdit,
  useHandleNoticeSubmit,
} from '@/features/write/viewmodels';

import { calculateRemainingTime } from '../../../utils';
import { AttachPhotoArea } from '../../form-fields/attach-photo-area';
import { DateTimePicker } from '../../form-fields/date-time-picker';
import EditableTimer from '../../form-fields/editable-timer';
import { LanguageTab } from '../../form-fields/language-tab';
import { NoticeTypeSelector } from '../../form-fields/notice-type-selector';
import { TagInput } from '../../form-fields/tag-input';
import { AddAdditionalNotice } from '../add-additional-notice';
import { DeepLButton } from '../deep-l-button';
import { TitleAndContent } from '../title-and-content';
import { EditorRefsProvider } from './editor-refs-context';

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
  const methods = useForm<NoticeFormValues>({
    defaultValues: defaultNoticeFormValues,
    resolver: (values, context, options) =>
      zodResolver(createNoticeFormSchema(t))(values, context, options),
  });

  return (
    <FormProvider {...methods}>
      <EditorRefsProvider>
        <NoticeEditorBody notice={notice} isEditMode={isEditMode} />
      </EditorRefsProvider>
    </FormProvider>
  );
};

const NoticeEditorBody = ({ notice, isEditMode }: NoticeEditorProps) => {
  const { t } = useTranslation('write');
  const { control, setValue, handleSubmit, formState } =
    useFormContext<NoticeFormValues>();
  const [isInitializing, setIsInitializing] = useState(true);

  const submitMutation = useHandleNoticeSubmit();
  const editMutation = useHandleNoticeEdit();
  const isLoading =
    isInitializing || submitMutation.isPending || editMutation.isPending;

  const hasTimedOut = (() => {
    const remain = calculateRemainingTime(dayjs(notice?.createdAt));
    return remain.minutes <= 0 || remain.seconds <= 0;
  })();

  const english = useWatch({ control, name: 'english' });
  const deadline = useWatch({ control, name: 'deadline' });
  const writingTab = useWatch({ control, name: 'writingTab' });
  const korean = useWatch({ control, name: 'korean' });

  useEffect(() => {
    const init = async () => {
      if (isEditMode) {
        if (!notice) return;
        const {
          title: koreanTitle,
          content: koreanContent,
          enTitle,
          enContent,
          currentDeadline,
        } = notice;
        setValue('korean', {
          title: koreanTitle,
          content: koreanContent,
          additionalContent: '',
        });
        if (enTitle !== undefined && enContent !== undefined) {
          setValue('english', {
            title: enTitle,
            content: enContent,
            additionalContent: '',
          });
        }
        if (currentDeadline) setValue('deadline', dayjs(currentDeadline));
      } else {
        const draft = retrieveDraftFromLocalStorage();
        if (draft) {
          const confirmed = await confirmDialog({
            description: t('auto_save.has_saved'),
          });
          if (confirmed) {
            setValue('korean', draft.korean);
            if (draft.english) setValue('english', draft.english);
            if (draft.deadline) setValue('deadline', draft.deadline);
          }
        }
      }
      setIsInitializing(false);
    };
    void init();
  }, [isEditMode, notice, t, setValue]);

  useEffect(() => {
    if (isLoading || isEditMode) return;
    saveDraftToLocalStorage({ korean, english, deadline });
  }, [isEditMode, isLoading, korean, english, deadline]);

  const onInvalid = (errors: FieldErrors<NoticeFormValues>) => {
    if (errors.english) setValue('writingTab', 'english');
    else if (errors.korean) setValue('writingTab', 'korean');
  };

  const onSubmit = handleSubmit((data) => {
    if (isLoading) return;
    submitMutation.mutate({
      title: data.korean.title,
      deadline: data.deadline?.toDate() ?? undefined,
      noticeLanguage: data.english ? 'both' : 'ko',
      koreanBody: data.korean.content,
      enTitle: data.english?.title,
      englishBody: data.english?.content,
      tags: data.tags.map(({ name }) => name),
      images: data.photos.map(({ file }) => file),
      category: NoticeTypeCategoryMapper[data.noticeType],
    });
  }, onInvalid);

  const onEdit = handleSubmit((data) => {
    if (isLoading || !notice) return;
    editMutation.mutate({
      noticeId: notice.id,
      originalNotice: {
        content: notice.content,
        enContent: notice.enContent,
        deadline: notice.currentDeadline ?? undefined,
      },
      koreanBody: data.korean.content,
      englishBody: data.english?.content,
      enTitle: data.english?.title,
      deadline: data.deadline ? data.deadline.toDate() : undefined,
      koreanAdditionalContent: data.korean.additionalContent,
      englishAdditionalContent: data.english?.additionalContent,
      hasTimedOut,
    });
  }, onInvalid);

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
            english
              ? 'stroke-text dark:stroke-dark_white'
              : 'stroke-grey dark:stroke-dark_grey',
          )}
        />
        <p
          className={cn(
            'mr-1 text-lg font-medium',
            english
              ? 'text-text dark:text-dark_white'
              : 'text-grey dark:text-dark_grey',
          )}
        >
          {t('buttons.write_english')}
        </p>
        <Toggle
          isSwitched={!!english}
          onSwitch={(e) => {
            if (e.target.checked) {
              setValue('english', {
                title: '',
                content: '',
                additionalContent: undefined,
              });
            } else {
              setValue('english', undefined);
              setValue('writingTab', 'korean');
            }
          }}
        />
      </div>

      <div className="mb-3 flex gap-1.5">
        <TypeIcon className="stroke-text dark:stroke-dark_white w-5 md:w-6" />
        <p className="font-medium">{t('fields.notice_type')}</p>
      </div>

      <NoticeTypeSelector disabled={isEditMode} />

      {english && (
        <div className="mt-10">
          <LanguageTab />
        </div>
      )}

      {writingTab === 'korean' && (
        <div className="flex flex-col justify-stretch">
          <TitleAndContent lang="korean" disabled={isEditMode && hasTimedOut} />
        </div>
      )}

      {writingTab === 'english' && english && (
        <div className="flex flex-col justify-stretch">
          <TitleAndContent
            lang="english"
            disabled={
              (isEditMode && Boolean(notice?.enTitle) && hasTimedOut) ||
              !english
            }
          />
        </div>
      )}

      {english && (
        <LogClick eventName={LogEvents.writingClickDeepl}>
          <DeepLButton lang={writingTab} />
        </LogClick>
      )}

      {isEditMode &&
        ((writingTab === 'korean' && hasTimedOut) ||
          (writingTab === 'english' && hasTimedOut && notice?.enTitle)) && (
          <p className="bg-greyLight text-greyDark my-10 rounded-[10px] px-5 py-3.75 text-center text-lg">
            {t('edit_disabled')}
          </p>
        )}

      {isEditMode && notice && korean.additionalContent !== undefined && (
        <>
          <div className="h-10" />
          <AddAdditionalNotice />
        </>
      )}

      <div className="mt-10 mb-3 flex items-center gap-2">
        <ClockIcon className="stroke-text w-5 md:w-6" />

        <p className="text-lg font-medium">
          {t(isEditMode ? 'fields.deadline.change' : 'fields.deadline.setup')}
        </p>

        <Toggle
          isSwitched={!!deadline}
          onSwitch={(e) => {
            if (e.target.checked) setValue('deadline', dayjs());
            else setValue('deadline', undefined);
            e.isDefaultPrevented();
          }}
        />

        <div className="w-1" />

        {deadline && (
          <DateTimePicker
            dateTime={deadline}
            onChange={(dateTime) => setValue('deadline', dateTime)}
          />
        )}
      </div>
      {formState.errors.deadline?.message && (
        <div className="font-regular text-secondaryText mb-3 text-sm">
          {'⚠️ '}
          {formState.errors.deadline.message}
        </div>
      )}

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

          <TagInput />

          <div className="mt-10 mb-1 flex items-center gap-2">
            <AddPhotoIcon className="stroke-text w-5 md:w-6" />
            <p className="font-medium md:text-lg">{t('fields.photo.attach')}</p>
            <p className="text-grey">{`(${t('optional')})`}</p>
          </div>
          <p className="font-regular text-secondaryText mb-3 text-sm">
            {t('fields.photo.description')}
          </p>

          <AttachPhotoArea />
        </>
      )}

      <div className="mt-40 flex flex-col items-center">
        <Button
          variant="contained"
          className="mb-4 w-60 rounded-[10px] py-2"
          onClick={isEditMode ? onEdit : onSubmit}
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
