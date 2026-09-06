/** @vitest-environment jsdom */

import { describe, expect, it, vi } from 'vitest';

import { watchVisibleProfileTrigger } from './watch-visible-profile-trigger.ts';

describe('watchVisibleProfileTrigger', () => {
  it('keeps searching past 24 frames until a visible trigger appears', () => {
    const queue: Array<() => void> = [];
    const schedule = (cb: () => void) => {
      queue.push(cb);
      return queue.length;
    };
    const cancel = vi.fn();
    const onFound = vi.fn();
    const trigger = document.createElement('button');

    let attempts = 0;
    watchVisibleProfileTrigger({
      find: () => {
        attempts += 1;
        return attempts >= 30 ? trigger : null;
      },
      onFound,
      schedule,
      cancel,
    });

    for (let i = 0; i < 40 && queue.length > 0; i += 1) {
      const next = queue.shift();
      next?.();
    }

    expect(attempts).toBeGreaterThanOrEqual(30);
    expect(onFound).toHaveBeenCalledTimes(1);
    expect(onFound).toHaveBeenCalledWith(trigger);
  });

  it('keeps scheduling after 24 frames when no trigger is found yet', () => {
    const queue: Array<() => void> = [];
    const schedule = (cb: () => void) => {
      queue.push(cb);
      return queue.length;
    };
    const onFound = vi.fn();

    watchVisibleProfileTrigger({
      find: () => null,
      onFound,
      schedule,
      cancel: vi.fn(),
    });

    for (let i = 0; i < 48 && queue.length > 0; i += 1) {
      const next = queue.shift();
      next?.();
    }

    expect(onFound).not.toHaveBeenCalled();
    // 예전 구현은 24프레임 후 포기했지만, 회전/느린 레이아웃을 위해 계속 탐색한다.
    expect(queue.length).toBeGreaterThan(0);
  });

  it('stops scheduling after cancel', () => {
    const queue: Array<() => void> = [];
    const schedule = (cb: () => void) => {
      queue.push(cb);
      return queue.length;
    };
    const cancel = vi.fn();

    const stop = watchVisibleProfileTrigger({
      find: () => null,
      onFound: vi.fn(),
      schedule,
      cancel,
    });

    expect(queue).toHaveLength(1);
    stop();
    queue.shift()?.();

    expect(queue).toHaveLength(0);
    expect(cancel).toHaveBeenCalled();
  });
});
