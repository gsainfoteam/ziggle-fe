'use client';

import { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Editor, Editor as TinyMCEEditorRef } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { ATTACH_INTERNATIONAL_NOTICE } from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import ContentIcon from '@/assets/icons/content.svg';
import { WarningSwal } from '@/utils/swals';

import { apolloClient } from '../../InitClient';

interface WriteEnglishNoticeProps {
  noticeId: number;
  deadline: string | Dayjs | null;
}

const DynamicTinyMCEEditor = dynamic(
  () => import('../../write/TinyMCEEditor'),
  {
    ssr: false,
  },
);

const WriteEnglishNotice = ({
  noticeId,
  deadline,
  lng,
}: WriteEnglishNoticeProps & { lng: Locale }) => {
  const { t } = useTranslation(lng);

  const [title, setTitle] = useState<string>('');

  const englishEditorRef = useRef<Editor>(null);

  const { refresh } = useRouter();

  const handleSubmit = async () => {
    const englishContent = englishEditorRef.current?.getContent();

    if (!englishContent) {
      WarningSwal(t('write.alerts.body'));
      return;
    }

    await apolloClient.mutate({
      mutation: ATTACH_INTERNATIONAL_NOTICE,
      variables: {
        contentId: 1,
        noticeId,
        title,
        body: englishContent,
        lang: 'en',
        deadline,
      },
    });

    Swal.fire({
      text: t('write.alerts.submitSuccess'),
      icon: 'success',
      confirmButtonText: t('alertResponse.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        refresh();
      }
    });
  };

  return (
    <div className={'rounded-xl border-2 border-primary p-4'} id={'writeEn'}>
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

      <DynamicTinyMCEEditor editorRef={englishEditorRef} />

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
