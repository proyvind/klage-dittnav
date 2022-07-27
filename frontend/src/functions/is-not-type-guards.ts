export const isNotNull = <T>(v: T | null): v is T => v !== null;
export const isNotUndefined = <T>(v: T | undefined): v is T => typeof v !== 'undefined';
