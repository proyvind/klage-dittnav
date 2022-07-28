export const getQueryValue = (queryValue: string | string[] | null | undefined) => {
  if (typeof queryValue === 'string' && queryValue.length !== 0) {
    return queryValue;
  }

  return null;
};
