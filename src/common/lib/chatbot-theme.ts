import { APP_OVERLAY_SELECTOR } from '@/common/const/overlay';

/** Fallbacks mirror styles.css brand/surface tokens (hex without #). */
const COLOR_FALLBACK = {
  primary: 'ff4500',
  background: 'ffffff',
  text: '252525',
  textSecondary: '959595',
  border: 'd6d6d6',
  assistantMessageBg: 'f5f5f7',
} as const;

/** 로더가 아직 안 붙었거나 pre-load 큐(배열)면 null. */
export function getChatbot(): ChatbotWidgetApi | null {
  const api = window.ChatbotWidget;
  return api && !Array.isArray(api) ? api : null;
}

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
  try {
    getChatbot()?.updateColors(buildColors());
  } catch (error) {
    console.error('[chatbot-theme] updateColors failed', error);
  }
}

/** 챗봇 패널 z-index가 MAX라 Drawer/Dialog 위에 뜸 - 앱 오버레이 열리면 닫기 */
function closeOnOverlay(): void {
  if (document.querySelector(APP_OVERLAY_SELECTOR) == null) return;
  try {
    const w = getChatbot();
    if (w?.isOpen()) w.close();
  } catch (error) {
    console.error('[chatbot-theme] close on overlay failed', error);
  }
}

function attach(): void {
  applyTheme();
  closeOnOverlay();

  new MutationObserver(closeOnOverlay).observe(document.body, {
    childList: true,
    subtree: true,
  });
  new MutationObserver(applyTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

export function initThemeSync(): void {
  if (getChatbot()) attach();
  else window.addEventListener('chatbot:onLoad', attach, { once: true });
}
