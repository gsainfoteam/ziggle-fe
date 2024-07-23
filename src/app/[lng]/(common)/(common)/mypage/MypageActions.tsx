import { cookies } from 'next/headers';

import { PropsWithLng } from '@/app/i18next';

import ChangeDarkModeBox, { ColorThemeCookie } from './ChangeDarkModeBox';
import ChangeLanguageBox from './ChangeLanguageBox';
import ClientActions from './ClientActions';

export default function MypageActions({ lng }: PropsWithLng) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme') as ColorThemeCookie | undefined;

  return (
    <div className="flex flex-col gap-3">
      <ChangeLanguageBox lng={lng} />
      <ChangeDarkModeBox lng={lng} defaultTheme={theme?.value ?? 'light'} />
      <ClientActions lng={lng} />
    </div>
  );
}
