'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { GET_NOTICES } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import Zabo from '../../organisms/Zabo';

const ITEMS_PER_CALL = 10;

const HowAboutThese = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  const endEl = useRef<HTMLDivElement>(null);
  const { data, loading, fetchMore } = useQuery(GET_NOTICES, {
    variables: { offset: 0, limit: ITEMS_PER_CALL },
  });

  const notices = useMemo(() => data?.notices.list ?? [], [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries[0].isIntersecting &&
        notices.length &&
        fetchMore({ variables: { offset: notices.length } }),
      { threshold: 0.1 },
    );

    const el = endEl.current;
    if (!el) return;
    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [notices, fetchMore]);

  if (loading) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="text-2xl font-bold text-text dark:text-white md:text-4xl">
        {t('zabo.howAboutThese')}
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 700: 2, 1200: 3, 1600: 4 }}
      >
        <Masonry
          gutter="16px"
          className="!place-content-start [&>*]:!grow-0 [&>*]:!basis-[fit-content]"
        >
          {notices.map((notice) => (
            <Link key={notice.id} href={`/${lng}/notice/${notice.id}`}>
              <Zabo
                t={t}
                width={300}
                {...notice}
                lng={lng}
                deadline={notice.deadline ?? null}
                currentDeadline={notice.currentDeadline ?? null} // I don't know why it infers the type 'deadline' as optional
              />
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={endEl} />
    </section>
  );
};

export default HowAboutThese;
