import {
  differenceInDays,
  parse,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

const calculateDDay = (deadline: string): number | never => {
  // Validate date format
  const parsedDeadline = parse(deadline, "yyyy.MM.dd", new Date());

  if (isNaN(parsedDeadline.getTime())) {
    throw new Error("The deadline date format is incorrect.");
  }

  const now = new Date();

  // Set deadline time to 23:59:59
  const deadlineWithTime = setHours(
    setMinutes(setSeconds(parsedDeadline, 59), 59),
    23,
  );

  const daysDiff = differenceInDays(deadlineWithTime, now);

  return daysDiff;
};

const dDayFormated = (deadline: string): string => {
  const daysDiff = calculateDDay(deadline);

  if (daysDiff < 0) {
    return "기한 지남";
  } else if (daysDiff === 0) {
    return "D - Day";
  } else {
    return `D - ${daysDiff}`;
  }
};

export default dDayFormated;
