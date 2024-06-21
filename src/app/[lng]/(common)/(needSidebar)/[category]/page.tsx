import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import styles from '@/app/components/atoms/Toggle/toggle.module.css';
import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import { sidebarObject } from '@/app/components/templates/Sidebar/sidebarObject';

import { createTranslation, PropsWithLng } from '../../../../i18next';
import CategorizedNotices from './CategorizedNotices';
import { HomePath } from './paths';

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lng, category },
  searchParams,
}: {
  params: PropsWithLng & {
    category: HomePath;
  };
  searchParams?: { deadline: 'true' | 'false'; page: string };
}) {
  const { t } = await createTranslation(lng);

  const sortByDeadline = searchParams?.deadline === 'true' ?? false;
  const page = parseInt(searchParams?.page ?? '');

  if (Number.isNaN(page) || page < 0) {
    redirect(
      `/${lng}/${category}?page=0${sortByDeadline ? '&deadline=true' : ''}`,
    );
  }

  const currentSidebarObject = sidebarObject
    .flat(2)
    .find(({ path }) => path === category);
  if (!currentSidebarObject) {
    redirect('home');
  }
  const { noticeSearchParams, icons, title } = currentSidebarObject;

  return (
    <main className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center">
        {category !== 'home' && (
          <div className="flex w-full flex-row flex-wrap justify-between gap-[14px] px-[18px] py-5 font-bold md:max-w-[800px]">
            <div className="flex items-center gap-2 text-4xl text-primary ">
              <icons.bold className="w-10 fill-primary stroke-white dark:stroke-dark_dark" />
              {t(title) as string}
            </div>
            {category !== 'deadline' && category !== 'zigglepick' && (
              <div className={`flex items-center gap-3`}>
                <Link
                  href={`${category}?page=0${
                    sortByDeadline ? '' : '&deadline=true'
                  }`}
                  className="flex rounded-full"
                >
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={sortByDeadline}
                    readOnly
                  />
                </Link>

                <p
                  className={`text-lg font-medium ${
                    sortByDeadline ? 'text-primary' : 'text-greyDark'
                  }`}
                >
                  {t('common.sortByDeadline')}
                </p>
              </div>
            )}
          </div>
        )}
        <Suspense
          key={JSON.stringify(page)}
          fallback={<LoadingCatAnimation lng={lng} />}
        >
          <CategorizedNotices
            sortByDeadline={sortByDeadline}
            noticeSearchParams={noticeSearchParams}
            lng={lng}
            page={page}
          />
        </Suspense>
      </div>
    </main>
  );
}
