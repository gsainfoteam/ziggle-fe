/** @vitest-environment jsdom */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useQueryMock = vi.fn();
const useUserMock = vi.fn();

vi.mock('@/common/lib', () => ({
  $api: {
    useQuery: (...args: unknown[]) => useQueryMock(...args),
  },
}));

vi.mock('@/features/auth', () => ({
  useUser: () => useUserMock(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'ko' },
    t: (key: string) => key,
  }),
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('useNotices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useQueryMock.mockReturnValue({
      data: undefined,
      error: null,
      isError: false,
      isLoading: false,
    });
  });

  it('enables the notice list query for guests (user is null)', async () => {
    useUserMock.mockReturnValue({ data: null });

    const { useNotices } = await import('./use-notices');
    renderHook(() => useNotices({}));

    expect(useQueryMock).toHaveBeenCalledWith(
      'get',
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({ enabled: true }),
    );
  });

  it('keeps the notice list query disabled while auth is loading', async () => {
    useUserMock.mockReturnValue({ data: undefined });

    const { useNotices } = await import('./use-notices');
    renderHook(() => useNotices({}));

    expect(useQueryMock).toHaveBeenCalledWith(
      'get',
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({ enabled: false }),
    );
  });
});
