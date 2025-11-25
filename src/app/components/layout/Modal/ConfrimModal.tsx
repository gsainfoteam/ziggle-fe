import { useRouter } from 'next/navigation';

import { useTranslation } from '@/app/i18next/client';
import Check_mark from '@/assets/icons/checkmark.svg';
import Xmark_white from '@/assets/icons/xmark_white.svg';

import Button from '../../shared/Button';
export default function ConfirmModal({
  isOpen,
  unmount,
  lng,
}: {
  isOpen: boolean;
  unmount: () => void;
  lng: 'en' | 'ko';
}) {
  const { t } = useTranslation(lng);

  const router = useRouter();
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50"
      onClick={unmount}
    >
      <div
        className="flex h-[340px] w-[520px] flex-col justify-between  rounded-xl bg-white p-[25px] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={unmount}>
            <Xmark_white />
          </button>
        </div>
        <div className="flex justify-center">
          <Check_mark />
        </div>

        <p className="mb-3 text-center text-xl font-semibold md:text-2xl">
          {t('zigglePolicyModal.confirm.title')}
        </p>
        <p className="text-center">{t('zigglePolicyModal.confirm.text')}</p>
        <div
          className="flex w-full justify-between
        "
        >
          <Button
            className="w-[220px]"
            variant="outlined"
            onClick={() =>
              router.push(
                `https://www.notion.so/infoteam-rulrudino/2025-276365ea27df80f584e5e5d96e923111`,
              )
            }
          >
            {t('zigglePolicyModal.confirm.return')}
          </Button>
          <Button
            className="w-[220px]"
            variant="contained"
            onClick={() => router.push(`/${lng}/home`)}
          >
            {t('zigglePolicyModal.confirm.main')}
          </Button>
        </div>
      </div>
    </div>
  );
}
