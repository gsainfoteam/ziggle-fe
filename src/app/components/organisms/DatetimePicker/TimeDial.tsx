// Displays a single dial that allows to pick hour and minute
// Each 'slot' (field of hour and minute) can have custom increments, the default is 1 for hours, 5 for minutes

import dayjs from 'dayjs';

// TODO : implement function
// every frame has to render max 5 numbers (eff. 6), which is [num-2, ..., num+2]
// the size of text is 20-4/em.
// make sure the size change is animated using 'transition' in css
// the text in center needs to be a mask

interface TimeDialProps {
  min: number;
  max: number;
  increment: number;
  cycles: boolean;
}

const TimeDial = ({ min, max, increment, cycles }: TimeDialProps) => (
  <div className="inline-flex h-[106px] w-[45px] flex-col items-center justify-center gap-1">
    <div></div>
  </div>
);

export default TimeDial;
