import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { sidebarObject } from '@/app/components/layout/Sidebar/sidebarObject';
import LoadingCatAnimation from '@/app/components/shared/LoadingCatAnimation';
import styles from '@/app/components/shared/Toggle/toggle.module.css';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import CategorizedNotices from './CategorizedNotices';
import { HomePath } from './paths';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: PropsWithLng & {
    category: HomePath;
  };
  searchParams?: { deadline: 'true' | 'false'; page: string };
}

export default async function CategoryPage({
  params: { lng, category },
  searchParams,
}: CategoryPageProps) {
  const { t } = await createTranslation(lng);

  const sortByDeadline = searchParams?.deadline === 'true' ?? false;
  const page = parseInt(searchParams?.page ?? '');
  const isPageValid = !Number.isNaN(page) && page >= 0;
  if (!isPageValid) {
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
              {t(title)}
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
                  {/* TODO: Investigate Toggle */}
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
