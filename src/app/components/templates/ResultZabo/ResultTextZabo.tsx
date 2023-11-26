'use server';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation } from '@/app/i18next';
import getLocaleContents from '@/utils/getLocaleContents';

import HighlightedText from '../../molecules/HighlightedText';
import Tags from '../../organisms/Tags';
import { ResultZaboProps } from './ResultZabo';

const ResultTextZabo = async ({
  contents,
  body,
  createdAt,
  views,
  author,
  currentDeadline,
  tags,
  searchQuery,

  id,
  lng,
}: ResultZaboProps) => {
  const { t } = await createTranslation(lng);
  const localeContents = getLocaleContents(contents, lng);

  const title = localeContents[0].title;

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
          {currentDeadline && (
            <div className="mb-1.5 text-lg font-medium">
              <Trans t={t} i18nKey="zabo.dueAt">
                {{ dueAt: dayjs(currentDeadline).tz().format('LLL') }}
              </Trans>
            </div>
          )}
          <div className="text-start text-3xl font-bold">
            {searchQuery ? (
              <HighlightedText query={searchQuery}>{title}</HighlightedText>
            ) : (
              title
            )}
          </div>

          <div className="flex items-center gap-0.5">
            <div className="text-lg font-bold">
              {searchQuery ? (
                <HighlightedText query={searchQuery}>{author}</HighlightedText>
              ) : (
                author
              )}
            </div>
            {/* organization here (for futer update) */}
          </div>

          <Tags
            tags={tags}
            className="my-0.5"
            searchQuery={searchQuery}
            lng={lng}
          />

          <div className="line-clamp-4 text-ellipsis text-start text-sm font-medium">
            {localeContents[0].body ?? t('zabo.noContent')}T
          </div>

          <div className="flex gap-0.5">
            <div className="flex text-sm font-medium text-secondaryText">
              <Trans t={t} i18nKey="zabo.dateView">
                {{ date: dayjs(createdAt).tz().format('L') }}
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
