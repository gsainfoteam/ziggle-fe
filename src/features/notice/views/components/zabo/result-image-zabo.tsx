import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';

import DDay from './d-day';
import { HighlightedText } from './highlighted-text';
import { ZaboActions } from './zabo-actions';

import type { ResultZaboProps } from './type';

export const ResultImageZabo = (props: ResultZaboProps) => {
  const {
    id,
    title,
    currentDeadline,
    author,
    createdAt,
    imageUrls,
    searchQuery,
  } = props;
  return (
    <Link className="min-w-fit" to="/notice/$id" params={{ id: id.toString() }}>
      <div className="bg-greyLight text-text dark:bg-dark_greyDark flex w-full flex-col gap-2 overflow-hidden rounded-2xl p-4 md:rounded-lg md:p-5">
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <div className="flex items-center gap-2">
            <DefaultProfile className="h-10 w-10 md:h-9 md:w-9" />
            <div className="flex flex-col gap-0 font-medium md:flex-row md:items-center md:gap-1">
              <div className="dark:text-dark_white text-base md:text-lg">
                {searchQuery ? (
                  <HighlightedText query={searchQuery}>
                    {author.name}
                  </HighlightedText>
                ) : (
                  author.name
                )}
              </div>
              <div className="text-greyDark dark:text-dark_grey hidden text-base md:flex">
                ·
              </div>
              <div className="text-greyDark dark:text-dark_grey text-xs font-normal md:text-base md:font-medium">
                {dayjs(createdAt).fromNow()}
              </div>
            </div>
          </div>
          {currentDeadline && (
            <DDay deadline={currentDeadline} className="text-xs md:text-sm" />
          )}
        </div>
        <div className="dark:text-dark_white text-xl font-semibold">
          {searchQuery ? (
            <HighlightedText query={searchQuery}>{title}</HighlightedText>
          ) : (
            title
          )}
        </div>
        <div className="scrollbar scrollbar-thumb-greyBorder scrollbar-thumb-rounded-full scrollbar-h-1 flex gap-2 overflow-x-scroll py-1">
          {imageUrls.map((url, i) => (
            <img
              key={url}
              src={url}
              className="bg-opacity-30 flex h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-black md:rounded-md"
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
