import { lazy, Suspense, useImperativeHandle, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import ContentIcon from '@/assets/icons/content.svg?react';
import TextIcon from '@/assets/icons/text.svg?react';
import { LoadingCatAnimation } from '@/common/components';
import { cn } from '@/common/utils';

import { BODY_MAX_LENGTH, TITLE_MAX_LENGTH } from '../../viewmodels';

import type { Editor } from 'tinymce';

const TinyMCEEditor = lazy(() =>
  import('./tiny-mce-editor').then((m) => ({ default: m.TinyMCEEditor })),
);

interface TitleAndContentProps {
  title: string;
  titleLabel: string;
  onChangeTitle: (newTitle: string) => void;
  content: string;
  contentLabel: string;
  onChangeContent: (newContent: string) => void;
  editorRef: React.Ref<Editor | null>;
  disabled?: boolean;
}

export const TitleAndContent = ({
  title,
  titleLabel,
  onChangeTitle,
  content,
  contentLabel,
  onChangeContent,
  editorRef,
  disabled,
}: TitleAndContentProps) => {
  const { t } = useTranslation('write');
  const ref = useRef<Editor | null>(null);
  useImperativeHandle(editorRef, () => ref.current!);
  return (
    <>
      <div className="mt-10 mb-2.5 flex gap-1.5">
        <TextIcon className="stroke-text w-5 md:w-6" />
        <p className="font-medium">{titleLabel}</p>
      </div>

      <input
        disabled={disabled}
        value={title}
        onChange={(e) => {
          onChangeTitle(e.target.value);
        }}
        type="text"
        placeholder={t('inputs.title.placeholder')}
        className={cn(
          'flex items-center gap-1.5 overflow-x-hidden rounded-[10px] border-[1.5px] border-solid bg-transparent px-4 py-2.5',
          disabled
            ? 'border-grey text-greyDark dark:text-dark_greyDark'
            : 'border-primary text-text dark:text-dark_white',
        )}
      />
      {title.length > TITLE_MAX_LENGTH && (
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
          onEditorChange={onChangeContent}
          ref={ref}
        />
      </Suspense>

      {content.length > BODY_MAX_LENGTH && (
        <div className="font-regular text-secondaryText my-1 text-sm md:text-base">
          {'⚠️ '}
          {t('validations.body_too_long', {
            bodyMaxLength: BODY_MAX_LENGTH,
          }) +
            ' ' +
            t('validations.char_count', {
              length: content.length,
              maxLength: BODY_MAX_LENGTH,
            })}
        </div>
      )}
    </>
  );
};
