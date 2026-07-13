const COLOR_FALLBACK = {
  primary: 'ff4500',
  background: 'ffffff',
  text: '252525',
  textSecondary: '959595',
  border: 'd6d6d6',
  assistantMessageBg: 'f5f5f7',
} as const;

/** BottomTabBar(h-14) + gap — 모바일에서 프로필 탭을 가리지 않도록 */
const MOBILE_LAUNCHER_BOTTOM =
  'calc(3.5rem + env(safe-area-inset-bottom, 0px) + 12px)';
const DESKTOP_LAUNCHER_BOTTOM = '18px';
const MOBILE_MQ = '(max-width: 767px)';
const LAUNCHER_SELECTOR = 'button[aria-label="챗봇 열기"]';

function readCssHex(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return fallback;
  return raw.replace(/^#/, '');
}

function buildColors(): Record<string, string> {
  const defaults = COLOR_FALLBACK;
  const primary = readCssHex('--color-primary', defaults.primary);
  return {
    primary,
    button: primary,
    background: readCssHex('--color-white', defaults.background),
    text: readCssHex('--color-text', defaults.text),
    textSecondary: readCssHex('--color-secondaryText', defaults.textSecondary),
    border: readCssHex('--color-deselected', defaults.border),
    userMessageBg: primary,
    assistantMessageBg: readCssHex(
      '--color-greyLight',
      defaults.assistantMessageBg,
    ),
  };
}

function applyTheme(): void {
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return;
  try {
    w.updateColors(buildColors());
  } catch (error) {
    console.error('[chatbot-theme] updateColors failed', error);
  }
}

function applyLauncherOffset(): boolean {
  const btn = document.querySelector<HTMLButtonElement>(LAUNCHER_SELECTOR);
  if (!btn) return false;
  const isMobile = window.matchMedia(MOBILE_MQ).matches;
  btn.style.bottom = isMobile
    ? MOBILE_LAUNCHER_BOTTOM
    : DESKTOP_LAUNCHER_BOTTOM;
  syncLauncherWithOverlays();
  return true;
}

/** 챗봇 z-index가 MAX라 Drawer/Dialog 위에 뜸 → 오버레이 열리면 숨김 */
function syncLauncherWithOverlays(): void {
  const btn = document.querySelector<HTMLButtonElement>(LAUNCHER_SELECTOR);
  if (!btn) return;

  const overlayOpen = document.querySelector('[role="dialog"]') != null;
  btn.style.visibility = overlayOpen ? 'hidden' : 'visible';
  btn.style.pointerEvents = overlayOpen ? 'none' : 'auto';

  if (!overlayOpen) return;
  try {
    if (window.ChatbotWidget?.isOpen?.()) {
      window.ChatbotWidget.close?.();
    }
  } catch (error) {
    console.error('[chatbot-theme] close on overlay failed', error);
  }
}

let attached = false;
let readyHooked = false;
let offsetListening = false;
let overlayListening = false;

function ensureOffsetListener(): void {
  if (offsetListening) return;
  offsetListening = true;
  window.matchMedia(MOBILE_MQ).addEventListener('change', () => {
    applyLauncherOffset();
  });
}

function ensureOverlayListener(): void {
  if (overlayListening) return;
  overlayListening = true;
  syncLauncherWithOverlays();
  new MutationObserver(() => {
    syncLauncherWithOverlays();
  }).observe(document.body, { childList: true, subtree: true });
}

function tryAttachTheme(): boolean {
  if (attached) return true;
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return false;

  const onFirstApply = () => {
    if (attached) return;
    try {
      applyTheme();
      applyLauncherOffset();
      ensureOffsetListener();
      ensureOverlayListener();
      new MutationObserver(() => {
        try {
          applyTheme();
        } catch (error) {
          console.error('[chatbot-theme] observer callback failed', error);
        }
      }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      attached = true;
    } catch (error) {
      console.error('[chatbot-theme] initial attach failed', error);
    }
  };

  try {
    if (w.isReady?.() === true) {
      onFirstApply();
      return attached;
    }
  } catch {
    return false;
  }

  if (typeof w.on !== 'function') {
    return false;
  }
  if (!readyHooked) {
    try {
      w.on('onReady', onFirstApply);
    } catch {
      return false;
    }
    readyHooked = true;
  }

  // onReady 전이라도 런처 버튼은 DOM에 먼저 생길 수 있음
  applyLauncherOffset();
  ensureOffsetListener();
  ensureOverlayListener();

  return attached;
}

export function initThemeSync(): void {
  ensureOverlayListener();
  if (tryAttachTheme()) return;

  const id = window.setInterval(() => {
    applyLauncherOffset();
    if (tryAttachTheme()) window.clearInterval(id);
  }, 100);

  window.setTimeout(() => window.clearInterval(id), 10_000);
}

declare global {
  interface Window {
    ChatbotWidget?: {
      isReady?: () => boolean;
      isOpen?: () => boolean;
      open?: () => void;
      close?: () => void;
      on?: (event: string, callback: () => void) => void;
      updateColors?: (colors: Record<string, string>) => void;
    };
  }
}
