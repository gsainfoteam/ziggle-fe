import { useCallback, useEffect, useState } from 'react';

export function getChatbot(): ChatbotWidgetApi | null {
  const api = window.ChatbotWidget;
  return api && !Array.isArray(api) ? api : null;
}

export function useChatbot() {
  const [isLoaded, setIsLoaded] = useState(() => getChatbot() != null);
  const [isOpen, setIsOpen] = useState(() => getChatbot()?.isOpen() ?? false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const listen = (api: ChatbotWidgetApi) => {
      unsubscribe = api.on('onStateChange', ({ open }: { open: boolean }) =>
        setIsOpen(open),
      );
    };

    const onLoad = () => {
      const api = getChatbot();
      if (!api) return;
      setIsLoaded(true);
      setIsOpen(api.isOpen());
      listen(api);
    };

    const api = getChatbot();
    if (api) listen(api);
    else window.addEventListener('chatbot:onLoad', onLoad, { once: true });

    return () => {
      window.removeEventListener('chatbot:onLoad', onLoad);
      unsubscribe?.();
    };
  }, []);

  return {
    isLoaded,
    isOpen,
    open: useCallback(() => getChatbot()?.open(), []),
    close: useCallback(() => getChatbot()?.close(), []),
    toggle: useCallback(() => getChatbot()?.toggle(), []),
  };
}
