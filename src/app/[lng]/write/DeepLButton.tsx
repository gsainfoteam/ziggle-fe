import Link from 'next/link';

import { PropsWithT } from '@/app/i18next';
import DeepLLogo from '@/assets/logos/deepL.svg';

interface DeepLButtonProps {
  query?: string;
}

const DeepLButton = ({ query = '', t }: PropsWithT<DeepLButtonProps>) => {
  const DEEPL_URL = 'https://www.deepl.com/translator#ko/en';

  return (
    <Link
      href={`${DEEPL_URL}/${query.replaceAll('/', '\\/')}`}
      className="rounded-md bg-[#042B48] px-4 py-2"
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
