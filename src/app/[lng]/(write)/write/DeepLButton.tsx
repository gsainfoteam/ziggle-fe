import Link from 'next/link';
import { Editor as TinyMCEEditorRef } from 'tinymce';

import { PropsWithT } from '@/app/i18next';
import DeepLLogo from '@/assets/logos/deepL.svg';

interface DeepLButtonProps {
  query?: string;
  editorRef?: React.MutableRefObject<TinyMCEEditorRef | null>;
  originalLanguage: 'korean' | 'english';
}

const DeepLButton = ({
  editorRef,
  originalLanguage,
  t,
}: PropsWithT<DeepLButtonProps>) => {
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
        <div className="dark:text-dark font-medium text-text">
          {t('write.translateWithDeepL')}
        </div>
      </div>
    </button>
  );
};

export default DeepLButton;
