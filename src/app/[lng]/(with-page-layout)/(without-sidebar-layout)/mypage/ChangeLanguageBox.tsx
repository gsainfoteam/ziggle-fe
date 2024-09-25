'use client';

import { usePathname, useRouter } from 'next/navigation';

import Toggle from '@/app/components/shared/Toggle/Toggle';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

const ChangeLanguageBox = ({ lng }: PropsWithLng) => {
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

  const { t } = useTranslation(lng);

  return (
    <MypageBox>
      <div className="flex justify-between self-stretch">
        <div className="flex text-greyDark dark:text-dark_white">
          {t('mypage.switchLanguage')}
        </div>
        <Toggle isSwitched={lng === 'en'} onSwitch={switchLanguage} />
      </div>
    </MypageBox>
  );
};

export default ChangeLanguageBox;
