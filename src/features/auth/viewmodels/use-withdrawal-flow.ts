import { useCallback, useRef, useState } from 'react';

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
  const [isPending, setIsPending] = useState(false);
  const inFlightRef = useRef(false);

  const submitWithdrawal = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setIsPending(true);

    try {
      try {
        await withdraw({});
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
        await onSuccess?.();
      } finally {
        close();
      }
    } finally {
      inFlightRef.current = false;
      setIsPending(false);
    }
  }, [withdraw, onSuccess, onFailure, close]);

  return { submitWithdrawal, isPending };
}
