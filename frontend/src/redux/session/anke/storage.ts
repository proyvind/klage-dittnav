import { ISessionAnke } from '../../../components/anke/uinnlogget/types';
import { getSessionAnkeKey } from './helpers';
import { SessionAnkeKey } from './types';

export const readSessionAnke = (key: SessionAnkeKey): ISessionAnke | undefined => {
  const json = window.sessionStorage.getItem(getSessionAnkeKey(key));

  return json === null ? undefined : JSON.parse(json);
};

export const saveSessionAnke = (anke: ISessionAnke | null, key: SessionAnkeKey): string => {
  if (anke === null) {
    const sessionAnkeKey = getSessionAnkeKey(key);
    window.sessionStorage.removeItem(sessionAnkeKey);

    return sessionAnkeKey;
  }

  if (typeof key !== 'string' && (key.temaKey !== anke.tema || key.titleKey !== anke.titleKey)) {
    throw new Error('TemaKey and titleKey must match');
  }

  const sessionAnkeKey = getSessionAnkeKey(key);
  window.sessionStorage.setItem(sessionAnkeKey, JSON.stringify(anke));

  return sessionAnkeKey;
};
