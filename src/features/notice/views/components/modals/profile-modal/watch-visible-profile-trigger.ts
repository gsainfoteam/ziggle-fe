export const PROFILE_TRIGGER_ATTR = 'data-profile-trigger';

export function isElementVisible(el: HTMLElement) {
  if (!el.isConnected) return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/** 현재 레이아웃에서 실제로 보이는 프로필 트리거만 (모바일 숨김 버튼 제외) */
export function findVisibleProfileTrigger(): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(
    `[${PROFILE_TRIGGER_ATTR}]`,
  );
  for (const el of nodes) {
    if (isElementVisible(el)) return el;
  }
  return null;
}

type WatchVisibleProfileTriggerOptions = {
  find?: () => HTMLElement | null;
  onFound: (el: HTMLElement) => void;
  schedule?: (cb: () => void) => number;
  cancel?: (id: number) => void;
};

/**
 * 보이는 프로필 트리거가 나타날 때까지 rAF로 계속 탐색한다.
 * 뷰포트 회전·셸 전환처럼 트리거 마운트가 지연될 수 있으므로
 * 고정 프레임 예산으로 포기(onClose)하지 않는다.
 */
export function watchVisibleProfileTrigger({
  find = findVisibleProfileTrigger,
  onFound,
  schedule = (cb) => requestAnimationFrame(cb),
  cancel = (id) => cancelAnimationFrame(id),
}: WatchVisibleProfileTriggerOptions): () => void {
  let cancelled = false;
  let scheduledId = 0;

  const tick = () => {
    if (cancelled) return;
    const next = find();
    if (next) {
      onFound(next);
      return;
    }
    scheduledId = schedule(tick);
  };

  tick();

  return () => {
    cancelled = true;
    cancel(scheduledId);
  };
}
