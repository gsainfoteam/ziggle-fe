import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { XIcon } from '@phosphor-icons/react';
import { isMobile } from '@/common/utils';

const DISMISSED_KEY = 'app_banner_dismissed';

export function AppBanner() {
  const { t } = useTranslation('common');
  const [showBanner, setShowBanner] = useState(
    () => isMobile() && !localStorage.getItem(DISMISSED_KEY),
  );

  if (!showBanner) return null;

  const redirect = encodeURIComponent(window.location.href);

  return (
    <div className="dark:bg-dark_dark border-greyLight dark:border-dark_greyBorder flex w-full items-center gap-3 border-b bg-white px-4 py-2 shadow-sm">
      <img src="/logo.png" alt={t('app_name')} className="size-10 rounded-xl" />
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-semibold">{t('app_name')}</span>
        <span className="text-greyDark text-xs">
          {t('app_banner.description')}
        </span>
      </div>
      <a
        href={`https://ziggle.gistory.me/app?redirect=${redirect}`}
        className="bg-primary rounded-full px-3 py-1 text-sm font-medium text-white"
      >
        {t('app_banner.get')}
      </a>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(DISMISSED_KEY, '1');
          setShowBanner(false);
        }}
        className="text-greyDark dark:text-dark_grey hover:bg-greyLight dark:hover:bg-dark_greyDark flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors"
        aria-label={t('app_banner.dismiss')}
      >
        <XIcon className="size-5" />
      </button>
    </div>
  );
}
