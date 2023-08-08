const getDayOfWeek = (date: string): string => {
  const d = new Date(date);

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return days[d.getDay()];
};

export default getDayOfWeek;
