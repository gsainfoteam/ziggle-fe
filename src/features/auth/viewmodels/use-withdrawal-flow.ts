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
    try {
      await withdraw({});
      await onSuccess?.();
    } catch (error) {
      console.error('withdrawal error', error);
      await onFailure?.(error);
    } finally {
      close();
    }
  }, [withdraw, onSuccess, onFailure, close]);

  return { submitWithdrawal };
}
