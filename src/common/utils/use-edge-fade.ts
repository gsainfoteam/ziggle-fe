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

/**
 * 스크롤로 잘린 쪽 끝을 흐린다. 잘린 자리를 그대로 두면 경계에 걸친 요소가
 * 컨테이너 모서리에 눌려 찌그러져 보인다. 넘치는 축은 실행 시점에 재므로
 * 가로 스크롤과 세로 스크롤을 나눠 부를 필요가 없다.
 */
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

  /**
   * 모달 안에서는 스크롤러가 첫 커밋보다 늦게 붙는다. 이펙트로 걸면 그 시점을
   * 놓치므로 붙는 순간에 관찰을 거는 콜백 ref 를 쓴다. 자식까지 보는 건
   * 이미지가 로드되며 커지는 걸 잡기 위해서다.
   */
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

      // 목록 자체가 갈리면 새 자식도 관찰 대상이고 넘침 여부도 다시 재야 한다.
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
