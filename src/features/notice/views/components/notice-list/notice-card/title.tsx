import { NoticeCardHighlightedText } from './highlighted-text';

interface NoticeCardTitleProps {
  children: string;
  /** When provided, the title highlights matching substrings. */
  query?: string;
}

export const NoticeCardTitle = ({ children, query }: NoticeCardTitleProps) => (
  <p className="dark:text-dark_white line-clamp-3 text-xl font-semibold">
    {query ? (
      <NoticeCardHighlightedText query={query}>
        {children}
      </NoticeCardHighlightedText>
    ) : (
      children
    )}
  </p>
);
