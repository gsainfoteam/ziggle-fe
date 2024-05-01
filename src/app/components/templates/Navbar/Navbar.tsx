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
  const user = await auth();

  return (
    <header className="flex w-full items-center justify-between bg-white py-3 pl-2 pr-1 text-text md:px-4 md:py-2">
      <div className="relative flex h-full w-full items-center justify-between">
        <Analytics event={LogEvents.navBarClickLogo}>
          <Link href={`/${lng}`}>
            <ZiggleLogo className="hidden h-8 overflow-visible md:flex" />
            <ZiggleCompactLogo className="h-8 overflow-visible md:hidden" />
          </Link>
        </Analytics>
        <div className="flex h-full items-center md:w-full">
          <SearchBar lng={lng} />
          <Button className="flex h-full w-12 items-center justify-center overflow-clip rounded-md md:hidden md:h-full">
            <MenuIcon className="h-6 stroke-text md:hidden" />
          </Button>
        </div>
      </div>
      <Analytics
        event={user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin}
      >
        <Link
          href={user ? `/mypage` : `/login`}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {user ? user.name : t('navbar.login')}
          </div>
        </Link>
      </Analytics>
    </header>
  );
};

export default Navbar;
