import { notFound, redirect } from 'next/navigation';

import { auth } from '@/api/auth/auth';
import { getNotice } from '@/api/notice/get-notice';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import NoticeEditor from './NoticeEditor';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

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
  const notice = searchParams?.noticeId
    ? await getNotice(Number.parseInt(searchParams.noticeId), 'ko')
    : null;
  const englishNotice =
    searchParams?.noticeId && notice?.langs.includes('en')
      ? await getNotice(Number.parseInt(searchParams.noticeId), 'en')
      : null;
  if ((searchParams?.noticeId) && !notice) notFound();

  const isAuthor = userData.user.uuid === notice?.author.uuid;
  if (notice && !isAuthor) redirect(`/${lng}/notice/${notice.id}`);

  return (
    <main className="flex flex-col items-center py-12">
      <div className="content flex max-w-[600px] flex-col">
        <NoticeEditor
          params={{ lng }}
          notice={
            notice
              ? {
                  ...notice,
                  enTitle: englishNotice?.title,
                  enContent: englishNotice?.content,
                }
              : undefined
          }
          isEditMode={isEditMode}
        />
      </div>
    </main>
  );
};

export default WritePage;
