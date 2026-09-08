import { useCallback, useRef, useState } from 'react';

interface Edges {
  start: boolean;
  end: boolean;
  vertical: boolean;
}

const maskOf = ({ start, end, vertical }: Edges, fade: string) => {
  if (!start && !end) return undefined;
  const direction = vertical ? 'to bottom' : 'to right';
  const head = start ? `transparent, black ${fade}` : 'black';
  const tail = end ? `black calc(100% - ${fade}), transparent` : 'black';
  return `linear-gradient(${direction}, ${head}, ${tail})`;
};
export const useEdgeFade = <T extends HTMLElement>(fade = '2.75rem') => {
  const elementRef = useRef<T | null>(null);
  const [edges, setEdges] = useState<Edges>({
    start: false,
    end: false,
    vertical: false,
  });

  const sync = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    const vertical = el.scrollHeight > el.clientHeight;
    const position = vertical ? el.scrollTop : el.scrollLeft;
    const max = vertical
      ? el.scrollHeight - el.clientHeight
      : el.scrollWidth - el.clientWidth;
    setEdges({ start: position > 2, end: position < max - 2, vertical });
  }, []);
  const attach = useCallback(
    (el: T | null) => {
      elementRef.current = el;
      if (!el) return;

      const resize = new ResizeObserver(sync);
      const observeAll = () => {
        resize.disconnect();
        resize.observe(el);
        for (const child of el.children) resize.observe(child);
      };
      observeAll();
      const mutation = new MutationObserver(() => {
        observeAll();
        sync();
      });
      mutation.observe(el, { childList: true });

      return () => {
        resize.disconnect();
        mutation.disconnect();
        elementRef.current = null;
      };
    },
    [sync],
  );

  const mask = maskOf(edges, fade);

  return {
    edges,
    elementRef,
    scrollerProps: {
      ref: attach,
      onScroll: sync,
      style: { maskImage: mask, WebkitMaskImage: mask },
    },
  };
};
