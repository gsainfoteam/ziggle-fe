import { type LinkProps, linkOptions } from '@tanstack/react-router';

import {
  BellIcon,
  ChatCircleDotsIcon,
  ClockIcon,
  ConfettiIcon,
  FlameIcon,
  GraduationCapIcon,
  HourglassMediumIcon,
  MagnifyingGlassIcon,
  MegaphoneSimpleIcon,
  UserListIcon,
  UsersFourIcon,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Category } from '@/features/notice/models';

export type Feed = 'recent' | 'deadline' | 'popular' | 'my' | 'reminded';

export interface NavRowItem {
  title: string;
  Icon: ReactNode;
  ActiveIcon: ReactNode;
  link: LinkProps;
}

export interface NoticeNavItem extends NavRowItem {
  orderBy: 'recent' | 'deadline' | 'hot';
  my?: 'own' | 'reminders';
  apiCategory?: Category;
}

export const useNoticeNav = () => {
  const { t } = useTranslation('notice');

  return {
    search: {
      title: t('sidebar.search'),
      Icon: <MagnifyingGlassIcon />,
      ActiveIcon: <MagnifyingGlassIcon weight="bold" />,
      link: linkOptions({ to: '/search' }),
    } satisfies NavRowItem,

    feeds: {
      recent: {
        title: t('sidebar.home'),
        Icon: <ClockIcon />,
        ActiveIcon: <ClockIcon weight="fill" />,
        orderBy: 'recent',
        link: linkOptions({ to: '/recent' }),
      },
      deadline: {
        title: t('sidebar.urgent'),
        Icon: <HourglassMediumIcon />,
        ActiveIcon: <HourglassMediumIcon weight="fill" />,
        orderBy: 'deadline',
        link: linkOptions({ to: '/deadline' }),
      },
      popular: {
        title: t('sidebar.popular'),
        Icon: <FlameIcon />,
        ActiveIcon: <FlameIcon weight="fill" />,
        orderBy: 'hot',
        link: linkOptions({ to: '/popular' }),
      },
      my: {
        title: t('sidebar.my_notice'),
        Icon: <UserListIcon />,
        ActiveIcon: <UserListIcon weight="fill" />,
        orderBy: 'recent',
        my: 'own',
        link: linkOptions({ to: '/my' }),
      },
      reminded: {
        title: t('sidebar.remind_notice'),
        Icon: <BellIcon />,
        ActiveIcon: <BellIcon weight="fill" />,
        orderBy: 'recent',
        my: 'reminders',
        link: linkOptions({ to: '/reminded' }),
      },
    } satisfies Record<Feed, NoticeNavItem>,

    categories: {
      [Category.RECRUIT]: {
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
