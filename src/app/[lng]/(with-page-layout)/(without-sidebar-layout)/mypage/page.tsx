import { redirect } from 'next/navigation';

import { auth } from '@/api/auth/auth';
import { PropsWithLng } from '@/app/i18next';

import MypageActions from './MypageActions';
import MypageButtons from './MypageButton';
import MypageProfile from './MypageProfile';

export default async function MyPage({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const session = await auth();

  if (!session) redirect(`/${lng}/login`);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex min-w-full flex-col gap-5 p-4 md:min-w-[500px]">
        <MypageProfile
          lng={lng}
          name={session.user.name}
          id={session.user.studentNumber}
          email={session.user.email}
        />
        <MypageButtons lng={lng} />
        <MypageActions lng={lng} />
      </div>
    </div>
  );
}
