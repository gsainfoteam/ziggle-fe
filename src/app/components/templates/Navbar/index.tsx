import ZiggleLogo from '@/assets/logos/ziggle.svg';
import SearchIcon from '@/assets/icons/search.svg';
import AccountIcon from '@/assets/icons/account.svg';
import Link from 'next/link';
import Analytics from '../../atoms/Analytics';
import LogEvents from '@/api/log/log-events';
import { T } from '@/app/i18next';
import { Locale, fallbackLng } from '@/app/i18next/settings';

const Navbar = ({ lng = fallbackLng, t }: { lng?: Locale; t: T }) => {
  return (
    <header className="bg-primary px-4 py-0.5 flex justify-between items-center text-white">
      <Analytics event={LogEvents.navBarClickLogo}>
        <Link href={`/${lng}`}>
          <ZiggleLogo />
        </Link>
      </Analytics>
      <div className="flex gap-x-8 font-bold text-lg">
        <Analytics event={LogEvents.navBarClickAll}>
          <Link href={`/${lng}/section/all`}>{t('navbar.all')}</Link>
        </Analytics>
        <Analytics event={LogEvents.navBarClickSearch}>
          <Link href={`/${lng}/search`} className="flex items-center gap-x-1">
            <SearchIcon width="1.6rem" height="1.6rem" />
            {t('navbar.query')}
          </Link>
        </Analytics>
      </div>
      <Link href={`/${lng}`} className="flex items-center gap-x-1 font-bold">
        {t('navbar.login')}
        <AccountIcon width="1.6rem" height="1.6rem" />
      </Link>
    </header>
  );
};

export default Navbar;
