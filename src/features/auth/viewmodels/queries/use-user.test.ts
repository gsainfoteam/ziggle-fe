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
});
