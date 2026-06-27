import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

// Threads식 컬럼.
// - 제목(title)은 라운드 패널 "위"에 고정으로 표시되고, 패널 내부만 스크롤된다.
// - 모바일: 풀폭 평면 → 페이지 스크롤 / 데스크탑: 고정폭 패널, 뷰포트 높이 고정 + 내부 독립 스크롤
//
// 멀티컬럼은 이 컴포넌트를 가로로 여러 개 나열하는 것만으로 확장된다.
export function Column({
  title,
  titleIcon,
  headerRight,
  children,
  className,
}: {
  title?: ReactNode;
  titleIcon?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex w-full flex-col md:my-4 md:h-[calc(100vh-2rem)] md:w-176 md:shrink-0">
      {title && (
        <header className="flex shrink-0 items-center justify-between gap-2 px-2 pb-3">
          <h1 className="text-text dark:text-dark_white flex min-w-0 items-center gap-2 text-2xl font-bold">
            {titleIcon && (
              <span className="text-primary flex shrink-0 items-center [&>svg]:size-7">
                {titleIcon}
              </span>
            )}
            <span className="truncate">{title}</span>
          </h1>
          {headerRight}
        </header>
      )}

      <section
        className={cn(
          'scrollbar-none flex w-full flex-col',
          // 데스크탑: 라운드 패널 + 독립 스크롤 (제목 아래 남는 높이를 채움)
          'md:min-h-0 md:flex-1 md:overflow-y-auto md:rounded-2xl md:p-4',
          // 거터/사이드바와 같은 bg + 보더로 컬럼 윤곽 정의 (카드 hover가 보이도록 패널을 따로 칠하지 않음)
          'md:border-greyBorder md:dark:border-dark_greyBorder md:border md:bg-white',
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
