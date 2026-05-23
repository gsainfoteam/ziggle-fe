import { Attachment, Link } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import type { NoticeDetail } from '@/features/notice/models';

export function NoticeDetailDocumentUrls({
  crawledUrl,
  documents,
}: Pick<NoticeDetail, 'crawledUrl' | 'documents'>) {
  const { t } = useTranslation('notice');

  if (!crawledUrl && documents.length === 0) return null;

  return (
    <div className="border-greyLight border-y py-3">
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-6 gap-y-3">
        {crawledUrl && (
          <>
            <Label icon={<Link className="size-4.5" />}>{t('detail.source_url')}</Label>
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
