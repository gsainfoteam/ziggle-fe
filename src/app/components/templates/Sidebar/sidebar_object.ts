import { DefaultNamespace, ParseKeys, TFunction } from 'i18next';

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

export interface SidebarObject {
  title: ParseKeys;
  path: string;
  icons: {
    regular: React.FC<React.SVGProps<SVGSVGElement>>;
    bold: React.FC<React.SVGProps<SVGSVGElement>>;
  };
}

const sidebar_object: SidebarObject[][] = [
  [
    {
      title: 'sidebar.home',
      path: '',
      icons: {
        regular: Home,
        bold: BoldHome,
      },
    },
    {
      title: 'sidebar.urgent',
      path: '/urgent',
      icons: {
        regular: Bell,
        bold: BoldBell,
      },
    },
    {
      title: 'sidebar.zigglepick',
      path: '/zigglepick',
      icons: {
        regular: FireFlame,
        bold: BoldHome,
      },
    },
  ],
  [
    {
      title: 'sidebar.recruit',
      path: '/recruit',
      icons: {
        regular: Community,
        bold: BoldCommunity,
      },
    },
    {
      title: 'sidebar.event',
      path: '/event',
      icons: {
        regular: Flower,
        bold: BoldFlower,
      },
    },
    {
      title: 'sidebar.general',
      path: '/general',
      icons: {
        regular: MessageAlert,
        bold: BoldMessageAlert,
      },
    },
    {
      title: 'sidebar.academic',
      path: '/academic',
      icons: {
        regular: OpenBook,
        bold: BoldOpenBook,
      },
    },
  ],
  [
    {
      title: 'sidebar.write',
      path: '/write',
      icons: {
        regular: EditPencil,
        bold: EditPencil,
      },
    },
    {
      title: 'sidebar.groups',
      path: '/group',
      icons: {
        regular: ColorFilter,
        bold: ColorFilter,
      },
    },
  ],
];

export default sidebar_object;
