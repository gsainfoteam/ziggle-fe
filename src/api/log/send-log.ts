import LogEvents from './log-events';

declare global {
  interface Window {
    smartlook: (action: string, ...args: unknown[]) => void;
  }
}

const sendLog = (
  event: (typeof LogEvents)[keyof typeof LogEvents],
  properties?: object,
) => {
  window.smartlook('track', event, properties);
  
};

export default sendLog;
