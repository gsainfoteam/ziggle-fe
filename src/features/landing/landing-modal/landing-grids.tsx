import { useMemo } from 'react';

import { cn } from '@/common/utils';
function getRandomInt(min = 50, max = 400) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const columnColors = [
  'bg-primary/80',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/80',
];

export default function LandingGrids() {
  const columnHeights = useMemo(() => {
    return Array.from({ length: 4 }, () => getRandomInt());
  }, []);
  return (
    <div className="mask-fade-y relative flex h-full items-center justify-center gap-4 overflow-hidden">
      {columnColors.map((color, colIdx) => {
        const isEven = colIdx % 2 === 0;
        const BlockSet = () => (
          <div className="flex flex-col gap-4 pb-4">
            {columnHeights.map((height, blockIdx) => (
              <div
                key={blockIdx}
                className={cn('shrink-0 rounded-xl', color)}
                style={{
                  height: `${height}px`,
                }}
              />
            ))}
          </div>
        );

        return (
          <div key={colIdx} className="relative h-full w-31">
            <div
              className={cn(
                'flex flex-col',
                isEven ? 'animate-col-up' : 'animate-col-down',
              )}
            >
              <BlockSet />
              <BlockSet />
            </div>
          </div>
        );
      })}
    </div>
  );
}
