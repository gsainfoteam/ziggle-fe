import { Attachment } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import type { Notice } from '@/features/notice/models';

export const NoticeCardAttachmentIndicators = ({
  documents,
}: Pick<Notice, 'documents'>) => {
  const { t } = useTranslation('notice');

  const documentCount = documents?.length ?? 0;
  if (documentCount === 0) return null;

  return (
    <div className="text-greyDark dark:text-dark_grey flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <span
        className="flex items-center gap-1"
        aria-label={t('detail.attachments')}
      >
        <Attachment className="size-3.5" strokeWidth={2} />
        <span>{documentCount}</span>
      </span>
    </div>
  );
};
