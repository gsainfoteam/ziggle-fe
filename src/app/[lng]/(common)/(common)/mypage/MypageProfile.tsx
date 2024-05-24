import { auth } from '@/api/auth/auth';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import AccountIcon from '@/assets/icons/account.svg';

import { Logout, Withdraw } from './ClientButtons';

export default async function MypageProfile({ lng }: PropsWithLng) {
  const { t } = await createTranslation(lng);
  const session = await auth();
  if (!session) return null;

  const {
    user: { name, studentNumber, email },
  } = session;

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="m-10 text-4xl font-medium">INFO</div>
        <div className="flex flex-col items-center">
          <AccountIcon className="w-48 fill-gray-400" />
          <h3 className="md:text-2.8xl flex items-center justify-center p-10 text-3xl font-bold">
            {name}
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-8 h-8 w-full border-b border-gray-300 pb-10 pl-2 pr-10 text-xl text-secondaryText">
            {studentNumber}
          </div>
          <div className="mb-0 h-8 w-full border-b border-gray-300 pb-10 pl-2 pr-10 text-xl text-secondaryText">
            {email}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <Logout lng={lng} />
          <Withdraw lng={lng} />
        </div>
      </div>
    </div>
  );
}
