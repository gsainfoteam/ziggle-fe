import dayjs from 'dayjs';

import { Content } from '@/api/notice/notice';
import { T } from '@/app/i18next';
import PlusIcon from '@/assets/icons/plus.svg';
import getLocaleContents from '@/utils/getLocaleContents';

interface AddtionalNoticesProps {
  contents: Content[];
  t: T;
}

const AddtionalNotices = async ({ contents, t }: AddtionalNoticesProps) => {
  const language = t('lang');
  const localeContents = getLocaleContents(contents, language);

  return (
    <>
      {localeContents.map((content, index) => {
        return index > 0 ? (
          <div
            key={content.id}
            className={'border-2 border-primary rounded-xl'}
          >
            <div className={'flex items-center gap-1'}>
              <PlusIcon />
              <p className={'text-primary font-bold text-lg'}>
                {t('zabo.addtionalNotices')}
              </p>
              <p className={'text-secondaryText font-regular text-base ml-2 '}>
                {dayjs(content.createdAt).format('YYYY.MM.DD')}
              </p>
            </div>

            {index > 0 &&
              dayjs(content.deadline).format('YYYY.MM.DD') !==
                dayjs(localeContents[index - 1].deadline).format(
                  'YYYY.MM.DD',
                ) && (
                <div>
                  <p className={'font-bold text-base'}>
                    {t('zabo.deadlineChanged')}
                  </p>
                  <p className={'text-secondaryText font-medium text-base'}>
                    {dayjs(localeContents[index - 1].deadline).format(
                      'YYYY.MM.DD',
                    )}
                  </p>

                  <p>▶</p>

                  <p className={'font-medium text-base'}>
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

export default AddtionalNotices;
