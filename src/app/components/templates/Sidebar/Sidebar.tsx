'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import sidebarObject from './sidebarObject';

interface NavButtonProps {
  title: string;
  icon: React.ReactNode;
  boldIcon: React.ReactNode;
  isSelected: boolean;
}

const NavButton = ({ title, icon, boldIcon, isSelected }: NavButtonProps) => {
  return (
    <Link
      href="/"
      className={
        'flex w-48 items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none' +
        ' ' +
        (isSelected ? 'bg-greyLight' : '')
      }
    >
      {isSelected ? boldIcon : icon}
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

  return (
    <>
      {sidebarObject.map((group, i) => (
        <>
          <ul key={i} className="flex flex-col gap-y-2">
            {group.map((item, i) => (
              <li key={i} className="flex flex-row">
                <NavButton
                  icon={<item.icons.regular />}
                  boldIcon={<item.icons.bold />}
                  title={t(item.title)}
                  isSelected={path.startsWith(`/${lng}${item.path}`)}
                />
              </li>
            ))}
          </ul>
          {!(sidebarObject.length - 1 === i) && (
            <div className="my-[15px] h-[1px] bg-greyLight" />
          )}
        </>
      ))}
    </>
  );
};

export default Sidebar;
