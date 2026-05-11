import { useEffect } from 'react';

let bodyScrollLockCount = 0;
let originalOverflow = '';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock) return;

    if (bodyScrollLockCount === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    bodyScrollLockCount++;

    return () => {
      bodyScrollLockCount--;
      if (bodyScrollLockCount === 0) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [lock]);
};
