import type { ReactNode } from 'react';

interface NoticeCardBodyProps {
  children: ReactNode;
}

export const NoticeCardBody = ({ children }: NoticeCardBodyProps) => (
  <div className="flex w-full flex-col gap-2.5 px-4 pb-2.5">{children}</div>
);
