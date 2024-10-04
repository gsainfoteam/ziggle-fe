'use client';

import { usePathname, useRouter } from 'next/navigation';

import { PropsWithLng } from '@/app/i18next';
import LocaleToggleButtonEnglish from '@/assets/icons/locale-btn-en.svg';
import LocaleToggleButtonKorean from '@/assets/icons/locale-btn-ko.svg';

import Button from '../../shared/Button';

const LanguageSwitcher = ({ lng }: PropsWithLng) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const switchLanguage = () => {
    push(
      `/${lng === 'en' ? 'ko' : 'en'}/${pathname
        .split('/')
        .slice(2)
        .join('/')}`,
    );
  };

  return (
    <Button onClick={switchLanguage}>
      {lng === 'ko' ? (
        <LocaleToggleButtonKorean className="w-13 md:w-auto" />
      ) : (
        <LocaleToggleButtonEnglish className="w-13 md:w-auto" />
      )}
    </Button>
  );
};

export default LanguageSwitcher;
