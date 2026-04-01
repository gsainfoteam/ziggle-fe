const CHATBOT_COLORS_LIGHT = {
  primary: 'ff4500',
  button: 'ff4500',
  background: 'ffffff',
  text: '252525',
  textSecondary: '959595',
  border: 'd6d6d6',
  userMessageBg: 'ff4500',
  assistantMessageBg: 'f5f5f7',
} as const;

const CHATBOT_COLORS_DARK = {
  primary: 'ff4500',
  button: 'ff4500',
  background: '252525',
  text: 'f1f5f9',
  textSecondary: '919191',
  border: '5d5d5d',
  userMessageBg: 'ff4500',
  assistantMessageBg: '3b3b3b',
} as const;

function isHtmlDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

function applyChatbotTheme(): void {
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return;

  w.updateColors(
    isHtmlDark()
      ? { ...CHATBOT_COLORS_DARK }
      : { ...CHATBOT_COLORS_LIGHT },
  );
}

let attached = false;
function attachChatbotThemeSync(): boolean {
  if (attached || typeof window.ChatbotWidget === 'undefined') {
    return attached;
  }

  const w = window.ChatbotWidget;
  const run = () => applyChatbotTheme();

  if (w.isReady?.()) {
    run();
  } else {
    w.on?.('onReady', run);
  }

  let observer: MutationObserver | null = null;
  if (!observer) {
    observer = new MutationObserver(run);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  attached = true;
  return true;
}

export function initChatbotThemeSync(): void {
  if (attachChatbotThemeSync()) return;

  const interval = window.setInterval(() => {
    if (attachChatbotThemeSync()) window.clearInterval(interval);
  }, 50);

  window.setTimeout(() => window.clearInterval(interval), 10_000);
  window.addEventListener('load', () => attachChatbotThemeSync(), { once: true });
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
