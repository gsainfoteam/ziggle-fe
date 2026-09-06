import { useEffect, useRef, useState } from 'react';

interface NoticeCardImageBadgeProps {
  imageUrls: string[];
  title: string;
}

export const NoticeCardImageCarousel = ({
  imageUrls,
  title,
}: NoticeCardImageBadgeProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const root = rootRef.current;
    const row = root?.parentElement;
    if (!root || !row) return;

    const syncHeight = () => {
      const textColumn = Array.from(row.children).find(
        (child) => child !== root,
      );
      if (!(textColumn instanceof HTMLElement)) return;
      setHeight(textColumn.getBoundingClientRect().height);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(row);
    for (const child of row.children) {
      if (child !== root) observer.observe(child);
    }
    return () => observer.disconnect();
  }, []);

  if (imageUrls.length === 0) return null;

  return (
    <div ref={rootRef} className="relative max-w-40 shrink-0 self-start">
      <img
        src={imageUrls[0]}
        alt={title}
        style={height ? { maxHeight: height } : undefined}
        className="h-auto w-auto max-w-40 rounded-lg border border-gray-200 object-contain dark:border-gray-700"
      />
      {imageUrls.length > 1 && (
        <span className="absolute top-1.5 right-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white">
          +{imageUrls.length - 1}
        </span>
      )}
    </div>
  );
};
