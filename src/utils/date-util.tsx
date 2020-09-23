// TODO: Make date format/locale dynamic

export const formatDate = (date: Date): string => {
  if (isValidDate(date)) {
    return new Intl.DateTimeFormat("no-NB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }
  return "Ingen dato satt";
};

const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

export const isValidDateString = (date: string): boolean => {
  return !Number.isNaN(Date.parse(date));
};

export const toISOString = (date: Date): string => {
  return isValidDate(date)
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10)
    : "";
};

export const formattedDateToDateObject = (formattedDate: string): Date => {
  formattedDate.replace(".", "-");
  return new Date(formattedDate.split("-").reverse().join("-"));
};
