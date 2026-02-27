import { useTranslation } from 'react-i18next';
import { type Editor as TinyMCEEditorRef } from 'tinymce';

import DeepLLogo from '@/assets/logos/deep-l.svg?react';

interface DeepLButtonProps {
  query?: string;
  editorRef?: React.RefObject<TinyMCEEditorRef | null>;
  originalLanguage: 'korean' | 'english';
}

export const DeepLButton = ({
  editorRef,
  originalLanguage,
}: DeepLButtonProps) => {
  const { t } = useTranslation('notice');
  const DEEPL_URL =
    originalLanguage === 'korean'
      ? 'https://www.deepl.com/translator#ko/en'
      : 'https://www.deepl.com/translator#en/ko';

  return (
    <button
      className="rounded-md bg-[#042B48] px-4 py-2"
      onClick={(e) => {
        e.preventDefault();
        window.open(
          `${DEEPL_URL}/${editorRef?.current?.getContent({
            format: 'text',
          })}`,
          '_blank',
        );
      }}
    >
      <div className="flex gap-2">
        <DeepLLogo />
        <div className="dark:text-dark text-text font-medium">
          {t('write.translateWithDeepL')}
        </div>
      </div>
    </button>
  );
};
