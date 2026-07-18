/** Fallbacks mirror styles.css brand/surface tokens (hex without #). */
const COLOR_FALLBACK = {
  primary: 'ff4500',
  background: 'ffffff',
  text: '252525',
  textSecondary: '959595',
  border: 'd6d6d6',
  assistantMessageBg: 'f5f5f7',
} as const;

// TODO(chatbot): 챗봇 팀에 기본 런처 숨김/커스텀 트리거 옵션이 오면
// DOM display:none 우회를 data-* 또는 API로 교체한다.
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
    background: readCssHex('--color-background', defaults.background),
    text: readCssHex('--color-foreground', defaults.text),
    textSecondary: readCssHex('--color-subtle', defaults.textSecondary),
    border: readCssHex('--color-border', defaults.border),
    userMessageBg: primary,
    assistantMessageBg: readCssHex(
      '--color-muted',
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

/** 기본 런처는 숨기고, 호스트 FAB(ChatbotFab)에서 open/close 한다. */
function hideDefaultLauncher(): boolean {
  const btn = document.querySelector<HTMLButtonElement>(LAUNCHER_SELECTOR);
  if (!btn) return false;
  btn.style.display = 'none';
  return true;
}

/** 챗봇 패널 z-index가 MAX라 Drawer/Dialog 위에 뜸 → 오버레이 열리면 닫기 */
function syncChatbotWithOverlays(): void {
  const overlayOpen = document.querySelector('[role="dialog"]') != null;
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
let overlayListening = false;

function ensureOverlayListener(): void {
  if (overlayListening) return;
  overlayListening = true;
  syncChatbotWithOverlays();
  new MutationObserver(() => {
    hideDefaultLauncher();
    syncChatbotWithOverlays();
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
      hideDefaultLauncher();
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

  hideDefaultLauncher();
  ensureOverlayListener();

  return attached;
}

export function initThemeSync(): void {
  ensureOverlayListener();
  if (tryAttachTheme()) return;

  const id = window.setInterval(() => {
    hideDefaultLauncher();
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
      on?: (event: string, callback: () => void) => (() => void) | void;
      updateColors?: (colors: Record<string, string>) => void;
    };
  }
}
