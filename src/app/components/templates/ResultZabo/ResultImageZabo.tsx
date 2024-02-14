'use server';
import 'server-only';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation } from '@/app/i18next';

import HighlightedText from '../../molecules/HighlightedText';
import ZaboImage from '../../molecules/ZaboImage';
import Tags from '../../organisms/Tags';
import { ResultZaboProps } from './ResultZabo';

const ResultImageZabo = async ({
  title,
  createdAt,
  views,
  author,
  currentDeadline,
  tags,
  searchQuery,
  imageUrls,
  id,
  lng,
}: ResultZaboProps) => {
  const { t } = await createTranslation(lng);

  return (
    <Link className={'w-full'} href={`/${lng}/notice/` + id}>
      <div className="box-border flex w-full flex-nowrap items-stretch justify-start gap-5 overflow-hidden rounded border border-secondaryText">
        <ZaboImage
          width={230} // handle mobile
          src={imageUrls[0]}
          alt={title}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          className="box-border flex flex-col justify-between"
          style={{
            boxSizing: 'border-box',
            padding: '1rem 0',
          }}
        >
          <div className="align-start flex flex-col">
            {currentDeadline && (
              <p className={'text-sm font-medium md:text-xl'}>
                <Trans t={t} i18nKey="zabo.dueAt">
                  {{ dueAt: dayjs(currentDeadline).tz().format('LLL') }}
                </Trans>
              </p>
            )}
            <p className="text-start text-xl font-bold md:text-3xl">
              {searchQuery ? (
                <HighlightedText query={searchQuery}>{title}</HighlightedText>
              ) : (
                title
              )}
            </p>
            <div className={'h-1'} />

            <div className={'gap-2'}>
              <p className="text-start text-sm font-bold md:text-lg">
                {searchQuery ? (
                  <HighlightedText query={searchQuery}>
                    {author.name}
                  </HighlightedText>
                ) : (
                  author.name
                )}
              </p>
            </div>
            <Tags
              lng={lng}
              tags={tags}
              className="my-0.5 flex-nowrap"
              searchQuery={searchQuery}
            />
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

export default ResultImageZabo;
