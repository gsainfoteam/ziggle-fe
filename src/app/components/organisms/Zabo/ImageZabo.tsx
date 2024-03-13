import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

import ZaboImage from '@/app/components/molecules/ZaboImage';
import { PropsWithLng } from '@/app/i18next';

import DDay from '../../molecules/DDay';
import { ZaboOrigin, ZaboProps, ZaboSize } from './Zabo';

const ImageZabo = <Origin extends ZaboOrigin>({
  imageUrls,
  title,
  createdAt,
  views,
  author,
  currentDeadline: rawDeadline,
  t,
  width,
  height,
  lng,
}: ZaboProps<Origin> & PropsWithLng) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;
  const size = { width, height } as ZaboSize<Origin>;

  return (
    <div className="group mt-4 flex w-min flex-col gap-3">
      <div
        className={
          'relative w-fit rounded ' +
          'transition group-hover:-translate-y-2 ' +
          'group-hover:shadow-thumbnail group-hover:shadow-primary/10'
        }
      >
        <ZaboImage
          src={imageUrls[0]}
          alt={title}
          className="rounded border border-secondaryText object-cover"
          {...size}
        />
        {deadline && deadline.isAfter() && (
          <DDay
            deadline={deadline}
            t={t}
            className="absolute left-2 top-2 z-10"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="line-clamp-2 overflow-hidden text-ellipsis text-3xl font-bold leading-normal transition-colors group-hover:text-primary">
          {title}
        </div>
        <div className="flex text-sm font-medium text-secondaryText">
          <Trans t={t} i18nKey="zabo.dateView">
            {/* {{ date: dayjs(createdAt).tz().format('L') }} */}
            <strong className="font-bold"> · {{ views }}</strong>
          </Trans>
        </div>
        <div className="font-bold">{author.name}</div>
      </div>
    </div>
  );
};

export default ImageZabo;
