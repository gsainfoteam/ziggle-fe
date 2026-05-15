import type { ReactNode } from 'react';

interface NoticeDetailRootProps {
  children: ReactNode;
}

export const NoticeDetailRoot = ({ children }: NoticeDetailRootProps) => (
  <div className="flex justify-center">
    <div className="content mt-8 md:mt-12 md:w-225 md:min-w-150">
      <div className="flex gap-5">{children}</div>
    </div>
  </div>
);
