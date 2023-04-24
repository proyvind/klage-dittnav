export enum ErrorMessageKeys {
  TOO_LARGE = 'TOO_LARGE',
  TOTAL_TOO_LARGE = 'TOTAL_TOO_LARGE',
  ENCRYPTED = 'ENCRYPTED',
  EMPTY = 'EMPTY',
  VIRUS = 'VIRUS',
  FILE_COULD_NOT_BE_CONVERTED = 'FILE_COULD_NOT_BE_CONVERTED',
}

const KEYS = Object.values(ErrorMessageKeys);

export const isErrorMessageKey = (key: string): key is ErrorMessageKeys => KEYS.some((k) => k === key);
