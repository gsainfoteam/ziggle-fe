import { useLayoutEffect, useRef, useState } from 'react';

import { clamp, takeWhile } from 'es-toolkit';

import { Tag } from '../tags';

interface NoticeCardTagsProps {
  tags: string[];
}

const GAP = 8; // gap-2
const PLUS_BADGE_WIDTH = 36; // approximate "+N" width

export const NoticeCardTags = ({ tags }: NoticeCardTagsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(tags.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;
      if (containerWidth === 0) return;

      const tagWidths = Array.from(
        measure.querySelectorAll<HTMLElement>('[data-tag-item]'),
      ).map((el) => el.offsetWidth);

      const cumulative = tagWidths.reduce<number[]>((acc, w, i) => {
        acc.push((acc[i - 1] ?? 0) + (i > 0 ? GAP : 0) + w);
        return acc;
      }, []);

      const count = takeWhile(cumulative, (cumWidth, i) => {
        const badgeSpace =
          i === tagWidths.length - 1 ? 0 : GAP + PLUS_BADGE_WIDTH;
        return cumWidth + badgeSpace <= containerWidth;
      }).length;

      setLimit(clamp(count, 1, tags.length));
    };

    calculate();
    const observer = new ResizeObserver(calculate);
    observer.observe(container);
    return () => observer.disconnect();
  }, [tags]);

  if (tags.length === 0) return null;

  const visible = tags.slice(0, limit);
  const extra = tags.length - limit;

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={measureRef}
        className="pointer-events-none absolute flex flex-nowrap opacity-0"
        aria-hidden
      >
        {tags.map((tag) => (
          <span key={tag} data-tag-item className="shrink-0 pr-2">
            <Tag name={tag} />
          </span>
        ))}
      </div>

      <div className="flex flex-nowrap items-center gap-2 overflow-hidden">
        {visible.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
        {extra > 0 && (
          <span className="text-primary shrink-0 text-sm font-semibold">
            +{extra}
          </span>
        )}
      </div>
    </div>
  );
};
