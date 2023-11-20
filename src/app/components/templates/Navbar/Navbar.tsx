import Link from 'next/link';

import { auth } from '@/api/auth/auth';
import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/atoms/Analytics';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import AccountIcon from '@/assets/icons/account.svg';
import SearchIcon from '@/assets/icons/search.svg';
import ZiggleEnglishLogo from '@/assets/logos/ziggle-en.svg';
import ZiggleKoreanLogo from '@/assets/logos/ziggle-ko.svg';

import LanguageSwitcher from './LanguageSwitcher';

const Navbar = async ({ lng }: PropsWithLng) => {
  const { t } = await createTranslation(lng, 'translation');
  const user = await auth();
  const nav = (
    <>
      <Analytics event={LogEvents.navBarClickAll}>
        <Link href={`/${lng}/section/all`}>{t('navbar.all')}</Link>
      </Analytics>
      <Analytics event={LogEvents.navBarClickWrite}>
        <Link href={`/${lng}/write`}>{t('navbar.write')}</Link>
      </Analytics>
      <Analytics event={LogEvents.navBarClickSearch}>
        <Link href={`/${lng}/search`} className="flex items-center gap-x-1">
          <SearchIcon className="w-5 md:w-7" />
          {t('navbar.query')}
        </Link>
      </Analytics>
    </>
  );
  return (
    <header className="bg-primary px-4 py-2 text-white md:py-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Analytics event={LogEvents.navBarClickLogo}>
            <Link href={`/${lng}`}>
              {lng === 'ko' ? (
                <ZiggleKoreanLogo className="h-15 md:w-auto" />
              ) : (
                <ZiggleEnglishLogo className="h-15 md:w-auto" />
              )}
            </Link>
          </Analytics>
          <LanguageSwitcher />
        </div>
        <nav className="hidden gap-x-8 text-lg font-bold md:flex">{nav}</nav>
        {user ? (
          <Link
            href={`/${lng}/mypage`}
            className="flex items-center gap-x-1 font-bold"
          >
            {user.name}
            <AccountIcon width="1.6rem" height="1.6rem" />
          </Link>
        ) : (
          <Link
            href={`/${lng}/login`}
            className="flex items-center gap-x-1 font-bold"
          >
            {t('navbar.login')}
            <AccountIcon width="1.6rem" height="1.6rem" />
          </Link>
        )}
      </div>
      <nav className="flex gap-x-8 text-sm font-bold md:hidden">{nav}</nav>
    </header>
  );
};

export default Navbar;
