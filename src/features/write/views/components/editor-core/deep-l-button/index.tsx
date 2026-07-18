import { useTranslation } from 'react-i18next';

import DeepLLogo from '@/assets/logos/deep-l.svg?react';

import { useEditorRefs } from '../notice-editor/editor-refs-context';

interface DeepLButtonProps {
  lang: 'korean' | 'english';
}

export const DeepLButton = ({ lang }: DeepLButtonProps) => {
  const { t } = useTranslation('write');
  const { koreanRef, englishRef } = useEditorRefs();
  const editorRef = lang === 'korean' ? koreanRef : englishRef;
  const DEEPL_URL =
    lang === 'korean'
      ? 'https://www.deepl.com/translator#ko/en'
      : 'https://www.deepl.com/translator#en/ko';

  return (
    <button
      className="rounded-md bg-[#042B48] px-4 py-2"
      onClick={(e) => {
        e.preventDefault();
        window.open(
          `${DEEPL_URL}/${editorRef.current?.getContent({
            format: 'text',
          })}`,
          '_blank',
        );
      }}
    >
      <div className="flex gap-2">
        <DeepLLogo />
        <div className="dark:text-dark text-foreground font-medium">
          {t('buttons.translate_deepl')}
        </div>
      </div>
    </button>
  );
};
