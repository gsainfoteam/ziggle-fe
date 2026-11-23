/** @vitest-environment jsdom */

import { AccountError } from '@infoteam/account-react';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useAccountMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock('@infoteam/account-react', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useAccount: () => useAccountMock(),
}));

const t = (key: string) => key;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t }),
}));

vi.mock('sonner', () => ({
  toast: { error: (...args: unknown[]) => toastErrorMock(...args) },
}));

describe('useAccountErrorToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    ['verification_required', 'errors.login_verification_required'],
    ['session_rejected', 'errors.login_rejected'],
    ['invalid_ticket', 'errors.login_expired'],
    ['network_error', 'errors.login_network'],
    ['invalid_grant', 'errors.login_failed'],
  ] as const)('shows the message for %s', async (code, key) => {
    useAccountMock.mockReturnValue({ error: new AccountError(code) });

    const { useAccountErrorToast } = await import('./use-account-error-toast');
    renderHook(() => useAccountErrorToast());

    expect(toastErrorMock).toHaveBeenCalledWith(key);
  });

  it('stays quiet when the user cancelled at the IdP', async () => {
    useAccountMock.mockReturnValue({
      error: new AccountError('access_denied'),
    });

    const { useAccountErrorToast } = await import('./use-account-error-toast');
    renderHook(() => useAccountErrorToast());

    expect(toastErrorMock).not.toHaveBeenCalled();
  });

  it('stays quiet without an error', async () => {
    useAccountMock.mockReturnValue({ error: null });

    const { useAccountErrorToast } = await import('./use-account-error-toast');
    renderHook(() => useAccountErrorToast());

    expect(toastErrorMock).not.toHaveBeenCalled();
  });

  it('shows each error once', async () => {
    useAccountMock.mockReturnValue({
      error: new AccountError('network_error'),
    });

    const { useAccountErrorToast } = await import('./use-account-error-toast');
    const { rerender } = renderHook(() => useAccountErrorToast());
    rerender();

    expect(toastErrorMock).toHaveBeenCalledTimes(1);
  });
});
