import dayjs from 'dayjs';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import type { Author } from '@/features/notice/models';

import { NoticeCardDDay } from './d-day';
import { NoticeCardHighlightedText } from './highlighted-text';

interface NoticeCardHeaderProps {
  author: Author;
  createdAt: string;
  deadline?: string | null;
  /** When provided, the author name highlights matching substrings. */
  query?: string;
}

export const NoticeCardHeader = ({
  author,
  createdAt,
  deadline,
  query,
}: NoticeCardHeaderProps) => {
  const timeAgo = dayjs(createdAt).fromNow();
  return (
    <div className="mx-3 my-2.5 flex flex-wrap items-center gap-y-3">
      <div className="flex items-center gap-2">
        {author.picture ? (
          <img
            src={author.picture}
            alt={author.name}
            className="size-9 rounded-full"
          />
        ) : (
          <DefaultProfile className="size-9" />
        )}
        <span className="text-text dark:text-dark_white text-lg">
          {query ? (
            <NoticeCardHighlightedText query={query}>
              {author.name}
            </NoticeCardHighlightedText>
          ) : (
            author.name
          )}
        </span>
      </div>
      <span className="text-greyDark dark:text-grey mx-1.25 font-bold">·</span>
      <span className="text-greyDark dark:text-grey font-medium">
        {timeAgo}
      </span>
      {deadline && (
        <>
          <div className="w-3.75" />
          <NoticeCardDDay deadline={dayjs(deadline)} />
        </>
      )}
    </div>
  );
};
