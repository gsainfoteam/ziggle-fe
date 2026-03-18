import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import Fire from '@/assets/icons/fire.svg?react';
export const ZaboSkeleton = () => {
  const skeletonBg = 'bg-greyLight dark:bg-dark_greyDark';

  return (
    <div className="text-text flex animate-pulse flex-col rounded-[10px] pt-2.5 transition">
      <div className="mx-3 my-2.5 flex flex-wrap items-center gap-y-3">
        <div className={`h-9 w-9 rounded-full ${skeletonBg}`} />
        <div className={`ml-2 h-6 w-24 rounded-md ${skeletonBg}`} />

        <span className="text-greyDark dark:text-grey mx-[5px] font-bold">
          ·
        </span>
        <div className={`h-5 w-16 rounded-md ${skeletonBg}`} />

        <div className="w-[15px]" />

        <div className={`h-[26px] w-[60px] rounded-md ${skeletonBg}`} />
      </div>
      <div className="flex w-full flex-col gap-2.5 px-4 pb-2.5">
        <div className={`h-7 w-3/4 rounded-md ${skeletonBg}`} />
        <div className="group flex w-full flex-col items-center gap-2">
          <div className="flex w-fit max-w-full gap-[8px] overflow-hidden">
            <div
              className={`h-[200px] min-w-[200px] shrink-0 rounded-md border border-gray-300 dark:border-transparent ${skeletonBg}`}
            />
            <div
              className={`h-[200px] min-w-[200px] shrink-0 rounded-md border border-gray-300 dark:border-transparent ${skeletonBg}`}
            />
            <div
              className={`h-[200px] min-w-[200px] shrink-0 rounded-md border border-gray-300 dark:border-transparent ${skeletonBg}`}
            />
            <div
              className={`h-[200px] min-w-[200px] shrink-0 rounded-md border border-gray-300 dark:border-transparent ${skeletonBg}`}
            />
            <div
              className={`h-[200px] min-w-[200px] shrink-0 rounded-md border border-gray-300 dark:border-transparent ${skeletonBg}`}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <div className={`h-[28px] w-14 rounded-full ${skeletonBg}`} />
          <div className={`h-[28px] w-20 rounded-full ${skeletonBg}`} />
          <div className={`h-[28px] w-12 rounded-full ${skeletonBg}`} />
        </div>

        <div className="flex w-full flex-col gap-2 pt-1">
          <div className={`h-5 w-full rounded-md ${skeletonBg}`} />
          <div className={`h-5 w-11/12 rounded-md ${skeletonBg}`} />
          <div className={`h-5 w-4/6 rounded-md ${skeletonBg}`} />
        </div>
      </div>

      <div className="mx-3 my-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className={`h-[36px] w-[36px] rounded-full ${skeletonBg}`} />
            <div className={`h-[20px] w-[16px] rounded-md ${skeletonBg}`} />
          </div>

          <div className={`h-[26px] w-[26px] rounded-full ${skeletonBg}`} />
        </div>
      </div>
    </div>
  );
};
