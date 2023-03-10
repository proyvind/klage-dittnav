import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect, useMemo } from 'react';
import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { useLanguage } from '../language/use-language';
import { useAppDispatch, useAppSelector } from '../redux/configure-store';
import { getSessionKlageKey } from '../redux/session/klage/helpers';
import { loadSessionKlage } from '../redux/session/session';
import { SessionKey } from '../redux/session/types';

export const useSessionKlage = (key: SessionKey | typeof skipToken): ISessionKlage | undefined | null => {
  const dispatch = useAppDispatch();
  const sessionKlageMap = useAppSelector((state) => state.session.klager);
  const language = useLanguage();

  const klage = useMemo(() => {
    if (key === skipToken) {
      return undefined;
    }

    const klageKey = getSessionKlageKey(key);

    return sessionKlageMap[klageKey];
  }, [key, sessionKlageMap]);

  useEffect(() => {
    if (key !== skipToken && typeof klage === 'undefined') {
      dispatch(loadSessionKlage({ key, klage: null }));
    }
  }, [dispatch, key, klage, language]);

  return klage;
};
