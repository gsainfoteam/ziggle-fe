import dayjs from 'dayjs';

import { Content } from '@/api/notice/notice';
import { T } from '@/app/i18next';
import AddIcon from '@/assets/icons/add.svg';
import getLocaleContents from '@/utils/getLocaleContents';

interface AdditionalNoticesProps {
  contents: Content[];
  t: T;
}

const AdditionalNotices = async ({ contents, t }: AdditionalNoticesProps) => {
  const language = t('lang');
  const localeContents = getLocaleContents(contents, language);

  return (
    <div className={'flex flex-col gap-4'}>
      {localeContents.map((content, index) => {
        return index > 0 ? (
          <div
            key={`${content.id}+${content.lang}`}
            className={'rounded-xl border-2 border-primary'}
          >
            <div className={'flex items-center gap-1'}>
              <AddIcon className="w-7 fill-primary" />
              <p className={'text-lg font-bold text-primary'}>
                {t('zabo.additionalNotices.title')}
              </p>
              <p className={'font-regular ml-2 text-base text-secondaryText '}>
                {dayjs(content.createdAt).format('YYYY.MM.DD')}
              </p>
            </div>

            {index > 0 &&
              dayjs(content.deadline).format('YYYY.MM.DD') !==
                dayjs(localeContents[index - 1].deadline).format(
                  'YYYY.MM.DD',
                ) && (
                <div>
                  <p className={'text-base font-bold'}>
                    {t('zabo.additionalNotices.deadlineChanged')}
                  </p>
                  <p className={'text-base font-medium text-secondaryText'}>
                    {dayjs(localeContents[index - 1].deadline).format(
                      'YYYY.MM.DD',
                    )}
                  </p>

                  <p>▶</p>

                  <p className={'text-base font-medium'}>
                    {dayjs(content.deadline).format('YYYY.MM.DD')}
                  </p>
                </div>
              )}

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
