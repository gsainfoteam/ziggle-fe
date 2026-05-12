import { Link as LinkIcon, Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Notice } from '@/features/notice/models';

export function AttachmentIndicators({
  documents,
  crawledUrl,
}: Pick<Notice, 'documents' | 'crawledUrl'>) {
  const { t } = useTranslation('notice');

  const documentCount = documents?.length ?? 0;
  const hasDocuments = documentCount > 0;
  const hasSourceUrl = Boolean(crawledUrl);

  if (!hasDocuments && !hasSourceUrl) return null;

  return (
    <div className="text-greyDark dark:text-grey flex items-center gap-3 text-sm font-medium">
      {hasDocuments && (
        <span
          className="flex items-center gap-1"
          aria-label={t('detail.attachments')}
        >
          <Paperclip size={16} />
          <span>{documentCount}</span>
        </span>
      )}
      {hasSourceUrl && (
        <span
          className="flex items-center gap-1"
          aria-label={t('detail.source_url')}
        >
          <LinkIcon size={16} />
        </span>
      )}
    </div>
  );
}
