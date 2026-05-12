import type { ReactNode } from 'react';

interface NoticeDetailBodyProps {
  children: ReactNode;
}

export const NoticeDetailBody = ({ children }: NoticeDetailBodyProps) => (
  <div className="flex flex-col gap-4.5 md:w-[60%]">{children}</div>
);
