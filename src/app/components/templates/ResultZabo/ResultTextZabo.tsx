'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { useTranslation } from '@/app/i18next/client';
import getLocaleContents from '@/utils/getLocaleContents';

import Chip from '../../molecules/Chip';
import HighlightedText from '../../molecules/HighlightedText';
import { ResultZaboProps } from './ResultZabo';

const ResultTextZabo = ({
  contents,
  body,
  createdAt,
  views,
  author,
  currentDeadline: rawDeadline,
  tags,
  searchQuery,

  id,
  logName,
  lng,
}: ResultZaboProps) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const localeContents = getLocaleContents(contents, language);

  const title = localeContents[0].title;

  return (
    <Link
      className={'w-full'}
      onClick={() =>
        sendLog(LogEvents.searchResultClick, {
          location: logName ?? 'unknown',
          isText: true,
        })
      }
      href={`/${lng}/notice/` + id}
    >
      <div
        className={
          'flex flex-col justify-between gap-2.5 p-5 ' +
          'w-full box-border overflow-hidden rounded border cursor-pointer border-secondaryText ' +
          'bg-white dark:bg-neutral-900'
        }
      >
        <div className="flex flex-col items-start">
          <div className="font-medium text-lg mb-1.5">
            <Trans t={t} i18nKey="zabo.dueAt">
              {{ dueAt: dayjs(deadline).format('LLLL') }}
            </Trans>
          </div>
          <div className="font-bold text-3xl text-start">
            <HighlightedText query={searchQuery}>{title}</HighlightedText>
          </div>

          <div className="flex gap-0.5 items-center">
            <div className="font-bold text-lg">
              <HighlightedText query={searchQuery}>{author}</HighlightedText>
            </div>
            {/* organization here (for futer update) */}
          </div>

          <div className="flex gap-2 my-0.5">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                variant={tag.name === searchQuery ? 'contained' : undefined}
              >
                {`#${tag.name}`}
              </Chip>
            ))}
          </div>

          <div className="font-medium text-sm text-start text-ellipsis line-clamp-4">
            {localeContents[0].body ?? t('zabo.noContent')}
          </div>

          <div className="flex gap-0.5">
            <div className="text-sm text-secondayText font-medium flex">
              <Trans t={t} i18nKey="zabo.dateView">
                {{ date: dayjs(createdAt).format('L') }}
                <strong className="font-bold"> · {{ views }}</strong>
              </Trans>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultTextZabo;
