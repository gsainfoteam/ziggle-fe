import Link from 'next/link';

import { auth } from '@/api/auth/auth';
import { Notice } from '@/api/notice/notice';
import { getAllNotices } from '@/api/notice/notice-server';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import ChangeLanguageBox from './ChangeLanguageBox';
import MypageBox from './MypageBox';
import MypageButtons from './MypageButton';
import MypageProfile from './MypageProfile';

export default async function MyPage({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);

  const userData = await auth();

  const remindedNotice: Notice[] = (await getAllNotices({ my: 'reminders' }))
    .list;

  const ownNotice: Notice[] = (
    await getAllNotices({ my: 'own', limit: 5, orderBy: 'recent' })
  ).list;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-10 flex min-w-[550px] flex-col gap-5">
        <MypageProfile
          lng={lng}
          name={userData?.name}
          id={userData?.studentId}
          email={userData?.email}
        />
        <MypageButtons lng={lng} />
        <div className="flex flex-col gap-3">
          <ChangeLanguageBox lng={lng} />

          <Link href="">
            <MypageBox>
              <div className="flex self-stretch text-greyDark dark:text-dark_white">
                {t('mypage.logout')}
              </div>
            </MypageBox>
          </Link>

          <Link href="">
            <MypageBox>
              <div className="flex self-stretch text-greyDark dark:text-dark_white">
                {t('mypage.quit')}
              </div>
            </MypageBox>
          </Link>
        </div>
      </div>
    </div>
  );
}
