'use server';
import 'server-only';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation } from '@/app/i18next';

import Chip from '../../molecules/Chip';
import HighlightedText from '../../molecules/HighlightedText';
import ZaboImage from '../../molecules/ZaboImage';
import { ResultImageZaboProps } from './ResultZabo';

const ResultImageZabo = async ({
  title,
  createdAt: rawCreatedAt,
  views,
  author,
  deadline: rawDeadline,
  tags,
  searchQuery,

  imageUrl,
  id,
  lng,
}: ResultImageZaboProps) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const createdAt = rawCreatedAt ? dayjs(rawCreatedAt) : undefined;

  const { t } = await createTranslation(lng);

  return (
    <Link className={'w-full'} href={`/${lng}/notice/` + id}>
      <div className="box-border flex w-full flex-nowrap items-stretch justify-start gap-5 overflow-hidden rounded border border-secondaryText">
        <ZaboImage
          width={230} // handle mobile
          src={imageUrl}
          alt={title}
          objectFit="cover"
          objectPosition="center"
        />
        <div
          className="box-border flex flex-col justify-between"
          style={{
            boxSizing: 'border-box',
            padding: '1rem 0',
          }}
        >
          <div className="align-start flex flex-col">
            <p className={'text-sm font-medium md:text-xl'}>
              <Trans t={t} i18nKey="zabo.dueAt">
                {{ dueAt: dayjs(deadline).format('LLLL') }}
              </Trans>
            </p>
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
                    {author}
                  </HighlightedText>
                ) : (
                  author
                )}
              </p>
            </div>
            <div className={'my-0.5 flex flex-nowrap gap-2'}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  // font={Font.Regular}
                  variant={tag.name === searchQuery ? 'contained' : undefined}
                >
                  {'#' + tag.name}
                </Chip>
              ))}
            </div>
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

export default ResultImageZabo;
