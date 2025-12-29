import { overlay } from 'overlay-kit';

import { ziggleApi } from '@/api';
import Xmark from '@/app/components/shared/Xmark/Xmark';
import { useTranslation } from '@/app/i18next/client';

import Button from '../../shared/Button';
import PolicyModal from './PolicyModal';

export default function CautionModal({
  isOpen,
  close,
  PolicyModalId,
  lng,
}: {
  isOpen: boolean;
  close: () => void;
  PolicyModalId: string;
  lng: 'en' | 'ko';
}) {
  const { t } = useTranslation(lng);

  if (!isOpen) return null;
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50">
      <div
        className="mx-10 flex h-auto min-w-[400px] max-w-[500px] flex-col justify-between gap-2.5 rounded-[20px] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={close}>
            <Xmark className="text-text dark:text-dark_white" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <p className="mb-3 text-center text-xl font-semibold md:text-2xl">
            {t('zigglePolicyModal.caution.title')}
          </p>
          <p className="whitespace-pre-wrap text-center">
            {t('zigglePolicyModal.caution.description')}
          </p>

          <div className="flex w-full justify-between gap-2.5">
            <Button
              className="flex-1"
              variant="outlined"
              onClick={async () => {
                await ziggleApi.delete('/user');
                close();
              }}
            >
              {t('zigglePolicyModal.caution.rejectButton')}
            </Button>
            <Button
              className="flex-1"
              variant="contained"
              onClick={() => {
                close();
                overlay.open(({ isOpen, close }) => {
                  return (
                    <PolicyModal
                      isOpen={isOpen}
                      close={close}
                      lng={lng}
                      overlayId={PolicyModalId}
                    />
                  );
                });
              }}
            >
              {t('zigglePolicyModal.caution.returnButton')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
