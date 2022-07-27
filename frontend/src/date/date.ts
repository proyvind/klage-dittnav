const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // 2020-10-29
const isoTimeRegex = /^\d{2}:\d{2}:\d{2}\.\d+$/; // 14:25:19.734593
const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z?$/; // 2020-10-29T14:25:19.734593Z

export type ISODate = string;
export type ISODateTime = string;
export type ISOTime = string;
export type prettyDate = string;
export type prettyDateTime = string;
export type prettyTime = string;

export const isoDateTimeToPretty = (isoDateTime: ISODateTime | null): prettyDateTime | null => {
  if (isoDateTime === null || !isoDateTimeRegex.test(isoDateTime)) {
    return null;
  }

  const [isoDate, isoTime] = isoDateTime.split('T');

  const prettyDate = isoDateToPretty(isoDate);
  const prettyTime = isoTimeToPretty(isoTime);

  if (prettyDate === null || prettyTime === null) {
    return null;
  }

  return `${prettyDate} ${prettyTime}`;
};

export const isoTimeToPretty = (isoTime: ISOTime | null | undefined): prettyTime | null => {
  if (isoTime === null || isoTime === undefined || !isoTimeRegex.test(isoTime)) {
    return null;
  }

  const [first] = isoTime.split('.');

  if (first === undefined) {
    return null;
  }

  return first;
};

export const isoDateToPretty = (isoDate: ISODate | null | undefined): prettyDate | null => {
  if (isoDate === null || isoDate === undefined || !isoDateRegex.test(isoDate)) {
    return null;
  }

  return isoDate.split('-').reverse().join('.');
};

const prettyRegex = /^\d{2}.\d{2}.\d{4}$/;

export const prettyDateToISO = (prettyDate: prettyDate | null | undefined): ISODate | null => {
  if (prettyDate === null || prettyDate === undefined || !prettyRegex.test(prettyDate)) {
    return null;
  }

  return prettyDate.split('.').reverse().join('-');
};

export const dateDisplayWithFallbackText = (isoDate: ISODate | null, noDateText: string): string => {
  const prettyDate = isoDateToPretty(isoDate);

  if (prettyDate === null) {
    return noDateText;
  }

  return prettyDate;
};
