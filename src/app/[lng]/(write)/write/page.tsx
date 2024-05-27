import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import * as process from 'node:process';

import { notFound, redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/api/auth/auth';
import { NoticeDetail } from '@/api/notice/notice';
import EditableTimer from '@/app/[lng]/(write)/write/EditableTimer';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import NoticeEditor from './NoticeEditor';

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

  const userData = await auth();
  // if (!userData) redirect(`/${lng}/login`);

  const notice:
    | (NoticeDetail & {
        enTitle?: string;
        enContent?: string;
      })
    | undefined = searchParams?.noticeId
    ? await fetch(
        `http://localhost:${process.env.PORT}/api/notice/${searchParams.noticeId}/full`,
      ).then((res) => (res.ok ? res.json() : undefined))
    : undefined;
  if (!notice) notFound();

  const isEdit = !!searchParams?.noticeId;
  const isAuthor = userData?.user.uuid === notice?.author.uuid;
  if (isEdit && !isAuthor) redirect(`/${lng}/notice/${notice.id}`);

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
