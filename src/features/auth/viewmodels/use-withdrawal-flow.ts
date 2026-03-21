import { useCallback } from 'react';

import { useWithdraw } from './queries';

export function useWithdrawalFlow({
  onSuccess,
  onFailure,
  close,
}: {
  onSuccess?: () => void | Promise<void>;
  onFailure?: (error: unknown) => void | Promise<void>;
  close: () => void;
}) {
  const { mutateAsync: withdraw } = useWithdraw();

  const submitWithdrawal = useCallback(async () => {
    let isSuccess = false;

    try {
      await withdraw({});
      isSuccess = true;
    } catch (error) {
      console.error('withdrawal error', error);
      try {
        await onFailure?.(error);
      } finally {
        close();
      }
      return;
    }

    try {
      if (isSuccess) {
        await onSuccess?.();
      }
    } finally {
      close();
    }
  }, [withdraw, onSuccess, onFailure, close]);

  return { submitWithdrawal };
}
