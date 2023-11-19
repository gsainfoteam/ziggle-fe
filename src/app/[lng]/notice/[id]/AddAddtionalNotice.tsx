'use client';

import { useState } from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Button from '@/app/components/atoms/Button';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import { useTranslation } from '@/app/i18next/client';
import PlusIcon from '@/assets/icons/plus.svg';

import AddNoticeRadio from './AddNoticeRadio';

interface AddAddtionalNoticesProps {
  noticeId: number;
  supportLanguage: string[];
}

const AddAddtionalNotice = ({
  noticeId,
  supportLanguage,
}: AddAddtionalNoticesProps) => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>();
  const [alertOption, setAlertOption] = useState<string>('all');
  const [content, setContent] = useState<string>('');
  const [englishContent, setEnglishContent] = useState<string>('');

  const { t } = useTranslation();

  const handleSubmit = () => {};

  return (
    <div className={'rounded-xl border-2 border-primary p-4'}>
      <div className={'flex items-center gap-1'}>
        <PlusIcon />
        <p className={'text-lg font-bold text-primary'}>
          {t('zabo.addtionalNotices')}
        </p>
      </div>
      <div className={'m-[10px] flex items-center gap-[10px]'}>
        <Checkbox
          checked={hasDeadline}
          onChange={(event) => {
            setHasDeadline(event.target.checked);
            sendLog(LogEvents.noticeWritingPageCheckDeadline, {
              checked: event.target.checked,
            });
          }}
        >
          <p>마감일 변경하기</p>
        </Checkbox>
        {hasDeadline && (
          <input
            className={
              'border-none text-lg font-medium text-primary outline-none'
            }
            type={'date'}
            value={deadline}
            onChange={(event) => {
              setDeadline(event.target.value);
              sendLog(LogEvents.noticeWritingPageSetDeadline, {
                deadline: event.target.value,
              });
            }}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            onClick={(event: React.MouseEvent<HTMLInputElement>) => {
              // @ts-ignore
              event.target.showPicker();
            }}
          />
        )}
      </div>
      <div className={'flex'}>
        <textarea
          className={'w-full border-none text-xl outline-none'}
          name={'searchQuery'}
          placeholder={t('zabo.additionalNoticePlaceholder')}
          rows={3}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />

        {supportLanguage.includes('en') && (
          <textarea
            className={'w-full border-none text-xl outline-none'}
            name={'searchQuery'}
            placeholder={t('zabo.additionalNoticePlaceholder')}
            rows={3}
            value={englishContent}
            onChange={(event) => {
              setEnglishContent(event.target.value);
            }}
          />
        )}
      </div>

      <AddNoticeRadio
        selected={alertOption}
        onChange={(event) => {
          setAlertOption(event.target.value);
          sendLog(LogEvents.noticeWritingPageCheckDeadline, {
            checked: event.target.checked,
          });
        }}
      />

      <div className={'mt-6 flex justify-center gap-[10px]'}>
        <Button
          className={'h-[40px] w-[133px] bg-secondaryText text-white'}
          variant={'contained'}
        >
          <p className={'font-medium'}>취소하기</p>
        </Button>
        <Button
          className={'h-[40px] w-[133px]'}
          variant={'contained'}
          onClick={handleSubmit}
        >
          <p className={'font-medium'}>제출하기</p>
        </Button>
      </div>
    </div>
  );
};

export default AddAddtionalNotice;
