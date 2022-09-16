const hex = '[a-f0-9]';
const uuidRegex = `${hex}{8}-${hex}{4}-${hex}{4}-${hex}{4}-${hex}{12}`;
const numberRegex = '\\d+';
const idRegex = new RegExp(`\\/${uuidRegex}|\\/${numberRegex}`, 'gi');

const API_PREFIX = '/api';
const API_PREFIX_LENGTH = API_PREFIX.length;

export const normalizePath = (path: string) => {
  if (path.startsWith(API_PREFIX)) {
    return path.substring(API_PREFIX_LENGTH).replaceAll(idRegex, '/:id');
  }

  return '/';
};
