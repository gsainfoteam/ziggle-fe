'use client';
import { redirect } from 'next/navigation';
type Props = {
  lng: 'ko' | 'en';
  code: string;
};
export default function ThirdParty({ code, lng }: Props) {
  if (code && typeof code === 'string') {
    localStorage.setItem('thirdPartycode', code);
    const path = localStorage.getItem('redirectPath');
    redirect(path ? path : `/${lng}/home`);
  } else {
    redirect(`/${lng}/home`);
  }
  return <div></div>;
}
