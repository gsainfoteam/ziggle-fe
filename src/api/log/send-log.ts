import { track } from '@amplitude/analytics-browser';
import { sendGAEvent } from '@next/third-parties/google';

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
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  window.smartlook('track', event, properties);

  properties
    ? sendGAEvent('event', event, properties)
    : sendGAEvent('event', event);

  track(event, properties);
};

export default sendLog;
