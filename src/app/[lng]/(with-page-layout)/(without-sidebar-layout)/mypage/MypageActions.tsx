import { PropsWithLng } from '@/app/i18next';

import ChangeDarkModeBox from './ChangeDarkModeBox';
import ChangeLanguageBox from './ChangeLanguageBox';
import ClientActions from './ClientActions';

export default function MypageActions({ lng }: PropsWithLng) {
  return (
    <div className="flex flex-col gap-3">
      <ChangeLanguageBox lng={lng} />
      <ChangeDarkModeBox lng={lng} />
      <ClientActions lng={lng} />
    </div>
  );
}
