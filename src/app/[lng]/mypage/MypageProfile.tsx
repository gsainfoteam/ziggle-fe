import { logout, withdraw } from '@/api/auth/auth';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';
import AccountIcon from '@/assets/icons/account.svg';

interface MypageProfileProps {
  name?: string;
  id?: string;
  phone?: string;
  email?: string;
  logout?: string;
  quit?: string;
}

interface UnderLinedTextProps {
  text: string;
  action?: () => void;
}

const UnderLinedText = ({ text, action }: UnderLinedTextProps) => {
  return (
    <form>
      <button
        className="text-regular w-50 text-secondayText m-5 border-b border-gray-500"
        formAction={action}
      >
        {text}
      </button>
    </form>
  );
};

export default async function MypageProfile({
  name,
  id,
  phone,
  email,
  lng,
}: MypageProfileProps & { lng: Locale }) {
  const { t } = await createTranslation(lng, 'translation');
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
          <div className="text-secondayText mb-8 h-8 w-full border-b border-gray-300 pb-10 pl-2 pr-10 text-xl">
            {id}
          </div>
          <div className="text-secondayText mb-0 h-8 w-full border-b border-gray-300 pb-10 pl-2 pr-10 text-xl">
            {email}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <UnderLinedText
            text={t('mypage.logout')}
            action={logout}
          ></UnderLinedText>
          <UnderLinedText
            text={t('mypage.quit')}
            action={withdraw}
          ></UnderLinedText>
        </div>
      </div>
    </div>
  );
}
