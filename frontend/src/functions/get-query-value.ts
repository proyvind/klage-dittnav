export const getQueryValue = (queryValue: string | string[] | null | undefined): string | null => {
  if (typeof queryValue === 'string' && queryValue.length !== 0) {
    return queryValue;
  }

  return null;
};
