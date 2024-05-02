'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PropsWithLng } from '@/app/i18next';
import Bell from '@/assets/icons/bell.svg';
import BoldBell from '@/assets/icons/bold-bell.svg';
import BoldCommunity from '@/assets/icons/bold-community.svg';
import BoldFlower from '@/assets/icons/bold-flower.svg';
import BoldHome from '@/assets/icons/bold-home.svg';
import BoldMessageAlert from '@/assets/icons/bold-message-alert.svg';
import BoldOpenBook from '@/assets/icons/bold-open-book.svg';
import ColorFilter from '@/assets/icons/color-filter.svg';
import Community from '@/assets/icons/community.svg';
import EditPencil from '@/assets/icons/edit-pencil.svg';
import FireFlame from '@/assets/icons/fire-flame.svg';
import Flower from '@/assets/icons/flower.svg';
import Home from '@/assets/icons/home.svg';
import MessageAlert from '@/assets/icons/message-alert.svg';
import OpenBook from '@/assets/icons/open-book.svg';

const sidebar_object = [{}];

const NavButton = ({
  title,
  icon,
  boldIcon,
}: {
  title: string;
  icon: React.ReactNode;
  boldIcon: React.ReactNode;
}) => {
  const pathname = usePathname();

  const currentIcon = pathname === '/bold' ? boldIcon : icon;
  return (
    <Link
      href="/"
      className="flex w-48 items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none"
    >
      {currentIcon}
      <span className="ml-4">{title}</span>
    </Link>
  );
};

const Sidebar = ({ lng }: PropsWithLng) => {
  return (
    <ul className="flex flex-col space-y-2">
      <li className="flex flex-row">
        <NavButton icon={<Home />} boldIcon={<BoldHome />} title="홈" />
      </li>

      <li className="flex flex-row">
        <NavButton icon={<Bell />} boldIcon={<BoldBell />} title="마감임박" />
      </li>

      <li className="flex flex-row">
        <NavButton
          icon={<FireFlame />}
          boldIcon={<BoldHome />}
          title="지글픽"
        />
      </li>
      <li>
        <div></div>
      </li>
      <li className="flex flex-row">
        <NavButton
          icon={<Community />}
          boldIcon={<BoldCommunity />}
          title="모집"
        />
      </li>
      <li className="flex flex-row">
        <NavButton icon={<Flower />} boldIcon={<BoldFlower />} title="행사" />
      </li>
      <li className="flex flex-row">
        <NavButton
          icon={<MessageAlert />}
          boldIcon={<BoldMessageAlert />}
          title="일반"
        />
      </li>
      <li className="flex flex-row">
        <NavButton
          icon={<OpenBook />}
          boldIcon={<BoldOpenBook />}
          title="학사"
        />
      </li>
      <div></div>
      <li className="flex flex-row">
        <NavButton
          icon={<EditPencil />}
          boldIcon={<EditPencil />}
          title="공지작성"
        />
      </li>
      <li className="flex flex-row">
        <NavButton
          icon={<ColorFilter />}
          boldIcon={<ColorFilter />}
          title="그룹"
        />
      </li>
    </ul>
  );
};

export default Sidebar;
