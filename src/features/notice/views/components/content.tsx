import DOMPurify from 'isomorphic-dompurify';

import { cn } from '@/common/utils';

const COLOR_STYLE_PROPS = ['background', 'background-color', 'color'];
const BORDER_STYLE_PROPS = [
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
];
const BORDER_COLOR_STYLE_PROPS = [
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
];
const SIZE_STYLE_PROPS = ['width', 'height', 'align'];

/**
 * 1px solid #000 -> 1px solid currentColor 로 만들어주는 함수
 */
function filterBorderStyle(value: string) {
  const v = value.trim();
  if (!v) return v;

  if (v == 'none' || v == '0') return v;

  const widthRegex =
    /(?:^|\s)(\d*\.?\d+(?:px|em|rem|pt|pc|cm|mm|in|q|ch|ex|vh|vw|vmin|vmax)|thin|medium|thick)(?=\s|$)/i;
  const styleRegex =
    /(?:^|\s)(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)(?=\s|$)/i;

  const widthMatch = v.match(widthRegex);
  const styleMatch = v.match(styleRegex);

  let style = styleMatch ? styleMatch[1].toLowerCase() : undefined;
  if (style === 'none' || /^\s*0\s*$/i.test(v)) return '0';

  const width = widthMatch ? widthMatch[1] : style === 'double' ? '3px' : '1px';
  style = style ?? 'solid';

  return `${width} ${style} currentColor`;
}

/**
 * 여러 색상 스타일과 크기 속성을 제거하고 currentColor로 변경하는 함수
 */
function filterInlineStyle(val: string) {
  const styles = String(val)
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

  const newStyles = styles
    .map((style) => {
      const [rawProp, ...rest] = style.split(':');
      if (!rawProp) return null;

      const prop = rawProp.trim();
      const value = rest.join(':').trim();

      if (COLOR_STYLE_PROPS.includes(prop) || SIZE_STYLE_PROPS.includes(prop)) {
        return null;
      }

      if (BORDER_COLOR_STYLE_PROPS.includes(prop)) {
        return `${prop}: currentColor`;
      }

      if (BORDER_STYLE_PROPS.includes(prop)) {
        return `${prop}: ${filterBorderStyle(value)}`;
      }

      return `${prop}: ${value}`;
    })
    .filter(Boolean);

  return newStyles.join('; ');
}

DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
  const name = data.attrName?.toLowerCase();
  if (!name) return;

  if (name === 'class') {
    data.keepAttr = false;
    return;
  }

  if (name === 'bgcolor' || name === 'color') {
    data.keepAttr = false;
    return;
  }

  if (name === 'style') {
    const filtered = filterInlineStyle(String(data.attrValue || ''));
    if (filtered) data.attrValue = filtered;
    else data.keepAttr = false;
    return;
  }

  if (name === 'width' || name === 'height' || name === 'align') {
    data.keepAttr = false;
    return;
  }
});

interface ContentProps {
  content: string;
}

export function Content({ content }: ContentProps) {
  return (
    <div
      className={cn(
        'text-text dark:text-dark_white',
        'leading-[1.4] font-normal',
        '[&_p]:my-4 [&_p]:text-lg',
        '[&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl',
        '[&_a]:text-secondaryText [&_a]:underline',
        'break-all',
        '[&_table]:w-full [&_table]:border-collapse',
        '[&_td]:bg-transparent [&_th]:bg-transparent',
        '[&_td]:border [&_td]:border-current [&_th]:border [&_th]:border-current',
        '[&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2',
        '[&_p]:text-left',
      )}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}
