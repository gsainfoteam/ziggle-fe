import { cn, useEdgeFade } from '@/common/utils';

interface OverflowProps extends React.HTMLAttributes<HTMLDivElement> {
  fade?: string;
}

export const Overflow = ({
  fade,
  className,
  style,
  onScroll,
  children,
  ...props
}: OverflowProps) => {
  const { scrollerProps } = useEdgeFade<HTMLDivElement>(fade);

  return (
    <div
      {...props}
      {...scrollerProps}
      onScroll={(event) => {
        onScroll?.(event);
        scrollerProps.onScroll();
      }}
      style={{ ...style, ...scrollerProps.style }}
      className={cn('scrollbar-none', className)}
    >
      {children}
    </div>
  );
};
