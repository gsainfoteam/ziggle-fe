'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from '@/app/i18next/client';
import LocaleToggleButtonEnglish from '@/assets/locale-btn-en.svg';
import LocaleToggleButtonKorean from '@/assets/locale-btn-ko.svg';

import Button from '../../atoms/Button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const { push } = useRouter();

  const switchLanguage = () => {
    push(
      `/${i18n.language === 'en' ? 'ko' : 'en'}/${pathname
        .split('/')
        .slice(2)
        .join('/')}`,
    );
  };

  return (
    <Button onClick={switchLanguage}>
      {i18n.language === 'ko' ? (
        <LocaleToggleButtonKorean className="w-13 md:w-auto" />
      ) : (
        <LocaleToggleButtonEnglish className="w-13 md:w-auto" />
      )}
    </Button>
  );
};

export default LanguageSwitcher;
