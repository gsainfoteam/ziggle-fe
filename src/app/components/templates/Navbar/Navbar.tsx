import Link from 'next/link';

import { auth } from '@/api/auth/auth';
import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/atoms/Analytics';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import AccountIcon from '@/assets/icons/account.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import SearchIcon from '@/assets/icons/search.svg';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg';

import Button from '../../atoms/Button';
import SearchBar from '../../molecules/searchBar/SearchBar';

const Navbar = async ({ lng }: PropsWithLng) => {
  const { t } = await createTranslation(lng);
  let user = await auth();
  // user = { ...user, name: '홍길동' };
  const nav = (
    <>
      <Analytics event={LogEvents.navBarClickAll}>
        <Link href={`/${lng}/section/all`}>{t('navbar.all')}</Link>
      </Analytics>
      {user && (
        <Analytics event={LogEvents.navBarClickWrite}>
          <Link href={`/${lng}/write`}>{t('navbar.write')}</Link>
        </Analytics>
      )}
      <Analytics event={LogEvents.navBarClickSearch}>
        <Link href={`/${lng}/search`} className="flex items-center gap-x-1">
          <SearchIcon className="w-5 md:w-7" />
          {t('navbar.query')}
        </Link>
      </Analytics>
    </>
  );

  return (
    <header className="flex w-full items-center justify-between bg-white py-[8px] pl-[8px] pr-[5px] text-black md:px-[16px]">
      <div className="relative flex w-full items-center justify-between">
        <Analytics event={LogEvents.navBarClickLogo}>
          <Link href={`/${lng}`}>
            <ZiggleLogo className="hidden h-[31px] md:flex" />
            <ZiggleCompactLogo className="h-[31px] md:hidden" />
          </Link>
        </Analytics>
        <Analytics event={LogEvents.navBarClickSearch}>
          <SearchBar lng={lng} />
        </Analytics>
      </div>
      <div className="flex justify-end">
        <Button className="flex h-[50px] w-[50px] items-center justify-center overflow-clip rounded-[10px] md:hidden">
          <MenuIcon className="h-[24px] stroke-black md:hidden" />
        </Button>
        <Analytics
          event={
            user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin
          }
        >
          <Link
            href={user ? `${lng}/mypage` : `${lng}/login`}
            className="hidden h-[50px] items-center justify-center gap-[8px] md:flex"
          >
            <AccountIcon className="flex h-[24px]" />
            <div className="whitespace-nowrap align-middle font-medium text-primary">
              {user ? user.name : '로그인'}
            </div>
          </Link>
        </Analytics>
      </div>
    </header>
  );
};

export default Navbar;
