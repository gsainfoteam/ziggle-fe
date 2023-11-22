'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Editor as TinyMCEEditorRef } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Button from '@/app/components/atoms/Button';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import ContentIcon from '@/assets/icons/content.svg';

interface WriteEnglishNoticeProps {
  noticeId: number;
}

const DynamicTinyMCEEditor = dynamic(
  () => import('../../write/TinyMCEEditor'),
  {
    ssr: false,
  },
);

const WriteEnglishNotice = ({
  noticeId,
  lng,
}: WriteEnglishNoticeProps & { lng: Locale }) => {
  const { t } = useTranslation(lng);

  const [title, setTitle] = useState<string>('');

  const handleSubmit = () => {};

  const editorRef = useRef<TinyMCEEditorRef | null>(null);

  return (
    <div className={'rounded-xl border-2 border-primary p-4'}>
      <div className={'flex items-center gap-1'}>
        <ContentIcon className="w-7 fill-primary" />
        <p className={'text-lg font-bold text-primary'}>
          {t('zabo.writeEnglishNotice.title')}
        </p>
      </div>

      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="content mb-4 mt-4 w-full p-0 text-2xl font-bold outline-none dark:bg-transparent"
        type="text"
        placeholder={t('zabo.writeEnglishNotice.writeTitle')}
      />

      <DynamicTinyMCEEditor editorRef={editorRef} />

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

export default WriteEnglishNotice;
