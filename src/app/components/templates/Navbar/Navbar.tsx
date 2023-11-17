import Link from 'next/link';

import { auth } from '@/api/auth/auth';
import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/atoms/Analytics';
import { T } from '@/app/i18next';
import { fallbackLng, Locale } from '@/app/i18next/settings';
import AccountIcon from '@/assets/icons/account.svg';
import SearchIcon from '@/assets/icons/search.svg';
import ZiggleLogo from '@/assets/logos/ziggle.svg';

const Navbar = async ({ lng = fallbackLng, t }: { lng?: Locale; t: T }) => {
  const user = await auth();
  const nav = (
    <>
      <Analytics event={LogEvents.navBarClickAll}>
        <Link href={`/${lng}/section/all`}>{t('navbar.all')}</Link>
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
    <header className="bg-primary px-4 py-2 md:py-0.5 text-white">
      <div className="flex justify-between items-center">
        <Analytics event={LogEvents.navBarClickLogo}>
          <Link href={`/${lng}`}>
            <ZiggleLogo className="w-20 md:w-auto" />
          </Link>
        </Analytics>
        <nav className="gap-x-8 font-bold text-lg hidden md:flex">{nav}</nav>
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
      <nav className="flex font-bold text-sm gap-x-8 md:hidden">{nav}</nav>
    </header>
  );
};

export default Navbar;
