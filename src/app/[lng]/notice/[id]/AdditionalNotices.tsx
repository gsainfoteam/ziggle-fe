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
    <>
      {localeContents.map((content, index) => {
        return index > 0 ? (
          <div
            key={content.id}
            className={'rounded-xl border-2 border-primary'}
          >
            <div className={'flex items-center gap-1'}>
              <AddIcon className='fill-primary w-7'/>
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

            <p className={'text-base'}>{content.body}</p>
          </div>
        ) : null;
      })}
    </>
  );
};

export default AdditionalNotices;
