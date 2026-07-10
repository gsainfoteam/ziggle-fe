import { cn } from '@/common/utils';

import { NoticeCardHighlightedText } from './highlighted-text';

interface NoticeCardTitleProps {
  children: string;
  query?: string;
  isRead?: boolean;
}

export const NoticeCardTitle = ({
  children,
  query,
  isRead = false,
}: NoticeCardTitleProps) => (
  <div className="flex items-center gap-2">
    {!isRead && <span className="bg-primary size-2 shrink-0 rounded-full" />}
    <p
      className={cn(
        'line-clamp-3 text-xl font-semibold text-pretty',
        isRead
          ? 'text-greyDark dark:text-dark_grey'
          : 'dark:text-dark_white text-text',
      )}
    >
      {query ? (
        <NoticeCardHighlightedText query={query}>
          {children}
        </NoticeCardHighlightedText>
      ) : (
        children
      )}
    </p>
  </div>
);
