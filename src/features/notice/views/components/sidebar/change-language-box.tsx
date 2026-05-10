import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import LangEnFull from '@/assets/icons/lang-en-full.svg?react';
import LangEn from '@/assets/icons/lang-en.svg?react';
import LangFull from '@/assets/icons/lang-full.svg?react';
import LangKoFull from '@/assets/icons/lang-ko-full.svg?react';
import LangKo from '@/assets/icons/lang-ko.svg?react';
import Lang from '@/assets/icons/lang.svg?react';
import { Popover } from '@/common/components';
import { cn } from '@/common/utils';

type Language = 'ko' | 'en';

interface LanguageItem {
  value: Language;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  boldIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const items: LanguageItem[] = [
  // 의도적으로 i18n을 사용하지 않음
  { value: 'ko', icon: LangKo, boldIcon: LangKoFull, label: '한국어' },
  { value: 'en', icon: LangEn, boldIcon: LangEnFull, label: 'English' },
];

export const ChangeLanguageBox = () => {
  const { t, i18n } = useTranslation('layout');

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          setAnchor(event.currentTarget);
          setIsOpen((value) => !value);
        }}
        aria-expanded={isOpen}
        className={cn(
          'focus-visible:ring-primary dark:hover:bg-dark_grey flex w-48 items-center gap-5 rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          isOpen && 'bg-greyLight dark:bg-dark_greyDark',
        )}
      >
        <span className="w-6">{isOpen ? <LangFull /> : <Lang />}</span>
        <span className={isOpen ? 'font-semibold' : 'font-normal'}>
          {t('sidebar.language')}
        </span>
      </button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement="bottom-start"
      >
        <Popover.Body className="flex flex-col p-1.5">
          {items.map((item) => {
            const isSelected = i18n.language === item.value;
            const Icon = isSelected ? item.boldIcon : item.icon;
            return (
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                key={item.value}
                onClick={() => {
                  i18n.changeLanguage(item.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'focus-visible:ring-primary dark:hover:bg-dark_grey flex w-full cursor-pointer items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:ring-2 focus-visible:outline-none',
                  isSelected && 'bg-greyLight dark:bg-dark_greyDark',
                )}
              >
                <span className="w-6">
                  <Icon />
                </span>
                <span
                  className={cn(
                    'ml-4',
                    isSelected ? 'font-semibold' : 'font-normal',
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </Popover.Body>
      </Popover.Root>
    </>
  );
};
