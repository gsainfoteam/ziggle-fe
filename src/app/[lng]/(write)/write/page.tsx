import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import React from 'react';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import NoticeEditor from './NoticeEditor';
import { NoticeDetail } from '@/api/notice/notice';
import * as process from 'node:process';
import EditableTimer from '@/app/[lng]/(write)/write/EditableTimer';

const WritePage = async ({
  params: { lng },
  searchParams,
}: {
  params: PropsWithLng;
  searchParams?: {
    noticeId?: string;
  };
}) => {
  const { t } = await createTranslation(lng);

  const isEdit = !!searchParams?.noticeId;
  const notice:
    | (NoticeDetail & {
        enTitle?: string;
        enContent?: string;
      })
    | undefined = searchParams?.noticeId
    ? await fetch(
        `http://localhost:${process.env.PORT}/api/notice/${searchParams.noticeId}/full`,
      ).then((res) => res.json())
    : undefined;

  return (
    <main className="flex flex-col items-center py-12">
      <div className="content flex max-w-[600px] flex-col">
        {notice?.createdAt && (
          <EditableTimer createdAt={notice.createdAt} lng={lng} />
        )}
        <p
          className={
            'mt-[10px] rounded-[15px] bg-greyLight px-5 py-[15px] text-lg text-greyDark'
          }
        >
          {t('write.editDescription')}
        </p>

        <NoticeEditor
          params={{ lng }}
          searchParams={searchParams}
          notice={notice}
        />
      </div>
    </main>
  );
};

export default WritePage;
