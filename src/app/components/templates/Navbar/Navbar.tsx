import Link from 'next/link';

import { auth } from '@/api/auth/auth';
import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/atoms/Analytics';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import AccountIcon from '@/assets/icons/account.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg';

import Button from '../../atoms/Button';
import SearchBar from '../../molecules/searchBar/SearchBar';

const Navbar = async ({ lng }: PropsWithLng) => {
  const { t } = await createTranslation(lng);
  let user = await auth();

  return (
    <header className="flex h-[50px] w-full items-center justify-between bg-white py-0 pl-[8px] pr-[5px] text-text md:px-[16px] md:py-[8px]">
      <div className="relative flex h-full w-full items-center justify-between">
        <Analytics event={LogEvents.navBarClickLogo}>
          <Link href={`/${lng}`}>
            <ZiggleLogo className="hidden h-[31px] overflow-visible md:flex" />
            <ZiggleCompactLogo className="h-[31px] overflow-visible md:hidden" />
          </Link>
        </Analytics>
        <div className="flex h-full items-center md:w-full">
          <SearchBar lng={lng} />
          <Button className="flex h-full w-[50px] items-center justify-center overflow-clip rounded-[10px] md:hidden md:h-full">
            <MenuIcon className="h-[24px] stroke-text md:hidden" />
          </Button>
        </div>
      </div>
      <Analytics
        event={user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin}
      >
        <Link
          href={user ? `${lng}/mypage` : `${lng}/login`}
          className="hidden items-center justify-center gap-[8px] md:flex"
        >
          <AccountIcon className="flex h-[24px]" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {user ? user.name : t('navbar.login')}
          </div>
        </Link>
      </Analytics>
    </header>
  );
};

export default Navbar;
