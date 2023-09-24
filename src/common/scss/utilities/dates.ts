const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getToday = (): Date => {
  return new Date();
};

export const getWeekdayDate = (date: Date): string => {
  const day = date.getDay();
  return `${weekday[day]}, ${date.getDate()}`;
};

export const getTimeSince = (date: Date | undefined): string => {
  const currentDate = new Date();
  //const timeBetween = currentDate. - date;

  return "2 mins ago";
};
