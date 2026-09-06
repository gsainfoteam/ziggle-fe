import { lazy, Suspense } from 'react';

import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoadingCatAnimation } from '@/common/components';
import {
  BODY_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import {
  writeErrorClassName,
  writeFieldClassNames,
  writeFieldLabelClassName,
  writeFieldStackClassName,
  writeRequiredMarkClassName,
} from '../../form-fields/field-styles';
import { useEditorRefs } from '../notice-editor/editor-refs-context';

const TinyMCEEditor = lazy(() =>
  import('../tiny-mce-editor').then((m) => ({ default: m.TinyMCEEditor })),
);

type Lang = 'korean' | 'english';

interface NoticeTitleFieldProps {
  lang: Lang;
  disabled?: boolean;
}

export const NoticeTitleField = ({ lang, disabled }: NoticeTitleFieldProps) => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const {
    field: titleField,
    fieldState: { error: titleError },
  } = useController({
    control,
    name: `${lang}.title`,
  });

  const title = titleField.value ?? '';
  const tooLong = title.length > TITLE_MAX_LENGTH;
  const invalid = Boolean(titleError) || tooLong;
  const errorMessage =
    titleError?.message ??
    (tooLong
      ? t('validations.title_too_long', { titleMaxLength: TITLE_MAX_LENGTH })
      : undefined);

  return (
    <div className={writeFieldStackClassName}>
      <label className={writeFieldLabelClassName}>
        {t(`fields.${lang}_title`)}
        <span className={writeRequiredMarkClassName} aria-hidden>
          *
        </span>
      </label>
      <input
        disabled={disabled}
        value={title}
        onChange={(e) => titleField.onChange(e.target.value)}
        onBlur={titleField.onBlur}
        type="text"
        placeholder={t('inputs.title.placeholder')}
        aria-invalid={invalid}
        className={writeFieldClassNames(invalid)}
      />
      {errorMessage && <p className={writeErrorClassName}>{errorMessage}</p>}
    </div>
  );
};

interface NoticeContentFieldProps {
  lang: Lang;
  disabled?: boolean;
  hideLabel?: boolean;
}

export const NoticeContentField = ({
  lang,
  disabled,
  hideLabel,
}: NoticeContentFieldProps) => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const { koreanRef, englishRef } = useEditorRefs();
  const editorRef = lang === 'korean' ? koreanRef : englishRef;

  const {
    field: contentField,
    fieldState: { error: contentError },
  } = useController({
    control,
    name: `${lang}.content`,
  });

  const content = contentField.value ?? '';
  const tooLong = content.length > BODY_MAX_LENGTH;
  const invalid = Boolean(contentError) || tooLong;
  const errorMessage =
    contentError?.message ??
    (tooLong
      ? t('validations.body_too_long', { bodyMaxLength: BODY_MAX_LENGTH }) +
        t('validations.char_count', {
          length: content.length,
          maxLength: BODY_MAX_LENGTH,
        })
      : undefined);

  return (
    <div className={writeFieldStackClassName}>
      {!hideLabel && (
        <label className={writeFieldLabelClassName}>
          {t(`fields.${lang}_content`)}
          <span className={writeRequiredMarkClassName} aria-hidden>
            *
          </span>
        </label>
      )}
      <Suspense fallback={<LoadingCatAnimation />}>
        <TinyMCEEditor
          disabled={disabled}
          value={content}
          onEditorChange={contentField.onChange}
          ref={editorRef}
          invalid={invalid}
        />
      </Suspense>
      {errorMessage && <p className={writeErrorClassName}>{errorMessage}</p>}
    </div>
  );
};

/** @deprecated */
export const TitleAndContent = ({
  lang,
  disabled,
}: {
  lang: Lang;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-6">
    <NoticeTitleField lang={lang} disabled={disabled} />
    <NoticeContentField lang={lang} disabled={disabled} />
  </div>
);
