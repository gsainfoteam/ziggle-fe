import dayjs from 'dayjs';
import { Attachment, Calendar, Eye, Hourglass, Link } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import type { NoticeDetail } from '@/features/notice/models';

export function NoticeDetailMetadata({
  createdAt,
  views,
  currentDeadline,
  crawledUrl,
  documents,
}: Pick<
  NoticeDetail,
  'createdAt' | 'views' | 'currentDeadline' | 'crawledUrl' | 'documents'
>) {
  const { t } = useTranslation('notice');

  return (
    <div className="border-greyLight dark:border-dark_greyBorder border-y py-3">
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-6 gap-y-3">
        <Label icon={<Calendar className="size-4.5" />}>
          {t('detail.created_at')}
        </Label>
        <span className="text-secondaryText">
          {dayjs(createdAt).tz().format('LLL')}
        </span>

        <Label icon={<Eye className="size-4.5" />}>{t('detail.views')}</Label>
        <span className="text-secondaryText">{views.toLocaleString()}</span>

        {currentDeadline && (
          <>
            <Label icon={<Hourglass className="size-4.5" />}>
              {t('detail.deadline')}
            </Label>
            <span className="text-secondaryText">
              {dayjs(currentDeadline).tz().format('LLL')}
            </span>
          </>
        )}

        {crawledUrl && (
          <>
            <Label icon={<Link className="size-4.5" />}>
              {t('detail.source_url')}
            </Label>
            <a
              href={crawledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondaryText break-all underline"
            >
              {crawledUrl}
            </a>
          </>
        )}

        {documents.length > 0 && (
          <>
            <Label icon={<Attachment className="size-4.5" />}>
              {t('detail.attachments')}
            </Label>
            <div className="flex flex-col gap-1">
              {documents.map(({ url, name }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondaryText break-all underline"
                >
                  {name}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Label({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="text-greyDark dark:text-dark_greyLight flex items-center gap-1.5 font-medium">
      {icon}
      <span>{children}</span>
    </div>
  );
}
