import { ziggleApi } from '@/api';
import Xmark from '@/app/components/shared/Xmark/Xmark';
import { useTranslation } from '@/app/i18next/client';

import Button from '@/app/components/shared/Button';

export default function WithdrawalModal({
  isOpen,
  close,
  lng,
  onSuccess,
  onWithdraw,
  onFailure,
}: {
  isOpen: boolean;
  close: () => void;
  lng: 'ko' | 'en';
  onSuccess?: () => void | Promise<void>;
  onWithdraw?: () => Promise<void>;
  onFailure?: (error: unknown) => void | Promise<void>;
}) {
  const { t } = useTranslation(lng);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-text/50 dark:bg-dark_white/50">
      <div
        className="mx-10 flex h-auto min-w-[400px] max-w-[500px] flex-col justify-between gap-6 rounded-[20px] bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={close}>
            <Xmark className="text-text dark:text-dark_white" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-xl font-semibold md:text-2xl">
            {t('mypage.withdrawal.confirm.title')}
          </p>
          <p className="whitespace-pre-wrap text-center text-sm text-greyDark">
            {t('mypage.withdrawal.confirm.text')}
          </p>
        </div>

        <div className="mt-2 flex w-full justify-between gap-2.5">
          <Button
            className="flex-1 min-w-0 px-3 py-3 text-sm"
            variant="outlined"
            onClick={close}
          >
            {t('mypage.withdrawal.confirm.cancelBtn')}
          </Button>
          <Button
            className="flex-1 min-w-0 px-3 py-3 text-sm"
            variant="contained"
            onClick={async () => {
              try {
                if (onWithdraw) {
                  await onWithdraw();
                } else {
                  await ziggleApi.delete('/user');
                }
                if (onSuccess) {
                  await onSuccess();
                }
              } catch (error) {
                console.error('withdrawal error', error);
                await onFailure?.(error);
              } finally {
                close();
              }
            }}
          >
            {t('mypage.withdrawal.confirm.okBtn')}
          </Button>
        </div>
      </div>
    </div>
  );
}

