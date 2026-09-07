declare global {
  type ChatbotEvent =
    | 'onLoad'
    | 'onReady'
    | 'onOpen'
    | 'onClose'
    | 'onStateChange'
    | 'onMessage'
    | 'onMessageSent'
    | 'onMessageReceived';

  interface ChatbotWidgetApi {
    open(): void;
    close(): void;
    toggle(): void;
    isOpen(): boolean;
    isReady(): boolean;
    getState(): {
      open: boolean;
      ready: boolean;
      generating: boolean;
      launcherVisible: boolean;
      mode: 'corner' | 'center';
      mobile: boolean;
    };
    ready(callback: (api: ChatbotWidgetApi) => void): ChatbotWidgetApi;
    resize(width: number, height: number): { width: number; height: number };
    showLauncher(): void;
    hideLauncher(): void;
    setLauncherVisible(visible: boolean): void;
    updateColors(colors: Record<string, string>): void;
    on(event: ChatbotEvent, handler: (data: any) => void): () => void;
    off(event: ChatbotEvent, handler: (data: any) => void): void;
    destroy(): void;
  }

  interface Window {
    ChatbotWidget?: ChatbotWidgetApi | unknown[];
  }
}

export {};
