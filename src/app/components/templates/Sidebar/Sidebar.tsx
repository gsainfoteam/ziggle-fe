'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import { sidebarObject } from './sidebarObject';

interface NavButtonProps {
  title: string;
  icon: React.ReactNode;
  boldIcon: React.ReactNode;
  isSelected: boolean;
  to: string;
}

const NavButton = ({
  title,
  icon,
  boldIcon,
  isSelected,
  to,
}: NavButtonProps) => {
  return (
    <Link
      href={to}
      className={
        'flex w-48 items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none dark:hover:bg-dark_grey' +
        ' ' +
        (isSelected ? 'bg-greyLight dark:bg-dark_greyDark' : '')
      }
    >
      <span className="w-6">{isSelected ? boldIcon : icon}</span>
      <span
        className={
          'ml-4' + ' ' + (isSelected ? 'font-semibold' : 'font-normal')
        }
      >
        {title}
      </span>
    </Link>
  );
};

const Sidebar = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  const path = usePathname();

  const { data: userData } = useSession();

  return (
    <>
      {sidebarObject.map((group, i) => (
        <React.Fragment key={i}>
          <ul className="flex flex-col gap-y-2">
            {group
              .filter((menu) => (!userData ? !menu.needAuth : menu))
              .map((menu, i) => (
                <li key={i} className="flex flex-row">
                  <NavButton
                    icon={
                      <menu.icons.regular className="stroke-text dark:stroke-dark_white" />
                    }
                    boldIcon={
                      <menu.icons.bold className="fill-text stroke-text dark:fill-dark_white dark:stroke-none" />
                    }
                    title={t(menu.title)}
                    isSelected={path.startsWith(`/${lng}/${menu.path}`)}
                    to={`/${lng}/${menu.path}`}
                  />
                </li>
              ))}
          </ul>
          {!(sidebarObject.length - 1 === i) && (
            <div className="my-[15px] h-[1px] bg-greyLight dark:bg-dark_greyDark" />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default Sidebar;
