import { isNotNull } from './is-not-type-guards';

export const queryStringify = (query: unknown): string => {
  if (query === null || typeof query !== 'object') {
    return '';
  }

  const keys = Object.keys(query);

  if (keys.length === 0) {
    return '';
  }

  const params = keys
    .map((key) => {
      const value: unknown = query[key];

      if (value === null || value === undefined) {
        return null;
      }

      if (typeof value === 'number') {
        return `${key}=${value.toString(10)}`;
      }

      if (typeof value === 'string') {
        return `${key}=${value}`;
      }

      if (typeof value === 'boolean') {
        return `${key}=${value.toString()}`;
      }

      if (Array.isArray(value)) {
        const arrayValue = value.map(stringifyValue).filter(isNotNull).join(',');
        return `${key}=${arrayValue}`;
      }

      return null;
    })
    .filter(isNotNull)
    .join('&');

  if (params.length === 0) {
    return '';
  }

  return `?${params}`;
};

const stringifyValue = (value: string | number | boolean): string | null => {
  if (typeof value === 'number') {
    return value.toString(10);
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (typeof value === 'string') {
    return value;
  }

  return null;
};
