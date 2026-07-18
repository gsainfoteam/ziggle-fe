import dayjs from 'dayjs';
import {
  CalendarBlankIcon,
  EyeIcon,
  HourglassIcon,
  LinkIcon,
  PaperclipIcon,
} from '@phosphor-icons/react';
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
    <div className="border-border border-y py-3 text-sm">
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-6 gap-y-3">
        <Label icon={<CalendarBlankIcon className="size-4" />}>
          {t('detail.created_at')}
        </Label>
        <span className="text-subtle">
          {dayjs(createdAt).tz().format('LLL')}
        </span>

        <Label icon={<EyeIcon className="size-4" />}>{t('detail.views')}</Label>
        <span className="text-subtle">{views.toLocaleString()}</span>

        {currentDeadline && (
          <>
            <Label icon={<HourglassIcon className="size-4" />}>
              {t('detail.deadline')}
            </Label>
            <span className="text-subtle">
              {dayjs(currentDeadline).tz().format('LLL')}
            </span>
          </>
        )}

        {crawledUrl && (
          <>
            <Label icon={<LinkIcon className="size-4" />}>
              {t('detail.source_url')}
            </Label>
            <a
              href={crawledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle break-all underline"
            >
              {crawledUrl}
            </a>
          </>
        )}

        {documents.length > 0 && (
          <>
            <Label icon={<PaperclipIcon className="size-4" />}>
              {t('detail.attachments')}
            </Label>
            <div className="flex flex-col gap-1">
              {documents.map(({ url, name }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtle break-all underline"
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
    <div className="text-muted-foreground flex items-center gap-1.5 font-medium">
      {icon}
      <span>{children}</span>
    </div>
  );
}
