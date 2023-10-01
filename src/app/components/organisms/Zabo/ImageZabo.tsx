import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

import ZaboImage from '@/app/components/molecules/ZaboImage';
import { T } from '@/app/i18next';

import DDay from '../../molecules/DDay';
import { TextZaboProps } from './TextZabo';
import { ZaboOrigin, ZaboSize } from './Zabo';

interface ImageZaboProps extends Omit<TextZaboProps, 'body'> {
  thumbnailUrl: string;
}

const ImageZabo = <Origin extends ZaboOrigin>({
  thumbnailUrl,
  title,
  createdAt,
  views,
  author,
  deadline: rawDeadline,
  t,
  width,
  height,
}: ImageZaboProps & ZaboSize<Origin> & { t: T }) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const size = { width, height } as ZaboSize<Origin>;
  return (
    <div className="flex flex-col gap-3 group w-min mt-4">
      <div
        className={
          'rounded w-fit relative ' +
          'transition group-hover:-translate-y-2 ' +
          'group-hover:shadow-primary/10 group-hover:shadow-thumbnail'
        }
      >
        <ZaboImage
          src={thumbnailUrl}
          alt={title}
          objectFit="cover"
          className="rounded border border-secondayText"
          {...size}
        />
        {deadline && deadline.isAfter() && (
          <DDay
            deadline={deadline}
            t={t}
            className="absolute top-2 left-2 z-10"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold text-3xl transition-colors group-hover:text-primary line-clamp-2 overflow-hidden text-ellipsis">
          {title}
        </div>
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

export default ImageZabo;
