'use client';

import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

import { useTranslation } from '@/app/i18next/client';

import Chip from '../../molecules/Chip';
import HighlightedText from '../../molecules/HighlightedText';
import { ResultZaboProps } from './ResultZabo';

const ResultTextZabo = ({
  title,
  body,
  createdAt,
  views,
  author,
  deadline: rawDeadline,
  tags,
  searchQuery,
}: ResultZaboProps) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const { t } = useTranslation();

  return (
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
          {body ?? t('zabo.noContent')}
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
  );
};

export default ResultTextZabo;
