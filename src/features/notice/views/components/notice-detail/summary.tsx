import { SparkleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface NoticeDetailSummaryProps {
  summary?: string | null;
}

export function NoticeDetailSummary({ summary }: NoticeDetailSummaryProps) {
  const { t } = useTranslation('notice');

  if (!summary || summary.trim().length === 0) return null;

  return (
    <div className="bg-secondary text-primary flex w-full items-start gap-2 rounded-[15px] px-4 py-3.5">
      <SparkleIcon
        weight="fill"
        className="mt-0.5 size-5 shrink-0"
        aria-hidden
      />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-semibold">{t('detail.summary')}</span>
        <p className="text-base leading-relaxed break-words">
          {summary}
        </p>
      </div>
    </div>
  );
}
