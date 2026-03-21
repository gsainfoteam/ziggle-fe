import { useTranslation } from 'react-i18next';

import CloseIcon from '@/assets/icons/close.svg?react';
import { Modal } from '@/common/components/shared/modal';
import { Button } from '@/common/components/ui/button';

import { useWithdrawalFlow } from '../../../viewmodels';

export function WithdrawalModal({
  isOpen,
  close,
  onSuccess,
  onFailure,
}: {
  isOpen: boolean;
  close: () => void;
  onSuccess?: () => void | Promise<void>;
  onFailure?: (error: unknown) => void | Promise<void>;
}) {
  const { t } = useTranslation('auth');
  const { submitWithdrawal } = useWithdrawalFlow({
    onSuccess,
    onFailure,
    close,
  });

  if (!isOpen) return null;

  return (
    <Modal.Root isOpen={isOpen}>
      <Modal.Overlay onClick={close} />
      <Modal.Panel>
        <Modal.Header className="justify-end">
          <button
            onClick={close}
            type="button"
            aria-label="close withdrawal modal"
          >
            <CloseIcon className="h-5 w-5 stroke-greyDark dark:stroke-dark_white" />
          </button>
        </Modal.Header>
        <Modal.Body className="items-center gap-4">
          <Modal.Title>{t('mypage.withdrawal.confirm.title')}</Modal.Title>
          <Modal.Description className="whitespace-pre-wrap">
            {t('mypage.withdrawal.confirm.text')}
          </Modal.Description>
        </Modal.Body>
        <Modal.Actions>
          <div className="mt-2 flex w-full justify-between gap-2.5">
            <Button
              className="flex-1 min-w-0 px-3 py-4 text-sm text-primary border-primary hover:bg-secondary"
              variant="outlined"
              onClick={close}
            >
              {t('mypage.withdrawal.confirm.cancel_btn')}
            </Button>
            <Button
              className="flex-1 min-w-0 px-3 py-4 text-sm text-white bg-primary hover:brightness-90"
              variant="contained"
              onClick={() => {
                void submitWithdrawal();
              }}
            >
              {t('mypage.withdrawal.confirm.ok_btn')}
            </Button>
          </div>
        </Modal.Actions>
      </Modal.Panel>
    </Modal.Root>
  );
}
