'use server';
import 'server-only';

import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation } from '@/app/i18next';
import Fire from '@/assets/fire-outlined.svg';
import DefaultProfile from '@/assets/icons/default-profile.svg';
import Share from '@/assets/icons/share.svg';

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
          <div
            className={`h-fit rounded-md ${
              isClosed ? 'bg-greyDark' : 'bg-primary'
            } px-2 py-1 text-sm text-white`}
          >
            {isClosed
              ? '기한 지남'
              : dayjs(currentDeadline).fromNow(true) + ' 남음'}
          </div>
        </div>
        <div className="flex text-xl font-semibold">{title}</div>
        <div className="flex gap-2">
          {imageUrls.slice(0, 7).map((url, i) => (
            <div
              key={i}
              className="relative flex h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-black bg-opacity-30"
            >
              <Image src={url} alt={title} width={100} height={100} />
              {i == 6 && imageUrls.length > 7 && (
                <div className="absolute flex h-full w-full items-center justify-center bg-black bg-opacity-30 text-3xl font-semibold text-white">
                  +{imageUrls.length - 7}
                </div>
              )}
            </div>
          ))}
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

export default ResultImageZabo;
