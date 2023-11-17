import dayjs from 'dayjs';
import Link from 'next/link';
import { Trans } from 'react-i18next';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { useTranslation } from '@/app/i18next/client';
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

  const { t } = useTranslation();

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
          width={230} // handle mobile
          src={imageUrl}
          alt={title}
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
              <Trans t={t} i18nKey="zabo.dueAt">
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

export default ResultImageZabo;
