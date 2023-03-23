import { ISessionKlage } from '@app/components/klage/uinnlogget/types';
import { SessionKey } from '../types';
import { getSessionKlageKey } from './helpers';

export const readSessionKlage = (key: string): ISessionKlage | undefined => {
  const json = window.sessionStorage.getItem(key);

  return json === null ? undefined : JSON.parse(json);
};

export const saveSessionKlage = (key: SessionKey, klage: ISessionKlage | null): string => {
  if (klage === null) {
    const keyString = getSessionKlageKey(key);
    window.sessionStorage.removeItem(keyString);

    return keyString;
  }

  if (key !== klage.innsendingsytelse) {
    throw new Error('Innsendingsytelse must match');
  }

  const keyString = getSessionKlageKey(key);
  window.sessionStorage.setItem(keyString, JSON.stringify(klage));

  return keyString;
};
