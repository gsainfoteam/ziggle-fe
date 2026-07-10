import { type LinkProps, linkOptions } from '@tanstack/react-router';

import {
  BookmarkSimpleIcon,
  ChatCircleDotsIcon,
  ConfettiIcon,
  FlameIcon,
  GraduationCapIcon,
  HourglassMediumIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  MegaphoneSimpleIcon,
  NewspaperIcon,
  UserListIcon,
  UsersFourIcon,
} from '@phosphor-icons/react';
import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Category,
  categoryPanelKey,
  feedPanelKey,
  HOME_PANEL_KEY,
  type My,
  type OrderBy,
} from '@/features/notice/viewmodels';

export type Feed = 'recent' | 'deadline' | 'popular' | 'my' | 'bookmarked';

export interface NavRowItem {
  title: string;
  Icon: ReactNode;
  ActiveIcon: ReactNode;
  link: LinkProps;
}

export interface NoticeNavItem extends NavRowItem {
  key: string;
  orderBy: OrderBy;
  my?: My;
  apiCategory?: Category;
}

export const useNoticeNav = () => {
  const { t } = useTranslation('notice');

  return {
    home: {
      title: t('sidebar.home'),
      Icon: <HouseIcon />,
      ActiveIcon: <HouseIcon weight="fill" />,
      link: linkOptions({ to: '/home' }),
    } satisfies NavRowItem,

    search: {
      title: t('sidebar.search'),
      Icon: <MagnifyingGlassIcon />,
      ActiveIcon: <MagnifyingGlassIcon weight="bold" />,
      link: linkOptions({ to: '/search' }),
    } satisfies NavRowItem,

    feeds: {
      recent: {
        key: HOME_PANEL_KEY,
        title: t('sidebar.notices'),
        Icon: <NewspaperIcon />,
        ActiveIcon: <NewspaperIcon weight="fill" />,
        orderBy: 'recent',
        link: linkOptions({ to: '/home' }),
      },
      deadline: {
        key: feedPanelKey('deadline'),
        title: t('sidebar.urgent'),
        Icon: <HourglassMediumIcon />,
        ActiveIcon: <HourglassMediumIcon weight="fill" />,
        orderBy: 'deadline',
        link: linkOptions({ to: '/deadline' }),
      },
      popular: {
        key: feedPanelKey('popular'),
        title: t('sidebar.popular'),
        Icon: <FlameIcon />,
        ActiveIcon: <FlameIcon weight="fill" />,
        orderBy: 'hot',
        link: linkOptions({ to: '/popular' }),
      },
      my: {
        key: feedPanelKey('my'),
        title: t('sidebar.my_notice'),
        Icon: <UserListIcon />,
        ActiveIcon: <UserListIcon weight="fill" />,
        orderBy: 'recent',
        my: 'own',
        link: linkOptions({ to: '/my' }),
      },
      bookmarked: {
        key: feedPanelKey('bookmarked'),
        title: t('sidebar.bookmark_notice'),
        Icon: <BookmarkSimpleIcon />,
        ActiveIcon: <BookmarkSimpleIcon weight="fill" />,
        orderBy: 'recent',
        my: 'bookmarked',
        link: linkOptions({ to: '/bookmarked' }),
      },
    } satisfies Record<Feed, NoticeNavItem>,

    categories: {
      [Category.RECRUIT]: {
        key: categoryPanelKey(Category.RECRUIT),
        title: t('sidebar.recruit'),
        Icon: <MegaphoneSimpleIcon />,
        ActiveIcon: <MegaphoneSimpleIcon weight="fill" />,
        orderBy: 'recent',
        apiCategory: Category.RECRUIT,
        link: linkOptions({
          to: '/$category',
          params: { category: Category.RECRUIT },
        }),
      },
      [Category.EVENT]: {
        key: categoryPanelKey(Category.EVENT),
        title: t('sidebar.event'),
        Icon: <ConfettiIcon />,
        ActiveIcon: <ConfettiIcon weight="fill" />,
        orderBy: 'recent',
        apiCategory: Category.EVENT,
        link: linkOptions({
          to: '/$category',
          params: { category: Category.EVENT },
        }),
      },
      [Category.CLUB]: {
        key: categoryPanelKey(Category.CLUB),
        title: t('sidebar.club'),
        Icon: <UsersFourIcon />,
        ActiveIcon: <UsersFourIcon weight="fill" />,
        orderBy: 'recent',
        apiCategory: Category.CLUB,
        link: linkOptions({
          to: '/$category',
          params: { category: Category.CLUB },
        }),
      },
      [Category.ETC]: {
        key: categoryPanelKey(Category.ETC),
        title: t('sidebar.general'),
        Icon: <ChatCircleDotsIcon />,
        ActiveIcon: <ChatCircleDotsIcon weight="fill" />,
        orderBy: 'recent',
        apiCategory: Category.ETC,
        link: linkOptions({
          to: '/$category',
          params: { category: Category.ETC },
        }),
      },
      [Category.ACADEMIC]: {
        key: categoryPanelKey(Category.ACADEMIC),
        title: t('sidebar.academic'),
        Icon: <GraduationCapIcon />,
        ActiveIcon: <GraduationCapIcon weight="fill" />,
        orderBy: 'recent',
        apiCategory: Category.ACADEMIC,
        link: linkOptions({
          to: '/$category',
          params: { category: Category.ACADEMIC },
        }),
      },
    } satisfies Record<Category, NoticeNavItem>,
  };
};

export const usePinnablePanels = (): NoticeNavItem[] => {
  const nav = useNoticeNav();
  return useMemo(
    () => [...Object.values(nav.feeds), ...Object.values(nav.categories)],
    [nav],
  );
};

export const useNavItemByKey = () => {
  const panels = usePinnablePanels();
  return useMemo(() => {
    const byKey = new Map(panels.map((item) => [item.key, item]));
    return (key: string) => byKey.get(key);
  }, [panels]);
};
