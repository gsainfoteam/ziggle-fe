import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DeepLLogo from '@/assets/logos/deep-l.svg?react';
import { Button } from '@/common/components';
import type { NoticeFormValues } from '@/features/write/viewmodels';

import { useEditorRefs } from '../notice-editor/editor-refs-context';

interface DeepLButtonProps {
  lang: 'korean' | 'english';
}

const htmlToPlainText = (html: string) =>
  new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';

export const DeepLButton = ({ lang }: DeepLButtonProps) => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const formHtml = useWatch({ control, name: `${lang}.content` }) ?? '';
  const { koreanRef, englishRef } = useEditorRefs();
  const editorRef = lang === 'korean' ? koreanRef : englishRef;
  const DEEPL_URL =
    lang === 'korean'
      ? 'https://www.deepl.com/translator#ko/en'
      : 'https://www.deepl.com/translator#en/ko';

  return (
    <Button
      type="button"
      variant="outlined"
      className="inline-flex w-fit items-center gap-2 self-start"
      onClick={(e) => {
        e.preventDefault();
        const fromEditor = editorRef.current?.getContent({ format: 'text' });
        const text = (
          fromEditor?.trim() ? fromEditor : htmlToPlainText(formHtml)
        ).trim();
        window.open(`${DEEPL_URL}/${encodeURIComponent(text)}`, '_blank');
      }}
    >
      <DeepLLogo className="size-4 shrink-0" aria-hidden />
      {t('buttons.translate_deepl')}
    </Button>
  );
};
