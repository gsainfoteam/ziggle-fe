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

function applyChatbotTheme(): void {
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return;
  const dark = document.documentElement.classList.contains('dark');
  try {
    w.updateColors(
      dark ? { ...CHATBOT_COLORS_DARK } : { ...CHATBOT_COLORS_LIGHT },
    );
  } catch {
  }
}

let attached = false;

function tryAttachChatbotTheme(): boolean {
  if (attached) return true;
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return false;

  const onFirstApply = () => {
    if (attached) return;
    try {
      applyChatbotTheme();
      new MutationObserver(() => {
        applyChatbotTheme();
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

  try {
    w.on('onReady', onFirstApply);
  } catch {
    return false;
  }

  return true;
}

export function initChatbotThemeSync(): void {
  if (tryAttachChatbotTheme()) return;

  const id = window.setInterval(() => {
    if (tryAttachChatbotTheme()) window.clearInterval(id);
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