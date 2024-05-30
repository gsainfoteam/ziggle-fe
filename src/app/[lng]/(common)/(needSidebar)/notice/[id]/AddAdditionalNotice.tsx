'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import { Dayjs } from 'dayjs';
import { RefObject, useState } from 'react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddIcon from '@/assets/icons/add.svg';

interface AddAdditionalNoticesProps {
  noticeId: number;
  originallyHasDeadline: string | Dayjs | null;
  supportedLanguage: string[];
  koreanRef: RefObject<HTMLTextAreaElement>;
  englishRef: RefObject<HTMLTextAreaElement>;
}

const AddAdditionalNotice = ({
  koreanRef,
  englishRef,
  noticeId,
  supportedLanguage,
  originallyHasDeadline,
  lng,
}: AddAdditionalNoticesProps & PropsWithLng) => {
  const [content, setContent] = useState<string>('');
  const [englishContent, setEnglishContent] = useState<string>('');

  const { t } = useTranslation(lng);

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
          'mb-3 mt-1 grow resize-none rounded-[10px] border border-solid border-primary p-4 text-base dark:bg-transparent dark:text-white'
        }
        name={'searchQuery'}
        placeholder={t('zabo.additionalNotices.additionalNoticePlaceholder')}
        rows={3}
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        ref={koreanRef}
      />

      {supportedLanguage.includes('en') && (
        <textarea
          className={
            'mb-3 mt-1 grow resize-none rounded-[10px] border border-solid border-primary p-4 text-base dark:bg-transparent dark:text-white'
          }
          name={'searchQuery'}
          placeholder={t(
            'zabo.additionalNotices.enAdditionalNoticePlaceholder',
          )}
          rows={3}
          value={englishContent}
          onChange={(event) => {
            setEnglishContent(event.target.value);
          }}
          ref={englishRef}
        />
      )}
    </div>
  );
};

export default AddAdditionalNotice;
