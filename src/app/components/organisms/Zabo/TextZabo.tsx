import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

import { useTranslation } from '@/app/i18next/client';
import getLocaleContents from '@/utils/getLocaleContents';

import DDay from '../../molecules/DDay';
import { TextZaboProps, ZaboOrigin } from './Zabo';

const TextZabo = <Origin extends ZaboOrigin>({
  contents,
  createdAt,
  views,
  author,
  currentDeadline: rawDeadline,
  t,
  height,
  width,
}: TextZaboProps<Origin>) => {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const origin = width ? 'width' : 'height';
  const antiOrigin = width ? 'height' : 'width';
  const originSize = (origin === 'width' ? width : height) ?? 0;
  const localContents = getLocaleContents(contents, language);
  const title = localContents[0].title;

  const lineClampLevel = title.length > 40 ? 2 : title.length > 20 ? 1 : 0;

  return (
    <div
      className={
        'relative my-4 rounded border border-secondaryText bg-white dark:bg-neutral-900 ' +
        'group flex flex-col justify-between gap-2.5 p-5 ' +
        'transition hover:-translate-y-2 ' +
        'hover:shadow-thumbnail hover:shadow-primary/10'
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
            <DDay deadline={deadline} t={t} className="absolute left-2 top-2" />
            <div className="h-2 md:h-4" />
          </>
        )}
        <div
          className={
            'text-3xl font-bold transition-colors group-hover:text-primary ' +
            (origin === 'height'
              ? ['line-clamp-2', 'line-clamp-3', 'line-clamp-5']
              : ['line-clamp-6', 'line-clamp-8', 'line-clamp-10'])[
              lineClampLevel
            ]
          }
        >
          {title}
        </div>
        <div className="overflow-hidden text-lg font-medium">
          {localContents[0].body}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex text-sm font-medium text-secondaryText">
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
