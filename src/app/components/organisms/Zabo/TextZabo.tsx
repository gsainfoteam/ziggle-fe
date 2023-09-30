import { T } from '@/app/i18next';
import dayjs from 'dayjs';
import { Trans } from 'react-i18next';
import { ZaboOrigin, ZaboSize } from '.';

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
  return (
    <div
      className="border rounded border-secondayText
      p-5 flex flex-col gap-2.5 justify-between group
      transition hover:-translate-y-2
      hover:shadow-primary/10 hover:shadow-thumbnail"
      style={{ height, width }}
    >
      <div className="flex flex-col gap-2.5">
        <div className="font-bold text-3xl transition-colors group-hover:text-primary">
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
