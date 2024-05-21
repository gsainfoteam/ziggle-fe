'use server';

import dayjs from 'dayjs';
import Link from 'next/link';

import { createTranslation } from '@/app/i18next';
import DefaultProfile from '@/assets/default-profile.svg';

import DDay from '../../molecules/DDay';
import HighlightedText from '../../molecules/HighlightedText';
import ZaboActions from '../../organisms/Zabo/ZaboActions';
import { ResultZaboProps } from './ResultZabo';

const ResultTextZabo = async (props: ResultZaboProps) => {
  const {
    id,
    title,
    currentDeadline,
    author,
    createdAt,
    content,
    lng,
    searchQuery,
  } = props;

  const { t } = await createTranslation(lng);

  return (
    <Link className="min-w-fit" href={`/${lng}/notice/` + id}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-greyLight p-4 text-text dark:bg-dark_greyDark md:rounded-lg md:p-5">
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <div className="flex items-center justify-center gap-2">
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
              t={t}
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
        <div className="font-regular line-clamp-4 text-ellipsis text-start dark:text-dark_white">
          {searchQuery ? (
            <HighlightedText query={searchQuery}>
              {content ?? t('zabo.noContent')}
            </HighlightedText>
          ) : (
            content ?? t('zabo.noContent')
          )}
        </div>
        <ZaboActions {...props} />
      </div>
    </Link>
  );
};

export default ResultTextZabo;
