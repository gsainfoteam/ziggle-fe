import { useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';

import { ziggleApi } from '@/api';
import { useTranslation } from '@/app/i18next/client';
import Xmark_white from '@/assets/icons/xmark_white.svg';

import Button from '../../shared/Button';
import PolicyModal from './PolicyModal';

export default function CautionModal({
  isOpen,
  unmount,
  unmountPolicy,
  lng,
}: {
  isOpen: boolean;
  unmount: () => void;
  unmountPolicy: () => void;
  lng: 'en' | 'ko';
}) {
  const { t } = useTranslation(lng);

  const deleteUser = async () => {
    await ziggleApi.delete('/user');
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50"
      onClick={unmount}
    >
      <div
        className="flex h-[246px] w-[520px] flex-col justify-between  rounded-xl bg-white p-[25px] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={unmount}>
            <Xmark_white />
          </button>
        </div>
        <p className="mb-3 text-center text-xl font-semibold md:text-2xl">
          {t('zigglePolicyModal.caution.title')}
        </p>
        <p className="text-center">
          {t('zigglePolicyModal.caution.description')}
        </p>

        <div
          className="flex w-full justify-between
        "
        >
          <Button
            className="w-[220px]"
            variant="outlined"
            onClick={() => {
              deleteUser();
              unmountPolicy();
              unmount();
            }}
          >
            {t('zigglePolicyModal.caution.rejectButton')}
          </Button>
          <Button
            className="w-[220px]"
            variant="contained"
            onClick={() => {
              unmount();
              overlay.open(({ unmount }) => {
                return <PolicyModal unmount={unmount} lng={lng} />;
              });
            }}
          >
            {t('zigglePolicyModal.caution.returnButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}
