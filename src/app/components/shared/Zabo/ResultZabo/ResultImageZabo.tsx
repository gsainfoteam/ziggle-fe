'use server';
import 'server-only';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import DefaultProfile from '@/assets/icons/default-profile.svg';

import ZaboActions from '../ZaboActions';
import DDay from '../DDay';
import HighlightedText from '../HighlightedText';
import { ResultZaboProps } from './ResultZabo';

const ResultImageZabo = async (props: ResultZaboProps) => {
  const {
    id,
    title,
    currentDeadline,
    author,
    createdAt,
    imageUrls,
    lng,
    searchQuery,
  } = props;

  return (
    <Link className="min-w-fit" href={`/${lng}/notice/` + id}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-greyLight p-4 text-text dark:bg-dark_greyDark md:rounded-lg md:p-5">
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <div className="flex items-center gap-2">
            <DefaultProfile className="h-10 w-10 md:h-9 md:w-9" />
            <div className="flex flex-col gap-0 font-medium md:flex-row md:items-center md:gap-1">
              <div className="text-base dark:text-dark_white md:text-lg">
                {searchQuery ? (
                  <HighlightedText query={searchQuery}>
                    {author.name}
                  </HighlightedText>
                ) : (
                  author.name
                )}
              </div>
              <div className="hidden text-base text-greyDark dark:text-dark_grey md:flex">
                ·
              </div>
              <div className="text-xs font-normal text-greyDark dark:text-dark_grey md:text-base md:font-medium">
                {dayjs(createdAt).fromNow()}
              </div>
            </div>
          </div>
          {currentDeadline && (
            <DDay
              deadline={currentDeadline}
              lng={lng}
              className="text-xs md:text-sm"
            />
          )}
        </div>
        <div className="text-xl font-semibold dark:text-dark_white">
          {searchQuery ? (
            <HighlightedText query={searchQuery}>{title}</HighlightedText>
          ) : (
            title
          )}
        </div>
        <div className="flex gap-2 overflow-x-scroll py-1 scrollbar scrollbar-thumb-greyBorder scrollbar-thumb-rounded-full scrollbar-h-1">
          {imageUrls.map((url, i) => (
            <Image
              key={url}
              src={url}
              className="flex h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-black bg-opacity-30 md:rounded-md"
              alt={`${title} ${i + 1}`}
              width={100}
              height={100}
            />
          ))}
        </div>
        <ZaboActions {...props} />
      </div>
    </Link>
  );
};

export default ResultImageZabo;
