import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

interface NoticeCardRootProps {
  id: number;
  children: ReactNode;
}

export const NoticeCardRoot = ({ id, children }: NoticeCardRootProps) => (
  <Link to="/notice/$id" params={{ id: id.toString() }}>
    <div className="text-text hover:bg-greyLight dark:hover:bg-dark_greyDark flex flex-col rounded-[10px] pt-2.5 transition">
      {children}
    </div>
  </Link>
);
