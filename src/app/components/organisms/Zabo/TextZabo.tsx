import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

import { T } from '@/app/i18next';

import DDay from '../../molecules/DDay';
import { ZaboOrigin, ZaboSize } from './Zabo';

export interface TextZaboProps {
  title: string;
  body: string;
  createdAt: dayjs.Dayjs | string;
  deadline?: dayjs.Dayjs | string;
  views: number;
  author: string;
}

const TextZabo = <Origin extends ZaboOrigin>({
  title,
  body,
  createdAt,
  views,
  author,
  deadline: rawDeadline,
  t,
  height,
  width,
}: TextZaboProps & ZaboSize<Origin> & { t: T }) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const origin = width ? 'width' : 'height';
  const antiOrigin = width ? 'height' : 'width';
  const originSize = (origin === 'width' ? width : height) ?? 0;
  const lineClampLevel = title.length > 40 ? 2 : title.length > 20 ? 1 : 0;

  return (
    <div
      className={
        'border rounded border-secondayText mt-4 relative bg-white dark:bg-neutral-900 ' +
        'p-5 flex flex-col gap-2.5 justify-between group ' +
        'transition hover:-translate-y-2 ' +
        'hover:shadow-primary/10 hover:shadow-thumbnail'
      }
      style={{
        [origin]: originSize,
        [antiOrigin === 'width' ? 'minWidth' : 'minHeight']:
          origin === 'height' ? originSize / 1.5 : originSize,
        [antiOrigin === 'width' ? 'maxWidth' : 'maxHeight']: originSize * 2,
      }}
    >
      <div className="flex flex-col gap-2.5">
        {deadline && deadline.isAfter() && (
          <>
            <DDay deadline={deadline} t={t} className="absolute top-2 left-2" />
            <div className="h-2 md:h-4" />
          </>
        )}
        <div
          className={
            'font-bold text-3xl transition-colors group-hover:text-primary ' +
            (origin === 'height'
              ? ['line-clamp-2', 'line-clamp-3', 'line-clamp-5']
              : ['line-clamp-6', 'line-clamp-8', 'line-clamp-10'])[
              lineClampLevel
            ]
          }
        >
          {title}
        </div>
        <div className="font-medium text-lg">{body}</div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="text-sm text-secondayText font-medium flex">
          <Trans t={t} i18nKey="zabo.dateView">
            {{ date: dayjs(createdAt).format('L') }}
            <strong className="font-bold"> · {{ views }}</strong>
          </Trans>
        </div>
        <div className="font-bold">{author}</div>
      </div>
    </div>
  );
};

export default TextZabo;
