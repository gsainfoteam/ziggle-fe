import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import type { AdditionalContent } from '@/features/notice/models';

interface AdditionalNoticesProps {
  /** Original deadline of the notice, used to detect deadline changes in additional contents. */
  originalDeadline?: string | null;
  additionalContents: AdditionalContent[];
}

export const NoticeDetailAdditionalNotices = ({
  originalDeadline,
  additionalContents,
}: AdditionalNoticesProps) => {
  const { t } = useTranslation('notice');

  return (
    <div className="flex flex-col gap-4.5">
      {additionalContents.map((content, index) => {
        const timeAgo = dayjs(content.createdAt).fromNow();

        const lastDeadline =
          additionalContents[index - 1]?.deadline ?? originalDeadline;

        const deadlineChanged =
          content.deadline &&
          !dayjs(content.deadline).isSame(dayjs(lastDeadline));

        return (
          <div
            key={`${content.id}+${content.lang}`}
            className="bg-muted flex flex-col gap-2.5 rounded-[10px] px-5 py-4.5"
          >
            <div className="flex items-center gap-1.25">
              <p className="text-foreground text-lg font-semibold">
                {t('detail.additional_notices.title')}
              </p>
              <p className="text-muted-foreground font-bold">·</p>
              <p className="text-muted-foreground font-medium">{timeAgo}</p>
            </div>

            {deadlineChanged && (
              <div className="ml-8">
                <div className="flex items-center gap-3">
                  <p className="text-base font-bold">
                    {t('detail.additional_notices.deadline_changed')}
                  </p>
                  <p className="text-subtle text-base font-medium">
                    {dayjs(lastDeadline).tz().isValid()
                      ? dayjs(lastDeadline).tz().format('LLL')
                      : t('detail.additional_notices.no_deadline')}
                  </p>

                  <p>▶</p>

                  <p className="text-base font-medium">
                    {dayjs(content.deadline).tz().format('LLL')}
                  </p>
                </div>
              </div>
            )}

            <p className="text-muted-foreground leading-[1.4] font-normal">
              {content.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};
