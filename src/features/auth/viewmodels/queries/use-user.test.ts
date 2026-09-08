/** @vitest-environment jsdom */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useQueryMock = vi.fn();
const useTokenMock = vi.fn();
const setRequiredConsentsMock = vi.fn();

vi.mock('@/common/lib', () => ({
  $api: {
    useQuery: (...args: unknown[]) => useQueryMock(...args),
  },
}));

vi.mock('../stores', () => ({
  useToken: () => useTokenMock(),
  useAuthPrompt: (
    selector: (state: {
      setRequiredConsents: typeof setRequiredConsentsMock;
    }) => unknown,
  ) => selector({ setRequiredConsents: setRequiredConsentsMock }),
}));

describe('useUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exposes data as undefined while a token exists and user info is loading', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    const { useUser } = await import('./use-user');
    const { result } = renderHook(() => useUser());

    expect(result.current.data).toBeUndefined();
  });

  it('exposes data as null when there is no token', async () => {
    useTokenMock.mockReturnValue({ token: null });
    useQueryMock.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    const { result } = renderHook(() => useUser());

    expect(result.current.data).toBeNull();
  });

  it('requires consent when the server rejects with 403', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: undefined,
      error: { statusCode: 403, message: 'Consent required' },
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    renderHook(() => useUser());

    expect(setRequiredConsentsMock).toHaveBeenCalledWith(true);
  });

  it('requires consent when the server rejects with Consent required', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: undefined,
      error: { statusCode: 401, message: 'Consent required' },
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    renderHook(() => useUser());

    expect(setRequiredConsentsMock).toHaveBeenCalledWith(true);
  });

  it('leaves the consent prompt alone for other failures', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: undefined,
      error: { statusCode: 500, message: 'Internal server error' },
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    renderHook(() => useUser());

    expect(setRequiredConsentsMock).not.toHaveBeenCalled();
  });

  it('exposes data as null when user info failed to load', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: undefined,
      error: { statusCode: 401 },
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    const { result } = renderHook(() => useUser());

    expect(result.current.data).toBeNull();
    expect(setRequiredConsentsMock).not.toHaveBeenCalled();
  });

  it('exposes the loaded user when the query succeeds', async () => {
    const user = { uuid: 'u-1', name: 'Zig' };
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: user,
      error: null,
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    const { result } = renderHook(() => useUser());

    expect(result.current.data).toEqual(user);
  });

  it('requires consent when the loaded user has no consent date', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: { uuid: 'u-1', name: 'Zig' },
      error: null,
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    renderHook(() => useUser());

    expect(setRequiredConsentsMock).toHaveBeenCalledWith(true);
  });

  it('clears the consent prompt when the loaded user has a consent date', async () => {
    useTokenMock.mockReturnValue({ token: 'session-token' });
    useQueryMock.mockReturnValue({
      data: { uuid: 'u-1', name: 'Zig', consent: '2023-01-01T00:00:00.000Z' },
      error: null,
      isLoading: false,
    });

    const { useUser } = await import('./use-user');
    renderHook(() => useUser());

    expect(setRequiredConsentsMock).toHaveBeenCalledWith(undefined);
  });
});
