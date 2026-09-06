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

import { Button, LogClick, Toggle, confirmDialog } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import type { NoticeDetail } from '@/features/notice/models';
import { Category } from '@/features/notice/viewmodels';
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
import {
  writeBlockHeadingClassName,
  writeErrorClassName,
  writeFieldLabelClassName,
  writeFieldStackClassName,
  writeHintClassName,
  writeRequiredMarkClassName,
} from '../../form-fields/field-styles';
import { LanguageTab } from '../../form-fields/language-tab';
import { NoticeTypeSelector } from '../../form-fields/notice-type-selector';
import { TagInput } from '../../form-fields/tag-input';
import { AddAdditionalNotice } from '../add-additional-notice';
import { DeepLButton } from '../deep-l-button';
import { NoticeContentField, NoticeTitleField } from '../title-and-content';
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
            title: t('auto_save.has_saved.title'),
            description: t('auto_save.has_saved.description'),
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
    <div className="flex flex-col gap-10">
      {isEditMode && (
        <div className="flex flex-col gap-2">
          {notice?.createdAt && <EditableTimer createdAt={notice.createdAt} />}
          <p className="bg-muted text-muted-foreground rounded-xl px-4 py-3 text-sm">
            {t('edit_description')}
          </p>
        </div>
      )}

      <section className="flex flex-col gap-6">
        <h2 className={writeBlockHeadingClassName}>{t('sections.settings')}</h2>

        <div className={writeFieldStackClassName}>
          <p className={writeFieldLabelClassName}>
            {t('fields.notice_type')}
            <span className={writeRequiredMarkClassName} aria-hidden>
              *
            </span>
          </p>
          <NoticeTypeSelector disabled={isEditMode} />
        </div>

        <div className="flex items-center gap-3">
          <p className={writeFieldLabelClassName}>
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
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={writeBlockHeadingClassName}>{t('sections.content')}</h2>

        <NoticeTitleField lang="korean" disabled={isEditMode && hasTimedOut} />

        {english && (
          <NoticeTitleField
            lang="english"
            disabled={
              (isEditMode && Boolean(notice?.enTitle) && hasTimedOut) ||
              !english
            }
          />
        )}

        {english ? (
          <>
            <LanguageTab />
            <div className={writingTab === 'korean' ? undefined : 'hidden'}>
              <NoticeContentField
                lang="korean"
                hideLabel
                disabled={isEditMode && hasTimedOut}
              />
            </div>
            <div
              className={
                writingTab === 'english' ? writeFieldStackClassName : 'hidden'
              }
            >
              <NoticeContentField
                lang="english"
                hideLabel
                disabled={
                  (isEditMode && Boolean(notice?.enTitle) && hasTimedOut) ||
                  !english
                }
              />
              <LogClick eventName={LogEvents.writingClickDeepl}>
                <DeepLButton lang="korean" />
              </LogClick>
            </div>
          </>
        ) : (
          <NoticeContentField
            lang="korean"
            disabled={isEditMode && hasTimedOut}
          />
        )}

        {isEditMode &&
          ((writingTab === 'korean' && hasTimedOut) ||
            (writingTab === 'english' && hasTimedOut && notice?.enTitle)) && (
            <p className="bg-muted text-muted-foreground rounded-xl px-4 py-3 text-center text-sm">
              {t('edit_disabled')}
            </p>
          )}

        {isEditMode && notice && korean.additionalContent !== undefined && (
          <AddAdditionalNotice />
        )}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={writeBlockHeadingClassName}>{t('sections.options')}</h2>

        <div className={writeFieldStackClassName}>
          <div className="flex items-center gap-3">
            <p className={writeFieldLabelClassName}>
              {t(
                isEditMode ? 'fields.deadline.change' : 'fields.deadline.setup',
              )}
            </p>
            <Toggle
              isSwitched={!!deadline}
              onSwitch={(e) => {
                if (e.target.checked) setValue('deadline', dayjs());
                else setValue('deadline', undefined);
                e.isDefaultPrevented();
              }}
            />
          </div>
          {deadline && (
            <DateTimePicker
              dateTime={deadline}
              onChange={(dateTime) => setValue('deadline', dateTime)}
              className={cn(
                'w-full justify-between sm:w-auto sm:justify-start',
                formState.errors.deadline && 'border-red-500',
              )}
            />
          )}
          {formState.errors.deadline?.message && (
            <p className={writeErrorClassName}>
              {formState.errors.deadline.message}
            </p>
          )}
        </div>

        {!isEditMode && (
          <>
            <div className={writeFieldStackClassName}>
              <label className={writeFieldLabelClassName}>
                {t('fields.tags.setup')}
                <span className="text-muted-foreground ml-1.5 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <p className={writeHintClassName}>
                {t('fields.tags.description')}
              </p>
              <TagInput />
            </div>

            <div className={writeFieldStackClassName}>
              <label className={writeFieldLabelClassName}>
                {t('fields.photo.attach')}
                <span className="text-muted-foreground ml-1.5 font-normal">
                  ({t('optional')})
                </span>
              </label>
              <p className={writeHintClassName}>
                {t('fields.photo.description')}
              </p>
              <AttachPhotoArea />
            </div>
          </>
        )}
      </section>

      <div className="flex flex-col gap-3">
        <Button
          variant="contained"
          className="w-full"
          onClick={isEditMode ? onEdit : onSubmit}
          disabled={isLoading}
        >
          {t('buttons.submit')}
        </Button>
        <div className="text-muted-foreground flex flex-col gap-1 text-center text-sm">
          <p>{t('submit_description')}</p>
          {!isEditMode && <p>{t('auto_save.description')}</p>}
        </div>
      </div>
    </div>
  );
};
