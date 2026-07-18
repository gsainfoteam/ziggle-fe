import { PaperclipIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import type { Notice } from '@/features/notice/models';

export const NoticeCardAttachmentIndicators = ({
  documents,
}: Pick<Notice, 'documents'>) => {
  const { t } = useTranslation('notice');

  const documentCount = documents?.length ?? 0;
  if (documentCount === 0) return null;

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <span
        className="flex items-center gap-1"
        aria-label={t('detail.attachments')}
      >
        <PaperclipIcon className="size-3.5" weight="bold" />
        <span>{documentCount}</span>
      </span>
    </div>
  );
};
