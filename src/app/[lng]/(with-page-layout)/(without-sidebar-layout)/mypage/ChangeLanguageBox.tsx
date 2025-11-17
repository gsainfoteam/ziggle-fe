'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Popover } from '@/app/components/shared/Popover';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import Lang from '@/assets/icons/lang.svg';
import LangEn from '@/assets/icons/lang-en.svg';
import LangEnFull from '@/assets/icons/lang-en-full.svg';
import LangFull from '@/assets/icons/lang-full.svg';
import LangKo from '@/assets/icons/lang-ko.svg';
import LangKoFull from '@/assets/icons/lang-ko-full.svg';

const ChangeLanguageBox = ({ lng }: PropsWithLng) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { t } = useTranslation(lng);

  const switchLanguage = (index: number) => {
    const newLang = index === 0 ? 'ko' : 'en';
    push(`/${newLang}/${pathname.split('/').slice(2).join('/')}`);
  };

  return (
    <Popover
      items={[
        // 의도적으로 i18n을 사용하지 않음
        { icon: LangKo, boldIcon: LangKoFull, label: '한국어' },
        { icon: LangEn, boldIcon: LangEnFull, label: 'English' },
      ]}
      selectedIndex={lng === 'ko' ? 0 : 1}
      onSelect={switchLanguage}
      placement="top"
      offsetValue={8}
    >
      <Popover.Trigger
        icon={Lang}
        boldIcon={LangFull}
        label={t('sidebar.language')}
        isSelected={false}
      />
    </Popover>
  );
};

export default ChangeLanguageBox;
