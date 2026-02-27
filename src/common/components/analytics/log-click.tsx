import React, { cloneElement, type HTMLAttributes } from 'react';

export const LogClick = ({
  eventName,
  properties,
  children,
}: React.PropsWithChildren<{
  eventName: string;
  properties?: Record<string, unknown>;
  children: React.ReactNode;
}>) => {
  const child = React.Children.only(children) as React.ReactElement<
    HTMLAttributes<HTMLElement>
  >;
  if (!child) {
    throw new Error('LogClick must have exactly one child');
  }

  return cloneElement(child, {
    onClick: (...e) => {
      if (eventName) {
        console.info('[LOG]', eventName, properties);
      }
      if (typeof child.props.onClick === 'function') {
        child.props.onClick(...e);
      }
    },
  });
};
