'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import GetHighlightedText from '@/utils/GetHighlightedText';

import Chip from '../../molecules/Chip';
import ZaboImage from '../../molecules/ZaboImage';
import { ResultImageZaboProps } from './ResultZabo';

const ResultImageZabo = ({
  title,
  createdAt: rawCreatedAt,
  views,
  author,
  deadline: rawDeadline,
  tags,
  searchQuery,
  imageUrl,
  logName,
  id,
}: ResultImageZaboProps) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const createdAt = rawCreatedAt ? dayjs(rawCreatedAt) : undefined;

  return (
    <Link
      className={'w-full'}
      onClick={() =>
        sendLog(LogEvents.searchResultClick, {
          location: logName ?? 'unknown',
          isText: false,
        })
      }
      href={`/ko/notice/` + id}
    >
      {/* fix /ko/ to /lng/ */}
      <div className="flex justify-start gap-5 w-full flex-nowrap overflow-hidden box-border items-stretch">
        <ZaboImage
          // origin="width"
          // size={isMobile ? 120 : 230}
          width={230} // handle mobile
          src={imageUrl}
          alt={title}
          // isHover={false}
        />
        <div
          className="flex flex-col justify-between box-border"
          style={{
            boxSizing: 'border-box',
            padding: '1rem 0',
          }}
        >
          <div className="flex flex-col align-start">
            <p className={'font-medium text-sm md:text-xl'}>
              <Trans i18nKey="zabo.dueAt">
                {{ dueAt: dayjs(deadline).format('LLLL') }}
              </Trans>
            </p>
            <GetHighlightedText
              className={'font-bold text-xl md:text-3xl text-start'}
              text={title}
              query={searchQuery}
              highlightColor={'primary'}
            />
            <div className={'h-1'} />

            <div className={'gap-2'}>
              <GetHighlightedText
                text={author}
                query={searchQuery}
                className={'font-bold text-sm md:text-lg text-start'}
                highlightColor={'primary'}
              />
            </div>
            <div className={'flex gap-2 my-0.5 flex-nowrap'}>
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
          <div className={'gap-2 align-middle flex'}>
            <p
              className={'font-regular text-secondaryText text-xs md:text-base'}
            >
              {dayjs(createdAt).format('L')}
            </p>
            <p className={'text-secondaryText text-xs md:text-base'}>•</p>
            <p className={'font-bold text-secondaryText text-xs md:text-base'}>
              조회수 {views}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultImageZabo;
