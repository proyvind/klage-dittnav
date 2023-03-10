import { ISessionAnke } from '../../../components/anke/uinnlogget/types';
import { SessionKey } from '../types';
import { getSessionAnkeKey } from './helpers';

export const readSessionAnke = (key: SessionKey): ISessionAnke | undefined => {
  const json = window.sessionStorage.getItem(getSessionAnkeKey(key));

  return json === null ? undefined : JSON.parse(json);
};

export const saveSessionAnke = (key: SessionKey, anke: ISessionAnke | null): string => {
  if (anke === null) {
    const sessionAnkeKey = getSessionAnkeKey(key);
    window.sessionStorage.removeItem(sessionAnkeKey);

    return sessionAnkeKey;
  }

  if (key !== anke.innsendingsytelse) {
    throw new Error('Innsendingsytelse must match');
  }

  const sessionAnkeKey = getSessionAnkeKey(key);
  window.sessionStorage.setItem(sessionAnkeKey, JSON.stringify(anke));

  return sessionAnkeKey;
};
