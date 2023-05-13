function getDayOfWeek(date: string): string {
  const dateParts = date.split(".");
  const d = new Date(
    Number(dateParts[0]),
    Number(dateParts[1]) - 1,
    Number(dateParts[2]),
  );

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return days[d.getDay()];
}

export default getDayOfWeek;
