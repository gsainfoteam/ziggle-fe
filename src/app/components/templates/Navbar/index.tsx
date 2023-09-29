import ZiggleLogo from '@/assets/logos/ziggle.svg';
import SearchIcon from '@/assets/icons/search.svg';
import AccountIcon from '@/assets/icons/account.svg';
import Link from 'next/link';
import Analytics from '../../atoms/Analytics';
import LogEvents from '@/api/log/log-events';

const Navbar = () => {
  return (
    <header className="bg-primary px-4 py-0.5 flex justify-between items-center text-white">
      <Analytics event={LogEvents.navBarClickLogo}>
        <Link href="/">
          <ZiggleLogo />
        </Link>
      </Analytics>
      <div className="flex gap-x-8 font-bold text-lg">
        <Analytics event={LogEvents.navBarClickAll}>
          <Link href="/section/all">전체 공지</Link>
        </Analytics>
        <Analytics event={LogEvents.navBarClickSearch}>
          <Link href="/search" className="flex items-center gap-x-1">
            <SearchIcon width="1.6rem" height="1.6rem" />
            공지 검색
          </Link>
        </Analytics>
      </div>
      <Link href="/" className="flex items-center gap-x-1 font-bold">
        로그인
        <AccountIcon width="1.6rem" height="1.6rem" />
      </Link>
    </header>
  );
};

export default Navbar;
