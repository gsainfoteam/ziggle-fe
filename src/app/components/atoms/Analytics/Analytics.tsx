'use client';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';

interface AnalyticsProps {
  event: (typeof LogEvents)[keyof typeof LogEvents];
  properties?: object;
}

const Analytics = ({
  event,
  properties,
  children,
}: React.PropsWithChildren<AnalyticsProps>) => (
  <div onClick={() => sendLog(event, properties)}>{children}</div>
);

export default Analytics;
