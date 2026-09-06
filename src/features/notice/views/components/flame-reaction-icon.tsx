import { FlameIcon } from '@phosphor-icons/react';

import { cn } from '@/common/utils';

interface FlameReactionIconProps {
  active: boolean;
  className?: string;
  size?: number;
}

export function FlameReactionIcon({
  active,
  className,
  size,
}: FlameReactionIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  if (!active) {
    return (
      <FlameIcon className={cn('text-foreground', className)} style={style} />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn('text-primary', className)}
      style={style}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48Z"
      />
      <path
        fill="#FACC15"
        d="M96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Z"
      />
    </svg>
  );
}
