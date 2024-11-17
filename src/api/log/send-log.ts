import LogEvents from './log-events';

declare global {
  interface Window {
    smartlook: (action: string, ...args: unknown[]) => void;
  }
}

export const analytics = Object.entries(LogEvents).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`log${key.charAt(0).toUpperCase() + key.slice(1)}`]: (
      properties?: object,
    ) => sendLog(value, properties),
  }),
  {},
) as Record<
  `log${Capitalize<keyof typeof LogEvents>}`,
  (properties?: object) => void
>;

const sendLog = (
  event: (typeof LogEvents)[keyof typeof LogEvents],
  properties?: object,
) => {
  window.smartlook('track', event, properties);
  // TODO: add ga too
};

export default sendLog;
