'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { fallbackLng, Locale } from '@/app/i18next/settings';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import LazyCat from '@/assets/lazy-cat.svg';

import HorizontalScrollButton from '../../molecules/HorizontalScrollButton';
import Zabo from '../../organisms/Zabo';
import ImageZabo from '../../organisms/Zabo/ImageZabo';
import TextZabo from '../../organisms/Zabo/TextZabo';
import { ZaboOrigin, ZaboSize } from '../../organisms/Zabo/Zabo';

const SCROLL_AMOUNT = 800;

interface ZaboCarouselProps {
  notices: ((
    | Omit<React.ComponentProps<typeof ImageZabo>, 'width' | 'height' | 't'>
    | Omit<React.ComponentProps<typeof TextZabo>, 'width' | 'height' | 't'>
  ) & { id: number })[];
  title: string;
  sectionHref?: string;
  containerClassName?: string;
  carouselClassName?: string;
  lng: Locale;
}

const ZaboCarousel = <Origin extends ZaboOrigin>({
  notices,
  width,
  height,
  title,
  sectionHref,
  containerClassName,
  carouselClassName,
  lng,
}: ZaboCarouselProps & ZaboSize<Origin>) => {
  const { t } = useTranslation(lng);
  const size = { width, height } as ZaboSize<Origin>;
  const carouselEl = useRef<HTMLDivElement>(null);
  const [carouselLeft, setCarouselLeft] = useState(0);
  const leftDisabled = carouselLeft === 0;
  const rightDisabled = carouselEl.current
    ? carouselLeft + 10 >
      carouselEl.current.scrollWidth - carouselEl.current.clientWidth
    : true;

  const scroll = (amount: number) => {
    if (!carouselEl.current) return;
    carouselEl.current.scrollBy({ left: amount, behavior: 'smooth' });
  };
  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setCarouselLeft(e.currentTarget.scrollLeft);
  };

  return (
    <div
      className={[
        'flex w-full flex-col items-center',
        ...(containerClassName ? [containerClassName] : []),
      ].join(' ')}
    >
      <Title
        title={title}
        href={sectionHref}
        onLeft={() => scroll(-SCROLL_AMOUNT)}
        onRight={() => scroll(SCROLL_AMOUNT)}
        leftDisabled={leftDisabled}
        rightDisabled={rightDisabled}
      />
      {notices.length > 0 ? (
        <div
          className={[
            'flex w-full flex-nowrap items-center justify-center overflow-y-hidden pb-4 pt-1',
            ...(carouselClassName ? [carouselClassName] : []),
          ].join(' ')}
        >
          <div
            ref={carouselEl}
            onScroll={handleCarouselScroll}
            className="content flex gap-5 overflow-x-scroll scrollbar-none"
          >
            {notices.map((notice) => (
              <div key={notice.id} className="shrink-0">
                <Link href={`/${lng}/notice/${notice.id}`}>
                  <Zabo {...notice} {...size} t={t} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty lng={lng} />
      )}
    </div>
  );
};

const Title = ({
  title,
  href,
  onLeft,
  onRight,
  leftDisabled,
  rightDisabled,
}: {
  title: string;
  href?: string;
  onLeft: () => void;
  onRight: () => void;
  leftDisabled: boolean;
  rightDisabled: boolean;
}) => (
  <div className="content flex items-center justify-between py-5">
    {href ? (
      <Link href={href} className="group">
        <div className="flex gap-5">
          <TitleText title={title} />
          <ArrowRightIcon className="w-5 stroke-secondaryText transition-transform group-hover:translate-x-2" />
        </div>
      </Link>
    ) : (
      <TitleText title={title} />
    )}
    <HorizontalScrollButton>
      <HorizontalScrollButton.Left disabled={leftDisabled} onClick={onLeft} />
      <HorizontalScrollButton.Right
        disabled={rightDisabled}
        onClick={onRight}
      />
    </HorizontalScrollButton>
  </div>
);

const Empty = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  return (
    <div className="flex h-72 flex-col items-center justify-center">
      <LazyCat />
      <div className="p-5 text-xl font-medium text-secondaryText">
        {t('emptyNotices')}
      </div>
    </div>
  );
};

const TitleText = ({ title }: { title: string }) => (
  <h2 className="m-0 text-3xl font-bold md:text-5xl">{title}</h2>
);

export default ZaboCarousel;
