import type { ComponentPropsWithoutRef } from 'react';

import LogoMark from '@/assets/logos/logo.svg?react';
import TitleLong from '@/assets/logos/title-long.svg?react';
import TitleShort from '@/assets/logos/title-short.svg?react';
import { cn } from '@/common/utils';

export type ZiggleLogoVariant = 'full' | 'compact' | 'mark';

export type ZiggleLogoProps = {
  variant?: ZiggleLogoVariant;
} & ComponentPropsWithoutRef<'span'>;

export function ZiggleLogo({
  variant = 'full',
  className,
  ...props
}: ZiggleLogoProps) {
  return (
    <span
      {...props}
      className={cn(
        'text-text inline-flex items-center gap-2 md:gap-3',
        className,
      )}
    >
      <LogoMark
        aria-hidden
        className="h-full w-auto shrink-0 overflow-visible"
      />
      {variant === 'full' ? (
        <TitleLong
          aria-hidden
          className="h-[85%] w-auto self-center overflow-visible"
        />
      ) : null}
      {variant === 'compact' ? (
        <TitleShort
          aria-hidden
          className="h-[85%] w-auto self-center overflow-visible"
        />
      ) : null}
    </span>
  );
}
