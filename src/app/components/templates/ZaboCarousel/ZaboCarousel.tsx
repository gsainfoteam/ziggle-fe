'use client';

import Link from 'next/link';

import { T } from '@/app/i18next';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import LazyCat from '@/assets/lazy-cat.svg';

import HorizontalScrollButton from '../../molecules/HorizontalScrollButton';
import Zabo from '../../organisms/Zabo';
import ImageZabo from '../../organisms/Zabo/ImageZabo';
import TextZabo from '../../organisms/Zabo/TextZabo';
import { ZaboOrigin, ZaboSize } from '../../organisms/Zabo/Zabo';

let b:
  | React.ComponentProps<typeof ImageZabo>
  | React.ComponentProps<typeof TextZabo>;

interface ZaboCarouselProps {
  notices: (Omit<
    | React.ComponentProps<typeof ImageZabo>
    | React.ComponentProps<typeof TextZabo>,
    'width' | 'height' | 't'
  > & { id: number })[];
  title: string;
  sectionHref?: string;
  containerClassName?: string;
  carouselClassName?: string;
}

const ZaboCarousel = <Origin extends ZaboOrigin>({
  notices,
  width,
  height,
  t,
  title,
  sectionHref,
  containerClassName,
  carouselClassName,
}: ZaboCarouselProps & ZaboSize<Origin> & { t: T }) => {
  return (
    <div
      className={[
        'flex flex-col w-full items-center',
        ...(containerClassName ? [containerClassName] : []),
      ].join(' ')}
    >
      <Title title={title} href={sectionHref} />
      {notices.length > 0 ? (
        <div
          className={[
            'w-full flex flex-nowrap pt-1 pb-4 items-center justify-center overflow-y-hidden',
            ...(carouselClassName ? [carouselClassName] : []),
          ].join(' ')}
        >
          <div className="flex gap-5 overflow-x-scroll content scrollbar-none">
            {notices.map((notice) => (
              <div key={notice.id} className="shrink-0">
                <Zabo {...notice} width={width} height={height} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty t={t} />
      )}
    </div>
  );
};

const Title = ({ title, href }: { title: string; href?: string }) => (
  <div className="flex w-full justify-between items-center px-5">
    {href ? (
      <Link href={href} className="group">
        <div className="flex gap-5">
          <TitleText title={title} />
          <ArrowRightIcon className="stroke-secondayText w-5 transition-transform group-hover:translate-x-2" />
        </div>
      </Link>
    ) : (
      <TitleText title={title} />
    )}
    <HorizontalScrollButton>
      <HorizontalScrollButton.Left disabled />
      <HorizontalScrollButton.Right />
    </HorizontalScrollButton>
  </div>
);

const Empty = ({ t }: { t: T }) => (
  <div className="flex flex-col items-center justify-center h-72">
    <LazyCat />
    <div className="text-xl text-secondayText font-medium p-5">
      {t('emptyNotices')}
    </div>
  </div>
);

const TitleText = ({ title }: { title: string }) => (
  <h2 className="text-3xl md:text-5xl font-bold m-0">{title}</h2>
);

export default ZaboCarousel;
