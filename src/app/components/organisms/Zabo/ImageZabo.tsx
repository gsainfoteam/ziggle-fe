import { T } from '@/app/i18next';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Trans } from 'react-i18next';
import ZaboImage, {
  ZaboImageSize,
  ZaboOrigin,
} from '../../molecules/ZaboImage';

interface ImageZaboProps {
  thumbnailUrl: string;
  title: string;
  content: string;
  date: dayjs.Dayjs;
  views: number;
  author: string;
}

const ImageZabo = <Origin extends ZaboOrigin>({
  thumbnailUrl,
  title,
  date,
  views,
  author,
  t,
  width,
  height,
}: ImageZaboProps & ZaboImageSize<Origin> & { t: T }) => {
  const size = { width, height } as ZaboImageSize<Origin>;
  return (
    <div className="flex flex-col gap-3 group">
      <div
        className="rounded w-fit
        transition group-hover:-translate-y-2
        group-hover:shadow-primary/10 group-hover:shadow-thumbnail"
      >
        <ZaboImage
          src={thumbnailUrl}
          alt={title}
          objectFit="cover"
          className="rounded border border-secondayText"
          {...size}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold text-3xl transition-colors group-hover:text-primary">
          {title}
        </div>
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

export default ImageZabo;
