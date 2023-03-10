import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { SessionKey } from '../types';
import { getSessionKlageKey } from './helpers';

export const readSessionKlage = (key: SessionKey): ISessionKlage | undefined => {
  const json = window.sessionStorage.getItem(getSessionKlageKey(key));

  return json === null ? undefined : JSON.parse(json);
};

export const saveSessionKlage = (key: SessionKey, klage: ISessionKlage | null): string => {
  if (klage === null) {
    const keyString = getSessionKlageKey(key);
    window.sessionStorage.removeItem(keyString);

    return keyString;
  }

  if (key.temaKey !== klage.tema || key.titleKey !== klage.titleKey) {
    throw new Error('TemaKey and titleKey must match');
  }

  const keyString = getSessionKlageKey(key);
  window.sessionStorage.setItem(keyString, JSON.stringify(klage));

  return keyString;
};
