import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import type { AdditionalContent, NoticeDetail } from '../../models';

interface AdditionalNoticesProps {
  notice: NoticeDetail;
  additionalContents: AdditionalContent[];
}

export const AdditionalNotices = ({
  notice,
  additionalContents,
}: AdditionalNoticesProps) => {
  const { t } = useTranslation('notice');

  return (
    <div className="flex flex-col gap-[18px]">
      {additionalContents.map((content, index) => {
        const timeAgo = dayjs(content.createdAt).fromNow();

        const lastDeadline =
          additionalContents[index - 1]?.deadline ?? notice.deadline;

        const deadlineChanged =
          content.deadline &&
          !dayjs(content.deadline).isSame(dayjs(lastDeadline));

        return (
          <div
            key={`${content.id}+${content.lang}`}
            className="bg-greyLight flex flex-col gap-[10px] rounded-[10px] px-5 py-[18px]"
          >
            <div className="flex items-center gap-[5px]">
              <p className="text-text text-lg font-semibold">
                {t('zabo.additionalNotices.title')}
              </p>
              <p className="text-greyDark font-bold">·</p>
              <p className="text-greyDark font-medium">{timeAgo}</p>
            </div>

            {deadlineChanged && (
              <div className="ml-8">
                <div className="flex items-center gap-3">
                  <p className="text-base font-bold">
                    {t('zabo.additionalNotices.deadlineChanged')}
                  </p>
                  <p className="text-secondaryText text-base font-medium">
                    {dayjs(lastDeadline).tz().isValid()
                      ? dayjs(lastDeadline).tz().format('LLL')
                      : t('zabo.additionalNotices.noDeadline')}
                  </p>

                  <p>▶</p>

                  <p className="text-base font-medium">
                    {dayjs(content.deadline).tz().format('LLL')}
                  </p>
                </div>
              </div>
            )}

            <p className="text-greyDark leading-[1.4] font-normal">
              {content.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};
