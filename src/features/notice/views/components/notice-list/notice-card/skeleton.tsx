import { cn } from '@/common/utils';

export const NoticeCardSkeleton = () => {
  const s = 'bg-muted animate-pulse rounded-md';

  return (
    <div className="text-foreground flex flex-col rounded-[10px]">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 md:px-3">
        <div className="flex items-center gap-2">
          <div className={cn('size-8 shrink-0 rounded-full', s)} />
          <div className={cn('h-5 w-24', s)} />
          <div className={cn('h-4 w-16', s)} />
        </div>
        <div className={cn('h-6 w-14 rounded-full', s)} />
      </div>

      <div className="flex items-stretch gap-3 px-4 pb-2.5 md:px-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className={cn('h-7 w-3/4', s)} />
          <div className="flex flex-col gap-1.5">
            <div className={cn('h-5 w-full', s)} />
            <div className={cn('h-5 w-11/12', s)} />
            <div className={cn('h-5 w-4/6', s)} />
          </div>
          <div className="flex gap-2">
            <div className={cn('h-7 w-14 rounded-full', s)} />
            <div className={cn('h-7 w-18 rounded-full', s)} />
            <div className={cn('h-7 w-12 rounded-full', s)} />
          </div>
        </div>
        <div className={cn('w-24 shrink-0 self-stretch rounded-lg', s)} />
      </div>

      <div className="px-4 py-2.5 md:px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className={cn('size-6 rounded-full', s)} />
            <div className={cn('h-4 w-5', s)} />
          </div>
          <div className="flex items-center gap-2">
            <div className={cn('size-6 rounded-full', s)} />
            <div className={cn('size-6 rounded-full', s)} />
          </div>
        </div>
      </div>
    </div>
  );
};
