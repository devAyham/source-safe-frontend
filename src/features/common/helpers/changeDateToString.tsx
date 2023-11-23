import dayjs from "dayjs";

/**
 * a helper fuction that used to convert the day.js | Date format to string value to used in apis forms
 * @param {Date | dayjs.Dayjs} date
 * @returns {string}
 */
export const changeDateToString = (date: Date | dayjs.Dayjs): string => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
