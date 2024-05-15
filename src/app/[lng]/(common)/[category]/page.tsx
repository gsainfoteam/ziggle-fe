import { ParseKeys } from 'i18next';
import Link from 'next/link';

import { getAllNotices } from '@/api/notice/notice-server';
import Toggle from '@/app/components/atoms/Toggle/Toggle';
import styles from '@/app/components/atoms/Toggle/toggle.module.css';
import Zabo from '@/app/components/organisms/Zabo';
import {
  SidebarObject,
  sidebarObject,
} from '@/app/components/templates/Sidebar/sidebarObject';

import { createTranslation, PropsWithLng } from '../../../i18next';
import { HomePath } from './paths';

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lng, category },
  searchParams,
}: {
  params: PropsWithLng & {
    category: HomePath;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { t } = await createTranslation(lng);

  const sortByDeadline = searchParams?.deadline === 'true' ?? false;

  const { noticeSearchParams, icons, title } =
    sidebarObject.flat(2).find(({ path }) => path === category) ??
    sidebarObject[0][0]; // default to first menu(home)
  const notices = await getAllNotices(
    sortByDeadline
      ? { ...noticeSearchParams, orderBy: 'deadline' }
      : noticeSearchParams,
  );

  return (
    <main className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center">
        {category !== 'home' && (
          <div className="flex w-full flex-row justify-between py-5 font-bold md:max-w-[800px]">
            <div className="flex items-center gap-2 text-4xl text-primary ">
              <icons.bold className="fill-primary stroke-text dark:stroke-none" />
              {t(title)}
            </div>
            {category !== 'deadline' && (
              <div
                className={`flex items-center gap-3 text-lg font-medium ${
                  sortByDeadline
                    ? 'text-primary'
                    : 'text-greyDark dark:text-greyLight'
                }`}
              >
                <Link
                  href={`${category}${sortByDeadline ? '' : '?deadline=true'}`}
                  className="flex rounded-full"
                >
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={sortByDeadline}
                  />
                </Link>
                마감임박 순으로 보기
              </div>
            )}
          </div>
        )}
        <div className="flex w-full flex-col md:max-w-[800px]">
          {...notices.list.map((notice) => (
            <>
              <Zabo key={notice.id} {...notice} lng={lng} />
              <div className="my-[60px] h-[1px] bg-greyLight dark:bg-dark_greyBorder" />
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
