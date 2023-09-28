import ZiggleLogo from '@/assets/logos/ziggle.svg';
import SearchIcon from '@/assets/icons/search.svg';
import AccountIcon from '@/assets/icons/account.svg';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-primary px-4 py-0.5 flex justify-between items-center text-white">
      <Link href="/">
        <ZiggleLogo />
      </Link>
      <div className="flex gap-x-8 font-bold text-lg">
        <Link href="/section/all">전체 공지</Link>
        <Link href="/search" className="flex items-center gap-x-1">
          <SearchIcon width="1.6rem" height="1.6rem" />
          공지 검색
        </Link>
      </div>
      <Link href="/" className="flex items-center gap-x-1 font-bold">
        로그인
        <AccountIcon width="1.6rem" height="1.6rem" />
      </Link>
    </header>
  );
};

export default Navbar;
