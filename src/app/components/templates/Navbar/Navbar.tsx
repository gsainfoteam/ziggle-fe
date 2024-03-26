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

const Navbar = async ({ lng }: PropsWithLng) => {
  const { t } = await createTranslation(lng);
  const user = await auth();
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
      <Analytics event={LogEvents.navBarClickLogo}>
        <Link href={`/${lng}`}>
          <ZiggleLogo className="hidden h-[31px] md:flex" />
          <ZiggleCompactLogo className="h-[31px] md:hidden" />
        </Link>
      </Analytics>
      <div className="flex flex-row">
        <Button className="flex h-[50px] w-[50px] items-center justify-center">
          <SearchIcon className="h-[24px] fill-black md:hidden" />
        </Button>
        <Button className="flex h-[50px] w-[50px] items-center justify-center">
          <MenuIcon className="h-[24px] md:hidden" />
        </Button>
        <Button className="flex h-[50px] items-center justify-center">
          <AccountIcon className="flex h-[24px]" />
          <div className="font-medium text-primary">로그인</div>
        </Button>
      </div>
      {/* <div className="flex items-center justify-between"> */}
      {/* <nav className="hidden gap-x-8 text-lg font-bold md:flex">{nav}</nav> */}
      {/* {user ? (
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
        )} */}
      {/* </div> */}
      {/* <nav className="flex gap-x-8 text-sm font-bold md:hidden">{nav}</nav> */}
    </header>
  );
};

export default Navbar;
