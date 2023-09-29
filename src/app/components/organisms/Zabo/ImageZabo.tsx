import { T } from '@/app/i18next';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Trans } from 'react-i18next';

interface ImageZaboProps {
  thumbnailUrl: string;
  title: string;
  content: string;
  date: dayjs.Dayjs;
  views: number;
  author: string;
}

const ImageZabo = ({
  thumbnailUrl,
  title,
  date,
  views,
  author,
  t,
}: ImageZaboProps & { t: T }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-64 h-64 bg-gray-200 rounded relative">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="font-bold text-3xl">{title}</div>
      <div className="text-sm text-secondayText font-medium flex">
        <Trans t={t} i18nKey="zabo.dateView">
          {{ date: date.format('L') }} ·
          <strong className="font-bold">{{ views }}</strong>
        </Trans>
      </div>
      <div className="font-bold">{author}</div>
    </div>
  );
};

export default ImageZabo;
