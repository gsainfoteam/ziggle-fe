const COLOR_FALLBACK = {
  primary: 'ff4500',
  background: 'ffffff',
  text: '252525',
  textSecondary: '959595',
  border: 'd6d6d6',
  assistantMessageBg: 'f5f5f7',
} as const;

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
    assistantMessageBg: readCssHex('--color-greyLight', defaults.assistantMessageBg),
  };
}

function applyTheme(): void {
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return;
  try {
    w.updateColors(buildColors());
  } catch {
  }
}

let attached = false;
let readyHooked = false;

function tryAttachTheme(): boolean {
  if (attached) return true;
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return false;

  const onFirstApply = () => {
    if (attached) return;
    try {
      applyTheme();
      new MutationObserver(() => {
        try {
          applyTheme();
        } catch {
        }
      }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      attached = true;
    } catch {
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
      readyHooked = true;
    } catch {
      return false;
    }
  }

  return attached;
}

export function initThemeSync(): void {
  if (tryAttachTheme()) return;

  const id = window.setInterval(() => {
    if (tryAttachTheme()) window.clearInterval(id);
  }, 100);

  window.setTimeout(() => window.clearInterval(id), 10_000);
}

declare global {
  interface Window {
    ChatbotWidget?: {
      isReady?: () => boolean;
      on?: (event: string, callback: () => void) => void;
      updateColors?: (colors: Record<string, string>) => void;
    };
  }
}