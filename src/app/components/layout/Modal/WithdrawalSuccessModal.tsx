import Check_mark from '@/assets/icons/checkmark.svg';
import Button from '@/app/components/shared/Button';
import { useTranslation } from '@/app/i18next/client';

interface WithdrawalSuccessModalProps {
  isOpen: boolean;
  close: () => void;
  lng: 'ko' | 'en';
  onCloseComplete?: () => void | Promise<void>;
}

export default function WithdrawalSuccessModal({
  isOpen,
  close,
  lng,
  onCloseComplete,
}: WithdrawalSuccessModalProps) {
  const { t } = useTranslation(lng);

  if (!isOpen) return null;

  const handleClose = async () => {
    try {
      await onCloseComplete?.();
    } finally {
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-text/50 dark:bg-dark_white/50"
      onClick={handleClose}
    >
      <div
        className="mx-10 flex h-auto min-w-[400px] max-w-[500px] flex-col justify-between gap-6 rounded-[20px] bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center">
            <Check_mark />
          </div>
          <p className="mt-2 text-center text-xl font-semibold md:text-2xl">
            {t('mypage.withdrawal.success.title')}
          </p>
          <p className="text-center text-sm text-greyDark">
            {t('mypage.withdrawal.success.text')}
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            className="flex-1 whitespace-nowrap py-3 text-base md:py-3.5"
            variant="contained"
            onClick={handleClose}
          >
            {t('mypage.withdrawal.success.goFirst')}
          </Button>
        </div>
      </div>
    </div>
  );
}

