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
