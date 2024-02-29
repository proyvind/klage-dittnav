import { useEffect, useMemo } from 'react';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useAppDispatch, useAppSelector } from '@app/redux/configure-store';
import { getSessionCaseKey } from '@app/redux/session/klage/helpers';
import { loadOrCreateSessionCase } from '@app/redux/session/session';
import { CaseType } from '@app/redux-api/case/types';

export const useSessionCase = (
  type: CaseType,
  innsendingsytelse: Innsendingsytelse,
  internalSaksnummer: string | null,
): [ISessionCase, false] | [undefined, true] => {
  const dispatch = useAppDispatch();
  const sessionCaseMap = useAppSelector((state) => state.session);
  const language = useLanguage();

  const data = useMemo(
    () => sessionCaseMap[getSessionCaseKey(type, innsendingsytelse)],
    [innsendingsytelse, sessionCaseMap, type],
  );

  useEffect(() => {
    if (data === undefined) {
      dispatch(
        loadOrCreateSessionCase({
          type,
          innsendingsytelse,
          data: { language, innsendingsytelse, internalSaksnummer },
        }),
      );
    }
  }, [dispatch, innsendingsytelse, internalSaksnummer, data, language, type]);

  if (data === undefined) {
    return [undefined, true];
  }

  return [data, false];
};
