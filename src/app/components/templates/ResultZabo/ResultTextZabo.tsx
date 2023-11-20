'use server';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

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

  id,
  lng,
  t,
}: ResultZaboProps) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;

  return (
    <Link className={'w-full'} href={`/${lng}/notice/` + id}>
      <div
        className={
          'flex flex-col justify-between gap-2.5 p-5 ' +
          'box-border w-full cursor-pointer overflow-hidden rounded border border-secondaryText ' +
          'bg-white dark:bg-neutral-900'
        }
      >
        <div className="flex flex-col items-start">
          <div className="mb-1.5 text-lg font-medium">
            <Trans t={t} i18nKey="zabo.dueAt">
              {{ dueAt: dayjs(deadline).format('LLLL') }}
            </Trans>
          </div>
          <div className="text-start text-3xl font-bold">
            <HighlightedText query={searchQuery}>{title}</HighlightedText>
          </div>

          <div className="flex items-center gap-0.5">
            <div className="text-lg font-bold">
              <HighlightedText query={searchQuery}>{author}</HighlightedText>
            </div>
            {/* organization here (for futer update) */}
          </div>

          <div className="my-0.5 flex gap-2">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                variant={tag.name === searchQuery ? 'contained' : undefined}
              >
                {`#${tag.name}`}
              </Chip>
            ))}
          </div>

          <div className="line-clamp-4 text-ellipsis text-start text-sm font-medium">
            {body ?? t('zabo.noContent')}
          </div>

          <div className="flex gap-0.5">
            <div className="text-secondayText flex text-sm font-medium">
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
