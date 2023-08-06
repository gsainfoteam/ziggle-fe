import { differenceInDays } from "date-fns";

const calculateDDay = (deadline: string): number | never => {
  // Validate date format
  // const parsedDeadline = parse(deadline, "yyyy.MM.dd", new Date());
  const parsedDeadline = new Date(deadline); // 위 방식대로 하면 에러가 나서 이렇게 했습니다. firefox 작동 확인 완료.

  if (isNaN(parsedDeadline.getTime())) {
    throw new Error("The deadline date format is incorrect.");
  }

  const now = new Date();
  const daysDiff = differenceInDays(parsedDeadline, now);

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
