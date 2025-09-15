'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
type Props = {
  lng: 'ko' | 'en';
  code: string;
};
export default function ThirdParty({ code, lng }: Props) {
  const router = useRouter();
  useEffect(() => {
    if (code) {
      localStorage.setItem('thirdPartyCode', code);
      const path = localStorage.getItem('redirectPath');
      router.replace(path ? path : `/${lng}/home`);
    } else {
      router.replace(`/${lng}/home`);
    }
  }, [code, lng, router]);

  return null;
}
