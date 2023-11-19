import Link from 'next/link';
import { Editor as TinyMCEEditorRef } from 'tinymce';

import { T } from '@/app/i18next';
import DeepLLogo from '@/assets/logos/deepL.svg';

interface DeepLButtonProps {
  query?: string;
  editorRef?: React.MutableRefObject<TinyMCEEditorRef | null>;
}

const DeepLButton = ({ editorRef, t }: DeepLButtonProps & { t: T }) => {
  const DEEPL_URL = 'https://www.deepl.com/translator#ko/en';

  return (
    <Link
      href={`${DEEPL_URL}/${editorRef?.current?.getContent({
        format: 'text',
      })}`}
      className="rounded-md bg-[#042B48] px-4 py-2"
      target={'_blank'}
    >
      <div className="flex gap-2">
        <DeepLLogo />
        <div className="font-medium text-white">
          {t('write.translateWithDeepL')}
        </div>
      </div>
    </Link>
  );
};

export default DeepLButton;
