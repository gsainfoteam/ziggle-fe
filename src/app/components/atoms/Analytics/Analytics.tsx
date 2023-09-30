'use client';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';

interface AnalyticsProps {
  event: (typeof LogEvents)[keyof typeof LogEvents];
}

const Analytics = ({
  event,
  children,
}: React.PropsWithChildren<AnalyticsProps>) => (
  <div onClick={() => sendLog(event)}>{children}</div>
);

export default Analytics;
