/** @vitest-environment jsdom */

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock('@/common/components', () => ({
  Button: ({
    animated: _animated,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    animated?: boolean;
  }) => <button {...props} />,
  LogClick: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/features/notice/viewmodels', () => ({
  useAddReaction: vi.fn(),
  useDeleteReaction: vi.fn(),
  useToggleBookmark: vi.fn(),
}));

vi.mock('../../flame-reaction-icon', () => ({
  FlameReactionIcon: ({ active }: { active: boolean }) => (
    <span data-testid="flame" data-active={active} />
  ),
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function renderActions(
  onFireToggle: (isReacted: boolean) => Promise<{
    count: number;
    isReacted: boolean;
  }>,
) {
  const { NoticeCardActionsDisplay } = await import('./actions');
  render(
    <NoticeCardActionsDisplay
      id={1}
      fire={{ count: 3, isReacted: false }}
      isBookmarked={false}
      onFireToggle={onFireToggle}
      onBookmarkToggle={vi.fn()}
      onShare={vi.fn()}
    />,
  );
}

describe('NoticeCardActionsDisplay fire toggle', () => {
  afterEach(cleanup);

  it('toggles before the request settles and ignores clicks while pending', async () => {
    const pending = deferred<{ count: number; isReacted: boolean }>();
    const onFireToggle = vi.fn(() => pending.promise);
    await renderActions(onFireToggle);

    const button = screen.getByTestId('flame').closest('button')!;
    fireEvent.click(button);

    expect(screen.getByText('4')).toBeTruthy();
    expect(screen.getByTestId('flame').dataset.active).toBe('true');

    fireEvent.click(button);
    expect(onFireToggle).toHaveBeenCalledTimes(1);

    await act(async () => {
      pending.resolve({ count: 4, isReacted: true });
    });
    expect(screen.getByText('4')).toBeTruthy();
  });

  it('rolls back when the request fails', async () => {
    const onFireToggle = vi.fn(() => Promise.reject(new Error('401')));
    await renderActions(onFireToggle);

    const button = screen.getByTestId('flame').closest('button')!;
    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByTestId('flame').dataset.active).toBe('false');
  });
});
