import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { TemaKey } from '../../../tema/tema';
import { getSessionKlageKey } from './helpers';

export const readSessionKlage = (temaKey: TemaKey, titleKey: string | null): ISessionKlage | undefined => {
  const json = window.sessionStorage.getItem(getSessionKlageKey(temaKey, titleKey));

  return json === null ? undefined : JSON.parse(json);
};

export const saveSessionKlage = (temaKey: TemaKey, titleKey: string | null, klage: ISessionKlage | null): string => {
  if (klage === null) {
    const key = getSessionKlageKey(temaKey, titleKey);
    window.sessionStorage.removeItem(key);

    return key;
  }

  if (temaKey !== klage.tema || titleKey !== klage.titleKey) {
    throw new Error('TemaKey and titleKey must match');
  }

  const key = getSessionKlageKey(temaKey, titleKey);
  window.sessionStorage.setItem(key, JSON.stringify(klage));

  return key;
};
