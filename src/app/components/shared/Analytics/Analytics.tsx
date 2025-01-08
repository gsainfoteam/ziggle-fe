'use client';

import React from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';

interface AnalyticsProps {
  event: (typeof LogEvents)[keyof typeof LogEvents];
  properties?: object;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const Analytics = ({
  event,
  properties,
  children,
  className,
}: React.PropsWithChildren<AnalyticsProps>) => (
  <div onClick={() => sendLog(event, properties)} className={className}>
    {children}
  </div>
);

export default Analytics;
