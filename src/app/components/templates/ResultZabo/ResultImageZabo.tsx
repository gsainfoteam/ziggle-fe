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
  lng,
}: ResultImageZaboProps) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const createdAt = rawCreatedAt ? dayjs(rawCreatedAt) : undefined;

  const { t } = useTranslation(lng);

  return (
    <Link
      className={'w-full'}
      onClick={() =>
        sendLog(LogEvents.searchResultClick, {
          location: logName ?? 'unknown',
          isText: false,
        })
      }
      href={`/${lng}/notice/` + id}
    >
      <div className="box-border flex w-full flex-nowrap items-stretch justify-start gap-5 overflow-hidden">
        <ZaboImage
          width={230} // handle mobile
          src={imageUrl}
          alt={title}
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
            <GetHighlightedText
              className={'text-start text-xl font-bold md:text-3xl'}
              text={title}
              query={searchQuery}
              highlightColor={'primary'}
            />
            <div className={'h-1'} />

            <div className={'gap-2'}>
              <GetHighlightedText
                text={author}
                query={searchQuery}
                className={'text-start text-sm font-bold md:text-lg'}
                highlightColor={'primary'}
              />
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
