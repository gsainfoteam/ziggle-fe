import { type ComponentPropsWithoutRef, useId } from 'react';

import TitleLong from '@/assets/logos/title-long.svg?react';
import TitleShort from '@/assets/logos/title-short.svg?react';
import { cn } from '@/common/utils';

export type ZiggleLogoVariant = 'full' | 'compact' | 'mark';

export type ZiggleLogoProps = {
  variant?: ZiggleLogoVariant;
} & ComponentPropsWithoutRef<'span'>;

/** 동일 페이지에 로고가 여러 개여도 gradient id가 충돌하지 않게 useId 사용 */
function LogoMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const paint0 = `ziggle-logo-paint0-${uid}`;
  const paint1 = `ziggle-logo-paint1-${uid}`;

  return (
    <svg
      aria-hidden
      width="22"
      height="31"
      viewBox="0 0 22 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.35367 9.95315C4.2204 11.4028 4.12688 13.9684 4.96624 15.0604C4.96624 15.0604 4.57111 12.2421 8.11326 8.70614C9.53947 7.2827 9.86913 5.34663 9.37113 3.89457C9.08823 3.07198 8.57152 2.39244 8.12261 1.91796C7.86075 1.639 8.06182 1.17882 8.44292 1.19551C10.7482 1.30042 14.4844 1.95373 16.072 6.01662C16.7687 7.8001 16.8202 9.64319 16.4882 11.5173C16.2777 12.7142 15.5296 15.3751 17.2363 15.7018C18.4545 15.9354 19.0437 14.9483 19.3079 14.2378C19.4177 13.9421 19.7988 13.8682 20.0046 14.1043C22.0621 16.491 22.2374 19.3021 21.8119 21.7222C20.9889 26.4002 16.3432 29.8051 11.7279 29.8051C5.96225 29.8051 1.37265 26.4408 0.182582 20.3512C-0.296719 17.893 -0.0535606 13.0289 3.66394 9.5955C3.93983 9.33799 4.39108 9.56689 4.35367 9.95315Z"
        fill={`url(#${paint0})`}
      />
      <path
        d="M13.1421 20.0662C11.2775 17.6219 12.1123 14.833 12.5698 13.7216C12.6313 13.5754 12.4672 13.4375 12.338 13.5273C11.5359 14.083 9.89283 15.3908 9.1277 17.2313C8.09179 19.7194 8.16564 20.9373 8.77898 22.4247C9.14821 23.3209 8.71949 23.5111 8.5041 23.5445C8.29487 23.5779 8.10205 23.4358 7.9482 23.2875C7.50561 22.8548 7.19021 22.305 7.03742 21.6998C7.0046 21.5703 6.83845 21.5348 6.76255 21.6413C6.18818 22.4498 5.89074 23.7471 5.87639 24.6642C5.83126 27.4991 8.13076 29.7971 10.9123 29.7971C14.418 29.7971 16.9719 25.8487 14.9575 22.548C14.3729 21.587 13.8231 20.9582 13.1421 20.0662Z"
        fill={`url(#${paint1})`}
      />
      <defs>
        <radialGradient
          id={paint0}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-16.5036 -0.0730433 -0.117671 27.6151 10.5859 29.8792)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.314" stopColor="#FF9800" />
          <stop offset="0.662" stopColor="#FF6D00" />
          <stop offset="0.972" stopColor="#F44336" />
        </radialGradient>
        <radialGradient
          id={paint1}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-0.153024 15.4284 11.4011 0.117268 11.1051 15.1857)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.214" stopColor="#FFEA33" />
          <stop offset="0.328" stopColor="#FFF27D" />
          <stop offset="0.487" stopColor="#FFF48F" />
          <stop offset="0.672" stopColor="#FFF7AD" />
          <stop offset="0.793" stopColor="#FFF9C4" />
          <stop offset="0.822" stopColor="#FFF8BD" stopOpacity="0.804" />
          <stop offset="0.863" stopColor="#FFF6AB" stopOpacity="0.529" />
          <stop offset="0.91" stopColor="#FFF38D" stopOpacity="0.209" />
          <stop offset="0.941" stopColor="#FFF176" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

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
      <LogoMark className="h-full w-auto shrink-0 overflow-visible" />
      {variant === 'full' ? (
        <TitleLong aria-hidden className="h-full w-auto overflow-visible" />
      ) : null}
      {variant === 'compact' ? (
        <TitleShort aria-hidden className="h-full w-auto overflow-visible" />
      ) : null}
    </span>
  );
}
