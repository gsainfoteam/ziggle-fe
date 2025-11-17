import { PropsWithLng } from '@/app/i18next';

import ClientActions from './ClientActions';

export default function MypageActions({ lng }: PropsWithLng) {
  return (
    <div className="flex flex-col gap-3">
      <ClientActions lng={lng} />
    </div>
  );
}
