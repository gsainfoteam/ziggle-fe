'use client';

import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Editor } from 'tinymce';

import { attachInternationalNotice } from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import ContentIcon from '@/assets/icons/content.svg';
import { WarningSwal } from '@/utils/swals';

interface WriteEnglishNoticeProps {
  noticeId: number;
  deadline: string | Dayjs | null;
}

const DynamicTinyMCEEditor = dynamic(
  () => import('../../../../(write)/write/TinyMCEEditor'),
  {
    ssr: false,
  },
);

const WriteEnglishNotice = ({
  noticeId,
  deadline,
  lng,
}: WriteEnglishNoticeProps & PropsWithLng) => {
  const { t } = useTranslation(lng);

  const [title, setTitle] = useState<string>('');

  const englishEditorRef = useRef<Editor>(null);

  const { refresh } = useRouter();

  const warningSwal = WarningSwal(t);

  const handleSubmit = async () => {
    const englishContent = englishEditorRef.current?.getContent();

    if (!englishContent) {
      warningSwal(t('write.alerts.body'));
      return;
    }

    await attachInternationalNotice({
      contentId: 1,
      noticeId,
      title,
      body: englishContent,
      lang: 'en',
      deadline: dayjs(deadline).toDate(),
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
