import { ParseKeys } from 'i18next';

import { NoticeSearchParams } from '@/api/notice/notice';
import { HomePath } from '@/app/[lng]/(common)/(needSidebar)/[category]/paths';
import Bell from '@/assets/icons/bell.svg';
import BoldBell from '@/assets/icons/bold-bell.svg';
import BoldCommunity from '@/assets/icons/bold-community.svg';
import BoldFire from '@/assets/icons/bold-fire.svg';
import BoldFlower from '@/assets/icons/bold-flower.svg';
import BoldHome from '@/assets/icons/bold-home.svg';
import BoldMessageAlert from '@/assets/icons/bold-message-alert.svg';
import BoldOpenBook from '@/assets/icons/bold-open-book.svg';
import ColorFilter from '@/assets/icons/color-filter.svg';
import Community from '@/assets/icons/community.svg';
import EditPencil from '@/assets/icons/edit-pencil.svg';
import Fire from '@/assets/icons/fire.svg';
import Flower from '@/assets/icons/flower.svg';
import Home from '@/assets/icons/home.svg';
import MessageAlert from '@/assets/icons/message-alert.svg';
import OpenBook from '@/assets/icons/open-book.svg';

type MenuPath = HomePath | 'write' | 'group' | 'own' | 'reminded';
export interface SidebarObject {
  title: ParseKeys;
  path: MenuPath;
  icons: {
    regular: React.FC<React.SVGProps<SVGSVGElement>>;
    bold: React.FC<React.SVGProps<SVGSVGElement>>;
  };
  noticeSearchParams?: NoticeSearchParams;
  needAuth?: boolean;
}

export const sidebarObject: SidebarObject[][] = [
  [
    {
      title: 'sidebar.home',
      path: 'home',
      icons: {
        regular: Home,
        bold: BoldHome,
      },
      noticeSearchParams: {
        orderBy: 'recent',
      },
    },
    {
      title: 'sidebar.urgent',
      path: 'deadline',
      icons: {
        regular: Bell,
        bold: BoldBell,
      },
      noticeSearchParams: {
        orderBy: 'deadline',
      },
    },
    {
      title: 'sidebar.zigglepick',
      path: 'zigglepick',
      icons: {
        regular: Fire,
        bold: BoldFire,
      },
      noticeSearchParams: {
        orderBy: 'hot',
      },
    },
  ],
  [
    {
      title: 'sidebar.recruit',
      path: 'recruit',
      icons: {
        regular: Community,
        bold: BoldCommunity,
      },
      noticeSearchParams: {
        category: 'RECRUIT',
        orderBy: 'recent',
      },
    },
    {
      title: 'sidebar.event',
      path: 'event',
      icons: {
        regular: Flower,
        bold: BoldFlower,
      },
      noticeSearchParams: {
        category: 'EVENT',
        orderBy: 'recent',
      },
    },
    {
      title: 'sidebar.general',
      path: 'etc',
      icons: {
        regular: MessageAlert,
        bold: BoldMessageAlert,
      },
      noticeSearchParams: {
        category: 'ETC',
        orderBy: 'recent',
      },
    },
    {
      title: 'sidebar.academic',
      path: 'academic',
      icons: {
        regular: OpenBook,
        bold: BoldOpenBook,
      },
      noticeSearchParams: {
        category: 'ACADEMIC',
        orderBy: 'recent',
      },
    },
  ],
  [
    {
      title: 'sidebar.write',
      path: 'write',
      icons: {
        regular: EditPencil,
        bold: EditPencil,
      },
    },
    {
      title: 'mypage.myNotice',
      path: 'own',
      icons: {
        regular: EditPencil,
        bold: EditPencil,
      },
      needAuth: true,
      noticeSearchParams: {
        my: 'own',
        orderBy: 'recent',
      },
    },
    {
      title: 'mypage.remindNotice',
      path: 'reminded',
      icons: {
        regular: Bell,
        bold: BoldBell,
      },
      needAuth: true,
      noticeSearchParams: {
        my: 'reminders',
        orderBy: 'recent',
      },
    },
    // TODO: Add group page
    // {
    //   title: 'sidebar.groups',
    //   path: 'group',
    //   icons: {
    //     regular: ColorFilter,
    //     bold: ColorFilter,
    //   },
    // },
  ],
];
