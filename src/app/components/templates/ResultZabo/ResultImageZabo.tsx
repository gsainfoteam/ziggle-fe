'use server';
import 'server-only';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation } from '@/app/i18next';
import DefaultProfile from '@/assets/default-profile.svg';

import HighlightedText from '../../molecules/HighlightedText';
import ZaboActions from '../../organisms/Zabo/ZaboActions';
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

  const { t } = await createTranslation(lng);
  dayjs.locale(lng);

  const isClosed = dayjs(currentDeadline).isBefore();

  return (
    <Link className="min-w-fit" href={`/${lng}/notice/` + id}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-greyLight p-4 text-text md:rounded-lg md:p-5">
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <div className="flex items-center gap-2">
            <DefaultProfile className="h-10 w-10 md:h-9 md:w-9" />
            <div className="flex flex-col gap-0 font-medium md:flex-row md:items-center md:gap-1">
              <div className="text-base md:text-lg">
                {searchQuery ? (
                  <HighlightedText query={searchQuery}>
                    {author.name}
                  </HighlightedText>
                ) : (
                  author.name
                )}
              </div>
              <div className="hidden text-base text-greyDark md:flex">·</div>
              <div className="text-xs font-normal text-greyDark md:text-base md:font-medium">
                {dayjs(createdAt).fromNow()}
              </div>
            </div>
          </div>
          {currentDeadline && (
            <div
              className={`h-fit rounded-md ${
                isClosed ? 'bg-greyDark' : 'bg-primary'
              } px-2 py-1 text-sm text-white`}
            >
              {isClosed ? (
                t('ddayPlus')
              ) : (
                <Trans t={t} i18nKey={'zabo.timeLeft'}>
                  {{ timeLeft: dayjs(currentDeadline).fromNow(true) }}
                </Trans>
              )}
            </div>
          )}
        </div>
        <div className="text-xl font-semibold">
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
