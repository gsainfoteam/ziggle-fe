'use client';

import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

interface UnderLinedTextProps {
  text: string;
  action?: () => void;
}

const UnderLinedText = ({ text, action }: UnderLinedTextProps) => {
  return (
    <button
      className="text-regular w-50 m-5 border-b border-gray-500 text-secondaryText"
      onClick={action}
    >
      {text}
    </button>
  );
};
export const Logout = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  return (
    <UnderLinedText
      text={t('mypage.logout')}
      action={() => signOut({ callbackUrl: '/' })}
    ></UnderLinedText>
  );
};

export const Withdraw = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  return (
    <UnderLinedText
      text={t('mypage.quit')}
      action={() => window.open(process.env.NEXT_PUBLIC_IDP_BASE_URL)}
    ></UnderLinedText>
  );
};
