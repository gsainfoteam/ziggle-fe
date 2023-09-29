import { T } from '@/app/i18next';
import dayjs from 'dayjs';
import { Trans } from 'react-i18next';

interface TextZaboProps {
  title: string;
  content: string;
  date: dayjs.Dayjs;
  views: number;
  author: string;
}

const TextZabo = ({
  title,
  content,
  date,
  views,
  author,
  t,
}: TextZaboProps & { t: T }) => {
  return (
    <div className="border rounded border-secondayText p-5 flex flex-col gap-2.5">
      <div className="font-bold text-3xl">{title}</div>
      <div className="font-medium text-lg">{content}</div>
      <div className="text-sm text-secondayText flex">
        <div className="font-medium">
          <Trans t={t} i18nKey="zabo.dateView">
            {{ date: date.format('L') }} ·
            <strong className="font-bold">{{ views }}</strong>
          </Trans>
        </div>
      </div>
      <div className="font-bold">{author}</div>
    </div>
  );
};

export default TextZabo;
