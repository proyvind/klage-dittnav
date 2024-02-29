import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { getSessionCaseKey } from './helpers';

export const readSessionCase = (key: string): ISessionCase | undefined => {
  const json = window.sessionStorage.getItem(key);

  try {
    return json === null ? undefined : JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse session case', e);

    removeSessionCase(key);

    return undefined;
  }
};

export const saveSessionCase = (ytelse: Innsendingsytelse, data: ISessionCase): string => {
  if (ytelse !== data.innsendingsytelse) {
    throw new Error('Innsendingsytelse must match');
  }

  const keyString = getSessionCaseKey(data.type, ytelse);
  window.sessionStorage.setItem(keyString, JSON.stringify(data));

  return keyString;
};

export const removeSessionCase = (key: string): string => {
  window.sessionStorage.removeItem(key);

  return key;
};
