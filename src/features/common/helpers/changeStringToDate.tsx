import dayjs from "dayjs";
/**
 * a helper fuction that used to convert the string date value to day.js | Date format   to used inside client component
 * @param {string} date
 * @returns {dayjs.Dayjs}
 */
export const changeStringToDate = (date: string): dayjs.Dayjs => {
  return dayjs(date, "YYYY-MM-DD");
};
