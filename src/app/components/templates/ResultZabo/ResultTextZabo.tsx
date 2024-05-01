'use server';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation } from '@/app/i18next';
import Fire from '@/assets/fire-outlined.svg';
import DefaultProfile from '@/assets/icons/default-profile.svg';
import Share from '@/assets/icons/share.svg';

import HighlightedText from '../../molecules/HighlightedText';
import Tags from '../../organisms/Tags';
import { ResultZaboProps } from './ResultZabo';

const ResultTextZabo = async ({
  id,
  title,
  currentDeadline,
  author,
  createdAt,
  reactions,
  lng,
  content,
}: ResultZaboProps) => {
  const { t } = await createTranslation(lng);
  dayjs.locale(lng);

  const isClosed = dayjs(currentDeadline).isBefore();

  return (
    <Link className="min-w-fit" href={`/${lng}/notice/` + id}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-greyLight p-5 text-text">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DefaultProfile className="h-9 w-9" />
            <div className="flex items-center gap-1 font-medium">
              <div className="text-lg">{author.name}</div>
              <div className="text-base text-greyDark">·</div>
              <div className="text-base text-greyDark">
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
        <div className="flex text-xl font-semibold">{title}</div>
        <div className="line-clamp-4 text-ellipsis text-start text-sm font-medium">
          {content ?? t('zabo.noContent')}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Fire className="h-9 w-9" />
            <div className="font-semibold">9</div>
          </div>
          <Share className="h-6 w-6" />
        </div>
      </div>
    </Link>
  );
};

export default ResultTextZabo;
