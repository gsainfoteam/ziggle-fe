import { useRouter } from 'next/navigation';

import Xmark from '@/app/components/shared/Xmark/Xmark';
import { useTranslation } from '@/app/i18next/client';
import Check_mark from '@/assets/icons/checkmark.svg';

import Button from '../../shared/Button';
export default function ConfirmModal({
  isOpen,
  close,
  lng,
}: {
  isOpen: boolean;
  close: () => void;
  lng: 'en' | 'ko';
}) {
  const { t } = useTranslation(lng);

  const router = useRouter();

  if (!isOpen) return null;
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50">
      <div className="mx-10 flex h-auto max-w-[500px] flex-col justify-between gap-2.5 rounded-[20px] bg-white p-6">
        <div className="flex justify-end">
          <button onClick={close}>
            <Xmark className="text-text dark:text-dark_white" />
          </button>
        </div>

        <div className="flex justify-center">
          <Check_mark />
        </div>
        <p className="mb-3 text-center text-xl font-semibold md:text-2xl">
          {t('zigglePolicyModal.confirm.title')}
        </p>
        <p className="text-center">{t('zigglePolicyModal.confirm.text')}</p>
        <div className="flex min-w-[300px] justify-between gap-2.5">
          <Button
            className="flex-1"
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
            className="flex-1"
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
