import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

import { T } from '@/app/i18next';

import { ZaboOrigin, ZaboSize } from './Zabo';

interface TextZaboProps {
  title: string;
  content: string;
  date: dayjs.Dayjs;
  views: number;
  author: string;
}

const TextZabo = <Origin extends ZaboOrigin>({
  title,
  content,
  date,
  views,
  author,
  t,
  height,
  width,
}: TextZaboProps & ZaboSize<Origin> & { t: T }) => {
  const origin = width ? 'width' : 'height';
  const antiOrigin = width ? 'height' : 'width';
  const originSize = (origin === 'width' ? width : height) ?? 0;
  const lineClampLevel = title.length > 40 ? 2 : title.length > 20 ? 1 : 0;

  return (
    <div
      className={
        'border rounded border-secondayText ' +
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
        <div className="font-medium text-lg">{content}</div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="text-sm text-secondayText font-medium flex">
          <Trans t={t} i18nKey="zabo.dateView">
            {{ date: date.format('L') }}
            <strong className="font-bold"> · {{ views }}</strong>
          </Trans>
        </div>
        <div className="font-bold">{author}</div>
      </div>
    </div>
  );
};

export default TextZabo;
