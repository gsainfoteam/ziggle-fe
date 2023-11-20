import Link from 'next/link';

import { T } from '@/app/i18next';
import DeepLLogo from '@/assets/logos/deepL.svg';

interface DeepLButtonProps {
  query?: string;
}

const DeepLButton = ({ query = '', t }: DeepLButtonProps & { t: T }) => {
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