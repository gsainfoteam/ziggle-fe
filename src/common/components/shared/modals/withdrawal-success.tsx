import { Button } from '@/common/components/ui/button';
import { useTranslation } from 'react-i18next';

import CheckIcon from '@/assets/icons/check.svg?react';

import { ModalShell } from './modal-shell';

interface WithdrawalSuccessModalProps {
  isOpen: boolean;
  close: () => void;
  lng: 'ko' | 'en';
  onCloseComplete?: () => void | Promise<void>;
}

export function WithdrawalSuccessModal({
  isOpen,
  close,
  onCloseComplete,
}: WithdrawalSuccessModalProps) {
  const { t } = useTranslation('auth');

  if (!isOpen) return null;

  const handleClose = async () => {
    try {
      await onCloseComplete?.();
    } finally {
      close();
    }
  };

  const handleCloseClick = () => {
    void handleClose();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      close={handleCloseClick}
      header={
        <div className="inline-flex justify-center items-center gap-2.5">
          <div className="size-16 px-3.5 py-6 bg-orange-600 rounded-[32.50px] inline-flex flex-col justify-center items-center gap-2.5">
            <CheckIcon className="h-full" />
          </div>
        </div>
      }
      title={
        <p className="text-center text-xl font-semibold md:text-2xl">
          {t('mypage.withdrawal.success.title')}
        </p>
      }
      description={
        <p className="text-center text-sm text-greyDark">
          {t('mypage.withdrawal.success.text')}
        </p>
      }
      bodyClassName="flex flex-col items-center gap-4"
      actions={
        <div className="flex justify-center">
          <Button
            className="flex-1 whitespace-nowrap py-3 text-base text-white md:py-3.5"
            variant="contained"
            onClick={handleCloseClick}
          >
            {t('mypage.withdrawal.success.goFirst')}
          </Button>
        </div>
      }
    />
  );
}