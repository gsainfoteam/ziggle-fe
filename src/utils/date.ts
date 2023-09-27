import dayjs from "dayjs";

export const calculateDDay = (deadline: string): number | never => {
  // Validate date format
  const parsedDeadline = dayjs(deadline);
  if (!parsedDeadline.isValid()) {
    throw new Error("The deadline date format is incorrect.");
  }

  const finalDeadline = parsedDeadline.startOf("day");

  const today = dayjs().startOf("day");

  // Calculate the difference in days
  const daysDiff = finalDeadline.diff(today, "day");

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
