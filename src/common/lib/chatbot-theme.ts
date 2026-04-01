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

//document.documentElement에 dark 클래스가 있으면 true, 없으면 false를 반환
function isHtmlDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

//window.ChatbotWidget을 w에 담고 updateColors가 있으면 isHtmlDark()가 true면 DARK, false면 LIGHT
function applyChatbotTheme(): void {
  const w = window.ChatbotWidget;
  if (!w?.updateColors) return;

  w.updateColors(
    isHtmlDark()
      ? { ...CHATBOT_COLORS_DARK }
      : { ...CHATBOT_COLORS_LIGHT },
  );
}

//attached가 false거나 window.ChatbotWidget가 undefined이면 attached(false)를 반환
let attached = false;
function attachChatbotThemeSync(): boolean {
  if (attached || typeof window.ChatbotWidget === 'undefined') {
    return attached;
  }

  const w = window.ChatbotWidget;
  //applyChatbotTheme()를 실행하는 함수
  const run = () => applyChatbotTheme();

  if (w.isReady?.()) {
    run();
  } else {
    w.on?.('onReady', run); //onReady 이벤트에 run 등록
  }

  //observer 감시자
  let observer: MutationObserver | null = null;
  if (!observer) { //observer가 없으면(null이면). 중복 방지용 코드
    observer = new MutationObserver(run); //감시 감시항목이 변경되면 run 함수 실행
    observer.observe(document.documentElement, { //감시대상 document.documentElement
      attributes: true, //속성 변경 감시
      attributeFilter: ['class'], //감시항목 class
    });
  }

  attached = true;
  return true;
}

//여기 안정성을 위한 코드. 
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
