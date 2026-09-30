import { SparkleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface NoticeDetailSummaryProps {
  summary?: string | null;
}

export function NoticeDetailSummary({ summary }: NoticeDetailSummaryProps) {
  const { t } = useTranslation('notice');

  if (!summary || summary.trim().length === 0) return null;

  return (
    <div className="border-border flex flex-col gap-1.5 border-l-2 py-0.5 pl-3.5">
      <div className="text-subtle flex items-center gap-1">
        <SparkleIcon weight="fill" className="size-3.5 shrink-0" aria-hidden />
        <span className="text-xs font-medium tracking-wide">
          {t('detail.summary')}
        </span>
      </div>
      <p className="text-foreground/80 text-[15px] leading-relaxed text-pretty break-words">
        {summary}
      </p>
    </div>
  );
}
