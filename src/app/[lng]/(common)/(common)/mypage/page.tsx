'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Button from '@/app/components/atoms/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import ChangeLanguageBox from './ChangeLanguageBox';
import MypageBox from './MypageBox';
import MypageButtons from './MypageButton';
import MypageProfile from './MypageProfile';

export default function MyPage({ params: { lng } }: { params: PropsWithLng }) {
  const { t } = useTranslation(lng);

  const { data: sessionData } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleWithdrawal = () => {
    window.open(process.env.NEXT_PUBLIC_IDP_BASE_URL);
  };

  // const remindedNotice: Notice[] = (await getAllNotices({ my: 'reminders' }))
  //   .list;

  // const ownNotice: Notice[] = (
  //   await getAllNotices({ my: 'own', limit: 5, orderBy: 'recent', lang: lng })
  // ).list;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 flex flex-col gap-5">
        <MypageProfile
          lng={lng}
          name={sessionData?.user.name}
          id={sessionData?.user.studentNumber}
          email={sessionData?.user.email}
        />

        <MypageButtons lng={lng} />

        <div className="flex flex-col gap-3">
          <ChangeLanguageBox lng={lng} />

          <Button onClick={handleSignOut}>
            <MypageBox>
              <div className="flex self-stretch text-greyDark dark:text-dark_white">
                {t('mypage.logout')}
              </div>
            </MypageBox>
          </Button>

          <Button onClick={handleWithdrawal}>
            <MypageBox>
              <div className="flex self-stretch text-greyDark dark:text-dark_white">
                {t('mypage.quit')}
              </div>
            </MypageBox>
          </Button>
        </div>
      </div>
    </div>
  );
}
