import { useTranslation } from 'react-i18next';

import LangEnFull from '@/assets/icons/lang-en-full.svg?react';
import LangEn from '@/assets/icons/lang-en.svg?react';
import LangFull from '@/assets/icons/lang-full.svg?react';
import LangKoFull from '@/assets/icons/lang-ko-full.svg?react';
import LangKo from '@/assets/icons/lang-ko.svg?react';
import Lang from '@/assets/icons/lang.svg?react';
import { Popover } from '@/common/components';

export const ChangeLanguageBox = () => {
  const { t, i18n } = useTranslation('layout');

  const switchLanguage = (index: number) => {
    const newLang = index === 0 ? 'ko' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Popover.Root
      items={[
        // 의도적으로 i18n을 사용하지 않음
        { icon: LangKo, boldIcon: LangKoFull, label: '한국어' },
        { icon: LangEn, boldIcon: LangEnFull, label: 'English' },
      ]}
      selectedIndex={i18n.language === 'ko' ? 0 : 1}
      onSelect={switchLanguage}
      placement="bottom"
      offsetValue={8}
    >
      <Popover.Trigger
        icon={Lang}
        boldIcon={LangFull}
        label={t('sidebar.language')}
        isSelected={false}
      />
    </Popover.Root>
  );
};
