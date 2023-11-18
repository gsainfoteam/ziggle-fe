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
}

const UnderLinedText = ({ text }: UnderLinedTextProps) => {
  return (
    <div className="text-regular m-5 border-b border-gray-500 w-50 text-secondayText">
      {text}
    </div>
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
        <div className="text-4xl font-medium m-10">INFO</div>
        <div className="flex flex-col items-center">
          <AccountIcon className="fill-gray-400 w-48" />
          <h3 className="text-3xl md:text-2.8xl font-bold p-10 flex justify-center items-center">
            {name}
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-8 text-secondayText text-xl border-b border-gray-300 pb-10 pl-2 pr-10 w-full mb-8">
            {id}
          </div>
          <div className="h-8 text-secondayText text-xl border-b border-gray-300 pb-10 pl-2 pr-10 w-full mb-0">
            {email}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <UnderLinedText text={t('mypage.logout')}></UnderLinedText>
          <UnderLinedText text={t('mypage.quit')}></UnderLinedText>
        </div>
      </div>
    </div>
  );
}
