import { auth } from '@/api/auth/auth';
import { Notice } from '@/api/notice/notice';
import { getAllNotices } from '@/api/notice/notice-server';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import MypageProfile from './MypageProfile';
import MypageTable from './MypageTable';

export default async function MyPage({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);
  const userData = await auth();
  const remindedNotice: Notice[] = (
    await getAllNotices({ my: 'reminders', lang: lng })
  ).list;
  const ownNotice: Notice[] = (
    await getAllNotices({ my: 'own', limit: 5, orderBy: 'recent', lang: lng })
  ).list;
  return (
    <>
      <div className="h-1500 xl:h-1000 mt-10 flex w-full flex-col items-center justify-center gap-20 xl:flex-row">
        <div className="relative m-10 flex flex-col">
          <MypageProfile
            lng={lng}
            name={userData?.name ?? ''}
            id={userData?.uuid ?? ''}
            email={userData?.email ?? ''}
          />
        </div>
        <div className="my-5 flex flex-col items-center justify-center">
          <div className="xl:p-50 mb-10 p-0">
            <MypageTable
              lng={lng}
              title={t('mypage.myNotice')}
              articles={ownNotice}
              link={`/${lng}/section/written`}
            />
          </div>
          <div className="xl:p-50 p-0">
            <MypageTable
              lng={lng}
              title={t('mypage.remindNotice')}
              articles={remindedNotice}
              link={`/${lng}/section/reminded`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
