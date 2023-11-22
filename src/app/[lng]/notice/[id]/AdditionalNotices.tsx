import dayjs from 'dayjs';

import { Content } from '@/api/notice/notice';
import { PropsWithLng, T } from '@/app/i18next';
import AddIcon from '@/assets/icons/add.svg';
import getLocaleContents from '@/utils/getLocaleContents';

interface AdditionalNoticesProps {
  contents: Content[];
  t: T;
}

const AdditionalNotices = async ({
  contents,
  t,
  lng,
}: AdditionalNoticesProps & PropsWithLng) => {
  const localeContents = getLocaleContents(contents, lng);

  return (
    <div className={'flex flex-col gap-4'}>
      {localeContents.map((content, index) => {
        return index > 0 ? (
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
                {dayjs(content.createdAt).format('LLL')}
              </p>
            </div>

            <div className="ml-8">
              {index > 0 &&
                dayjs(content.deadline).format('LLL') !==
                  dayjs(localeContents[index - 1].deadline).format('LLL') && (
                  <div className="flex items-center gap-3">
                    <p className={'text-base font-bold'}>
                      {t('zabo.additionalNotices.deadlineChanged')}
                    </p>
                    <p className={'text-base font-medium text-secondaryText'}>
                      {dayjs(localeContents[index - 1].deadline).format('LLL')}
                    </p>

                    <p>▶</p>

                    <p className={'text-base font-medium'}>
                      {dayjs(content.deadline).format('LLL')}
                    </p>
                  </div>
                )}
            </div>

            <div className={'mb-3 ml-8 mt-1'}>
              <p className={'text-base'}>{content.body}</p>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default AdditionalNotices;
