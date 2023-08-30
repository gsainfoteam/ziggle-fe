import dayjs from "dayjs";

export const calculateDDay = (deadline: string): number | never => {
  // Validate date format
  const parsedDeadline = dayjs(deadline);
  if (!parsedDeadline.isValid()) {
    throw new Error("The deadline date format is incorrect.");
  }

  // Set time to 23:59:59
  const finalDeadline = parsedDeadline.hour(23).minute(59).second(59);

  const now = dayjs();

  // Calculate the difference in days
  const daysDiff = finalDeadline.diff(now, "day");

  return daysDiff;
};

export const dDayFormated = (deadline: string): string => {
  const daysDiff = calculateDDay(deadline);

  if (daysDiff < 0) {
    return "기한 지남";
  } else if (daysDiff === 0) {
    return "D - Day";
  } else {
    return `D - ${daysDiff}`;
  }
};
