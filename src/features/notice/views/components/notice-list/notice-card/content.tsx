import { NoticeCardHighlightedText } from './highlighted-text';

interface NoticeCardContentProps {
  children?: string | null;
  /** When provided, the content highlights matching substrings. */
  query?: string;
}

export const NoticeCardContent = ({
  children,
  query,
}: NoticeCardContentProps) => {
  if (!children || children.trim().length === 0) return null;
  return (
    <div className="dark:text-dark_white line-clamp-3 w-full text-lg">
      {query ? (
        <NoticeCardHighlightedText query={query}>
          {children}
        </NoticeCardHighlightedText>
      ) : (
        children
      )}
    </div>
  );
};
