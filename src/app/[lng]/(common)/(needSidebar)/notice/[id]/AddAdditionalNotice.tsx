'use client';

import { Dayjs } from 'dayjs';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddIcon from '@/assets/icons/add.svg';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

interface AddAdditionalNoticesProps {
  noticeId: number;
  originallyHasDeadline: string | Dayjs | null;
  koreanContent: string;
  englishContent?: string;
  onKoreanContentChange: (value: string) => void;
  onEnglishContentChange?: (value: string) => void;
}

const AddAdditionalNotice = ({
  koreanContent, 
  englishContent, 
  onKoreanContentChange, 
  onEnglishContentChange, 
  lng,
}: AddAdditionalNoticesProps & PropsWithLng) => {
  const { t } = useTranslation(lng);

  const isEnglishSupported = englishContent !== undefined && onEnglishContentChange !== undefined

  return (
    <div className={'flex flex-col'}>
      <div className={'mb-2 flex items-center gap-3'}>
        <AddIcon className={'w-5 stroke-text md:w-6 dark:stroke-dark_white'} />

        <p className="text-lg font-medium">
          {t('zabo.additionalNotices.title')}
        </p>
      </div>

      <textarea
        className={
          'mb-3 mt-1 grow resize-none rounded-[10px] border border-solid border-primary p-4 text-base bg-transparent dark:text-white'
        }
        name={'searchQuery'}
        placeholder={t('zabo.additionalNotices.additionalNoticePlaceholder')}
        rows={3}
        value={koreanContent}
        onChange={(event) => {
          onKoreanContentChange(event.target.value);
        }}
      />

      {isEnglishSupported && (
        <textarea
          className={
            'mb-3 mt-1 grow resize-none rounded-[10px] border border-solid border-primary p-4 text-base bg-transparent dark:text-white'
          }
          name={'searchQuery'}
          placeholder={t(
            'zabo.additionalNotices.enAdditionalNoticePlaceholder',
          )}
          rows={3}
          value={englishContent}
          onChange={(event) => {
            onEnglishContentChange(event.target.value);
          }}
        />
      )}
    </div>
  );
};

export default AddAdditionalNotice;
