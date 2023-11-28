import dayjs from 'dayjs';

import { Content } from '@/api/notice/notice';
import { PropsWithLng, T } from '@/app/i18next';
import AddIcon from '@/assets/icons/add.svg';
import getLocaleContents from '@/utils/getLocaleContents';

interface AdditionalNoticesProps {
  mainContent: Content;
  additionalContents: Content[];
  t: T;
}

const AdditionalNotices = async ({
  mainContent,
  additionalContents,
  t,
  lng,
}: AdditionalNoticesProps & PropsWithLng) => {
  return (
    <div className={'flex flex-col gap-4'}>
      {additionalContents.map((content, index) => {
        const lastDeadline =
          index > 0
            ? additionalContents[index - 1].deadline
            : mainContent.deadline;

        const deadlineChanged = !dayjs(content.deadline).isSame(
          dayjs(lastDeadline),
        );

        return (
          <div
            key={`${content.id}+${content.lang}`}
            className="flex flex-col gap-2.5 rounded-xl border-2 border-primary p-4"
          >
            <div className="flex items-center gap-1">
              <AddIcon className="w-7 fill-primary" />
              <p className="text-lg font-bold text-primary">
                {t('zabo.additionalNotices.title')}
              </p>
              <p className="font-regular ml-2 text-base text-secondaryText">
                {dayjs(content.createdAt).tz().format('LLL')}
              </p>
            </div>

            <div className="ml-8">
              {deadlineChanged && (
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
              )}
            </div>

            <div className={'mb-3 ml-8 mt-1'}>
              <p className={'text-base'}>{content.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalNotices;
