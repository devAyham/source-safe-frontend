import i18n from "libs/i18n";

export const dateFormatter = (dateString: string, format?: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "medium", // Include time component
  };
  return date.toLocaleString(i18n.language, options);
};
