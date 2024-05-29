import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import * as process from 'node:process';

import { notFound, redirect } from 'next/navigation';
import Swal from 'sweetalert2';

import { auth } from '@/api/auth/auth';
import { NoticeDetail } from '@/api/notice/notice';
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
  if (!userData) redirect(`/${lng}/login`);

  const isEditMode = !!searchParams?.noticeId;
  const notice:
    | (NoticeDetail & {
        enTitle?: string;
        enContent?: string;
      })
    | undefined = searchParams?.noticeId
    ? await fetch(
        `http://localhost:${process.env.PORT}/api/notice/${searchParams.noticeId}/full`,
      )
        .then((res) => (res.ok ? res.json() : undefined))
        .catch
        // redirect to 404 if notice is not found
        ()
    : undefined;
  if (searchParams?.noticeId && !notice) notFound();

  const isAuthor = userData.user.uuid === notice?.author.uuid;
  if (notice && !isAuthor) redirect(`/${lng}/notice/${notice.id}`);

  return (
    <main className="flex flex-col items-center py-12">
      <div className="content flex max-w-[600px] flex-col">
        <NoticeEditor
          params={{ lng }}
          notice={notice}
          isEditMode={isEditMode}
        />
      </div>
    </main>
  );
};

export default WritePage;
