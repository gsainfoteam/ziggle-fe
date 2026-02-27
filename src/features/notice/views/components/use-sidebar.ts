import { useTranslation } from 'react-i18next';

import Bell from '@/assets/icons/bell.svg?react';
import BoldBell from '@/assets/icons/bold-bell.svg?react';
import BoldCommunity from '@/assets/icons/bold-community.svg?react';
import BoldFire from '@/assets/icons/bold-fire.svg?react';
import BoldFlower from '@/assets/icons/bold-flower.svg?react';
import BoldHome from '@/assets/icons/bold-home.svg?react';
import BoldMessageAlert from '@/assets/icons/bold-message-alert.svg?react';
import BoldOpenBook from '@/assets/icons/bold-open-book.svg?react';
import Community from '@/assets/icons/community.svg?react';
import EditPencil from '@/assets/icons/edit-pencil.svg?react';
import Fire from '@/assets/icons/fire.svg?react';
import Flower from '@/assets/icons/flower.svg?react';
import Home from '@/assets/icons/home.svg?react';
import MessageAlert from '@/assets/icons/message-alert.svg?react';
import OpenBook from '@/assets/icons/open-book.svg?react';

type MenuPath =
  | 'recruit'
  | 'event'
  | 'general'
  | 'academic'
  | 'etc'
  | 'home'
  | 'deadline'
  | 'zigglepick'
  | 'write'
  | 'group'
  | 'own'
  | 'reminded';
type LogKey =
  | 'home'
  | 'urgent'
  | 'zigglepick'
  | 'recruit'
  | 'event'
  | 'general'
  | 'academic'
  | 'write'
  | 'myNotice'
  | 'reminded';
export interface SidebarObject {
  key: LogKey;
  title: string;
  path: MenuPath;
  icons: {
    regular: React.FC<React.SVGProps<SVGSVGElement>>;
    bold: React.FC<React.SVGProps<SVGSVGElement>>;
  };
  noticeSearchParams?: {
    orderBy: 'recent' | 'deadline' | 'hot';
    category?: 'RECRUIT' | 'EVENT' | 'ETC' | 'ACADEMIC';
    my?: 'own' | 'reminders';
  };
  needAuth?: boolean;
}

export const useSidebarObject = () => {
  const { t } = useTranslation('notice');
  return [
    [
      {
        key: 'home',
        title: t('sidebar.home'),
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
        key: 'urgent',
        title: t('sidebar.urgent'),
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
        key: 'zigglepick',
        title: t('sidebar.zigglepick'),
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
        key: 'recruit',
        title: t('sidebar.recruit'),
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
        key: 'event',
        title: t('sidebar.event'),
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
        key: 'general',
        title: t('sidebar.general'),
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
        key: 'academic',
        title: t('sidebar.academic'),
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
        key: 'write',
        title: t('sidebar.write'),
        path: 'write',
        icons: {
          regular: EditPencil,
          bold: EditPencil,
        },
      },
      {
        key: 'myNotice',
        title: t('mypage.myNotice'),
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
        key: 'reminded',
        title: t('mypage.remindNotice'),
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
    ],
  ] satisfies SidebarObject[][];
};
