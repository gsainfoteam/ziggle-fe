'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import {
  attachInternalNotice,
  createAdditionalNotice,
} from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddIcon from '@/assets/icons/add.svg';
import { WarningSwal } from '@/utils/swals';

interface AddAddtionalNoticesProps {
  noticeId: number;
  originallyHasDeadline: string | Dayjs | null;
  supportedLanguage: string[];
}

const AddAdditionalNotice = ({
  noticeId,
  supportedLanguage,
  originallyHasDeadline,
  lng,
}: AddAddtionalNoticesProps & PropsWithLng) => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [alertOption, setAlertOption] = useState<string>('all');
  const [content, setContent] = useState<string>('');
  const [englishContent, setEnglishContent] = useState<string>('');

  const { t } = useTranslation(lng);

  const supportEnglish = supportedLanguage.includes('en');

  const { refresh } = useRouter();

  const warningSwal = WarningSwal(t);

  const handleSubmit = async () => {
    if (!content) {
      warningSwal(t('write.alerts.body'));
      return;
    }

    if (supportEnglish && !englishContent) {
      warningSwal(t('write.alerts.englishBody'));
      return;
    }

    const notice = await createAdditionalNotice({
      noticeId,
      body: content,
      deadline: hasDeadline
        ? deadline ?? undefined
        : dayjs(originallyHasDeadline).toDate(),
    });

    const contents = notice.additionalContents;
    if (!contents) {
      return;
    }
    const contentId = contents[contents.length - 1].id;

    if (notice && contentId && supportEnglish) {
      await attachInternalNotice({
        title: '',
        body: englishContent,
        lang: 'en',
        noticeId,
        contentId,
        deadline: hasDeadline
          ? deadline ?? undefined
          : dayjs(originallyHasDeadline).toDate(),
      });
    }

    setContent('');
    setEnglishContent('');

    Swal.fire({
      icon: 'success',
      title: t('write.alerts.submitSuccess'),
      showConfirmButton: false,
      timer: 1500,
    });

    refresh();
  };

  return (
    <div className={'rounded-xl border-2 border-primary p-4'}>
      <div className={'flex items-center gap-1'}>
        <AddIcon className="w-7 fill-primary" />
        <p className={'text-lg font-bold text-primary'}>
          {t('zabo.additionalNotices.title')}
        </p>
      </div>
      {originallyHasDeadline && (
        <div className={'my-2 ml-8 flex flex-nowrap items-center gap-[10px]'}>
          <Checkbox
            checked={hasDeadline}
            onChange={(event) => {
              setHasDeadline(event.target.checked);
              sendLog(LogEvents.noticeWritingPageCheckDeadline, {
                checked: event.target.checked,
              });
            }}
          >
            <p>{t('zabo.additionalNotices.changeDeadline')}</p>
          </Checkbox>
          {hasDeadline && (
            <DateTimePicker
              onChange={setDeadline}
              value={deadline}
              className="bg-white text-black"
            />
          )}
        </div>
      )}
      <div className={'flex flex-col gap-2'}>
        <div className="ml-8 text-lg font-bold">
          {t('zabo.additionalNotices.koreanAdditionalNotice')}
        </div>
        <div className={'flex w-full'}>
          <textarea
            className={
              'mb-3 ml-8 mt-1 grow resize-none border-none text-base outline-none dark:bg-transparent dark:text-white'
            }
            name={'searchQuery'}
            placeholder={t(
              'zabo.additionalNotices.additionalNoticePlaceholder',
            )}
            rows={3}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </div>

        {supportedLanguage.includes('en') && (
          <div>
            <div className="ml-8 text-lg font-bold">
              {t('zabo.additionalNotices.englishAdditionalNotice')}
            </div>
            <textarea
              className={
                'mb-3 ml-8 mt-1 w-full resize-none border-none text-base outline-none dark:bg-transparent dark:text-white'
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
            />
          </div>
        )}
      </div>

      {/* <AddNoticeRadio
        selected={alertOption}
        onChange={(event) => {
          setAlertOption(event.target.value);
          sendLog(LogEvents.noticeWritingPageCheckDeadline, {
            checked: event.target.checked,
          });
        }}
        t={t}
      /> */}

      <div className={'mt-6 flex justify-center gap-[10px]'}>
        <Button
          className={'h-[40px] w-[133px] bg-secondaryText text-white'}
          variant={'contained'}
        >
          <p className={'font-medium'}>{t('alertResponse.cancel')}</p>
        </Button>
        <Button
          className={'h-[40px] w-[133px]'}
          variant={'contained'}
          onClick={handleSubmit}
        >
          <p className={'font-medium'}>{t('alertResponse.submit')}</p>
        </Button>
      </div>
    </div>
  );
};

export default AddAdditionalNotice;
