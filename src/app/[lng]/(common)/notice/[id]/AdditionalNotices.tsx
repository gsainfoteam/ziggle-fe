import dayjs from 'dayjs';

import { Content, NoticeDetail } from '@/api/notice/notice';
import { PropsWithLng, T } from '@/app/i18next';

interface AdditionalNoticesProps {
  notice: NoticeDetail;
  additionalContents: Content[];
  t: T;
}

const AdditionalNotices = async ({
  notice,
  additionalContents,
  t,
}: AdditionalNoticesProps & PropsWithLng) => {
  return (
    <div className={'flex flex-col gap-[18px]'}>
      {additionalContents.map((content, index) => {
        const timeAgo = dayjs(content.createdAt).fromNow();

        const lastDeadline =
          index > 0 ? additionalContents[index - 1].deadline : notice.deadline;

        const deadlineChanged =
          content.deadline &&
          !dayjs(content.deadline).isSame(dayjs(lastDeadline));

        return (
          <div
            key={`${content.id}+${content.lang}`}
            className="flex flex-col gap-[10px] rounded-[10px] bg-greyLight px-5 py-[18px]"
          >
            <div className="flex items-center gap-[5px]">
              <p className="text-lg font-semibold text-text">
                {t('zabo.additionalNotices.title')}
              </p>
              <p className={'font-bold text-greyDark'}>·</p>
              <p className={'font-medium text-greyDark'}>{timeAgo}</p>
            </div>

            {deadlineChanged && (
              <div className="ml-8">
                <div className="flex items-center gap-3">
                  <p className={'text-base font-bold'}>
                    {t('zabo.additionalNotices.deadlineChanged')}
                  </p>
                  <p className={'text-base font-medium text-secondaryText'}>
                    {dayjs(lastDeadline).tz().isValid()
                      ? dayjs(lastDeadline).tz().format('LLL')
                      : t('zabo.additionalNotices.noDeadline')}
                  </p>

                  <p>▶</p>

                  <p className={'text-base font-medium'}>
                    {dayjs(content.deadline).tz().format('LLL')}
                  </p>
                </div>
              </div>
            )}

            <p className="font-normal leading-[1.4] text-greyDark">
              {content.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalNotices;
