import { useEffect, useMemo } from 'react';
import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { useLanguage } from '../language/use-language';
import { useAppDispatch, useAppSelector } from '../redux/configure-store';
import { getSessionKlageKey } from '../redux/session/klage/helpers';
import { loadSessionKlage } from '../redux/session/session';
import { TemaKey } from '../tema/tema';

export const useSessionKlage = (
  temaKey: TemaKey | null,
  titleKey: string | null = null
): ISessionKlage | undefined | null => {
  const dispatch = useAppDispatch();
  const sessionKlageMap = useAppSelector((state) => state.session.klager);
  const language = useLanguage();

  const klage = useMemo(() => {
    if (temaKey === null) {
      return undefined;
    }

    const klageKey = getSessionKlageKey(temaKey, titleKey);

    return sessionKlageMap[klageKey];
  }, [sessionKlageMap, temaKey, titleKey]);

  useEffect(() => {
    if (typeof klage === 'undefined' && temaKey !== null) {
      dispatch(loadSessionKlage({ key: { temaKey, titleKey }, klage: null }));
    }
  }, [dispatch, klage, language, temaKey, titleKey]);

  return klage;
};
