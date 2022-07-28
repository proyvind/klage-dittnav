import { IUser } from '../redux-api/user/types';
import { isNotUndefined } from './is-not-type-guards';

export const displayFnr = (fnr = ''): string => {
  if (fnr.length === 11) {
    return fnr.substring(0, 6) + ' ' + fnr.substring(6);
  }

  return fnr;
};

export const getFullName = (user: IUser): string => {
  const { fornavn, etternavn } = user.navn;

  return [fornavn, etternavn].filter(isNotUndefined).join(' ');
};

const SIZES = ['byte', 'KB', 'MB', 'GB', 'TB'];

export const displayBytes = (bytes: number): string => {
  if (bytes === 0) {
    return '0 byte';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Math.round(bytes / Math.pow(1024, i))} ${SIZES[i] ?? 'byte'}`;
};
