import { useEffect, useMemo } from 'react';
import { ISessionAnke } from '@app/components/anke/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useAppDispatch, useAppSelector } from '@app/redux/configure-store';
import { createSessionAnke, getSessionAnkeKey } from '@app/redux/session/anke/helpers';
import { loadSessionAnke } from '@app/redux/session/session';

export const useSessionAnke = (
  innsendingsytelse: Innsendingsytelse,
  internalSaksnummer: string | null,
): [ISessionAnke, false] | [undefined, true] => {
  const dispatch = useAppDispatch();
  const sessionAnkeMap = useAppSelector((state) => state.session.anker);
  const language = useLanguage();

  const anke = useMemo(() => {
    const ankeKey = getSessionAnkeKey(innsendingsytelse);

    return sessionAnkeMap[ankeKey];
  }, [sessionAnkeMap, innsendingsytelse]);

  useEffect(() => {
    if (anke === undefined) {
      dispatch(
        loadSessionAnke({
          key: innsendingsytelse,
          anke: createSessionAnke(language, innsendingsytelse, internalSaksnummer),
        }),
      );
    }
  }, [dispatch, anke, language, innsendingsytelse, internalSaksnummer]);

  if (anke === undefined) {
    return [undefined, true];
  }

  return [anke, false];
};
