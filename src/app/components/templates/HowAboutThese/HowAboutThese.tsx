'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { getAllNotices } from '@/api/notice/notice';
import { useTranslation } from '@/app/i18next/client';

import Zabo from '../../organisms/Zabo';

const ITEMS_PER_CALL = 10;

const HowAboutThese = () => {
  const { t, i18n } = useTranslation();
  const endEl = useRef<HTMLDivElement>(null);
  const { data: notices, fetchNextPage } = useInfiniteQuery(
    'howAboutThese',
    ({ pageParam = 0 }) =>
      getAllNotices({ offset: pageParam * ITEMS_PER_CALL }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const items = allPages.reduce((acc, cur) => acc + cur.list.length, 0);
        if (lastPage.total > items) return allPages.length;
      },
    },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && fetchNextPage(),
      { threshold: 0.1 },
    );

    const el = endEl.current;
    if (!el) return;
    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [fetchNextPage]);

  return (
    <section className="flex flex-col gap-6">
      <div className="text-2xl md:text-4xl text-text dark:text-white font-bold">
        {t('zabo.howAboutThese')}
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 700: 2, 1200: 3, 1600: 4 }}
      >
        <Masonry gutter="16px">
          {notices?.pages
            .map((page) => page.list)
            .flat()
            .map(({ id, ...notice }) => (
              <Link key={id} href={`/${i18n.language}/notice/${id}`}>
                <Zabo t={t} width={300} {...notice} />
              </Link>
            )) ?? []}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={endEl} />
    </section>
  );
};

export default HowAboutThese;
