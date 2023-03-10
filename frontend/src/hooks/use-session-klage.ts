import { useEffect, useMemo } from 'react';
import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../language/use-language';
import { useAppDispatch, useAppSelector } from '../redux/configure-store';
import { createSessionKlage, getSessionKlageKey } from '../redux/session/klage/helpers';
import { loadSessionKlage } from '../redux/session/session';

export const useSessionKlage = (
  innsendingsytelse: Innsendingsytelse,
  internalSaksnummer: string | null
): [ISessionKlage, false] | [undefined, true] => {
  const dispatch = useAppDispatch();
  const sessionKlageMap = useAppSelector((state) => state.session.klager);
  const language = useLanguage();

  const klage = useMemo(() => {
    const klageKey = getSessionKlageKey(innsendingsytelse);

    return sessionKlageMap[klageKey];
  }, [innsendingsytelse, sessionKlageMap]);

  useEffect(() => {
    if (klage === undefined) {
      dispatch(
        loadSessionKlage({
          key: innsendingsytelse,
          klage: createSessionKlage(language, innsendingsytelse, internalSaksnummer),
        })
      );
    }
  }, [dispatch, innsendingsytelse, internalSaksnummer, klage, language]);

  if (klage === undefined) {
    return [undefined, true];
  }

  return [klage, false];
};
