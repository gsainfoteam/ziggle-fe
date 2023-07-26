const dateFormat = (date: Date, separator = "."): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${year}${separator}${month < 10 ? `0${month}` : month}${separator}${
    dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth
  }`;
};

export default dateFormat;
