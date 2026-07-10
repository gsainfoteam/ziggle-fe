import { lazy, Suspense } from 'react';

import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ContentIcon from '@/assets/icons/content.svg?react';
import TextIcon from '@/assets/icons/text.svg?react';
import { LoadingCatAnimation } from '@/common/components';
import { cn } from '@/common/utils';
import {
  BODY_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { useEditorRefs } from '../notice-editor/editor-refs-context';

const TinyMCEEditor = lazy(() =>
  import('../tiny-mce-editor').then((m) => ({ default: m.TinyMCEEditor })),
);

interface TitleAndContentProps {
  lang: 'korean' | 'english';
  disabled?: boolean;
}

export const TitleAndContent = ({ lang, disabled }: TitleAndContentProps) => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const { koreanRef, englishRef } = useEditorRefs();
  const editorRef = lang === 'korean' ? koreanRef : englishRef;

  const {
    field: titleField,
    fieldState: { error: titleError },
  } = useController({
    control,
    name: `${lang}.title`,
  });
  const {
    field: contentField,
    fieldState: { error: contentError },
  } = useController({
    control,
    name: `${lang}.content`,
  });

  const title = titleField.value ?? '';
  const content = contentField.value ?? '';
  const titleLabel = t(`fields.${lang}_title`);
  const contentLabel = t(`fields.${lang}_content`);

  return (
    <>
      <div className="mt-10 mb-2.5 flex gap-1.5">
        <TextIcon className="stroke-text w-5 md:w-6" />
        <p className="font-medium">{titleLabel}</p>
      </div>

      <input
        disabled={disabled}
        value={title}
        onChange={(e) => titleField.onChange(e.target.value)}
        onBlur={titleField.onBlur}
        type="text"
        placeholder={t('inputs.title.placeholder')}
        className={cn(
          'flex items-center gap-1.5 overflow-x-hidden rounded-[10px] border-[1.5px] border-solid bg-transparent px-4 py-2.5',
          disabled
            ? 'border-grey text-greyDark dark:text-dark_greyDark'
            : 'border-primary text-text dark:text-dark_white',
        )}
      />
      {titleError?.message && (
        <div className="font-regular text-secondaryText my-1 text-sm md:text-base">
          {'⚠️ '}
          {titleError.message}
        </div>
      )}
      {!titleError && title.length > TITLE_MAX_LENGTH && (
        <div className="font-regular text-secondaryText my-1 text-sm md:text-base">
          {'⚠️ '}
          {t('validations.title_too_long', {
            titleMaxLength: TITLE_MAX_LENGTH,
          })}
        </div>
      )}

      <div className="mt-10 mb-3 flex items-center gap-2">
        <ContentIcon className="stroke-text w-5 md:w-6" />
        <p className="font-medium">{contentLabel}</p>
      </div>

      <Suspense fallback={<LoadingCatAnimation />}>
        <TinyMCEEditor
          disabled={disabled}
          value={content}
          onEditorChange={contentField.onChange}
          ref={editorRef}
        />
      </Suspense>

      {contentError?.message && (
        <div className="font-regular text-secondaryText my-1 text-sm md:text-base">
          {'⚠️ '}
          {contentError.message}
        </div>
      )}

      {!contentError && content.length > BODY_MAX_LENGTH && (
        <div className="font-regular text-secondaryText my-1 text-sm md:text-base">
          {'⚠️ '}
          {t('validations.body_too_long', {
            bodyMaxLength: BODY_MAX_LENGTH,
          }) +
            t('validations.char_count', {
              length: content.length,
              maxLength: BODY_MAX_LENGTH,
            })}
        </div>
      )}
    </>
  );
};
