import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { displayFnr } from '../../functions/display';
import { getQueryValue } from '../../functions/get-query-value';
import { useSessionKlage } from '../../hooks/use-session-klage';
import { useIsAuthenticated, useUser } from '../../hooks/use-user';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { useAppDispatch } from '../../redux/configure-store';
import { SessionKey } from '../../redux/session/types';
import { useCreateKlageMutation, useResumeOrCreateKlageMutation } from '../../redux-api/case/klage/api';
import { useGetFullmaktsgiverQuery } from '../../redux-api/user/api';
import { TemaKey, ensureStringIsTema } from '../../tema/tema';
import { handleCreateKlage, handleResumeOrCreateKlage, handleSessionKlage } from './handlers';

interface IUseKlageResult {
  error: string | null;
  loading: string;
}

export const useKlage = (): IUseKlageResult => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { klage_create, klage_loader, fullmakt } = useTranslation();
  const [query] = useSearchParams();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const tema = query.get('tema');
  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const titleKey = getQueryValue(query.get('tittel'));
  const internalSaksnummer = getQueryValue(query.get('saksnummer'));
  const fullmaktsgiver = getQueryValue(query.get('fullmaktsgiver'));

  const [hasFullmaktsgiver, hasFullmaktsgiverIsLoading] = useHasFullmaktsgiver(temaKey, fullmaktsgiver);

  const [createKlage, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateKlageMutation();

  const [resumeOrCreateKlage, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateKlageMutation();

  const key = useMemo<SessionKey | typeof skipToken>(
    () => (temaKey === null ? skipToken : { temaKey, titleKey }),
    [temaKey, titleKey]
  );

  const sessionKlage = useSessionKlage(key);
  const dispatch = useAppDispatch();

  const sessionKlageIsLoading = typeof sessionKlage === 'undefined';

  const isLoading = authIsLoading || createIsLoading || resumeIsLoading || userIsLoading;
  const isDone = createHasFailed || createIsSuccess || resumeHasFailed || resumeIsSuccess;

  useEffect(() => {
    if (isLoading || isDone || sessionKlageIsLoading || key === skipToken) {
      return;
    }

    if (isAuthenticated === false) {
      handleSessionKlage({ dispatch, internalSaksnummer, key, language, navigate, sessionKlage });

      return;
    }

    if (hasFullmaktsgiverIsLoading || (fullmaktsgiver !== null && !hasFullmaktsgiver) || user === undefined) {
      return;
    }

    if (
      sessionKlage !== null &&
      sessionKlage.foedselsnummer === user.folkeregisteridentifikator?.identifikasjonsnummer
    ) {
      handleCreateKlage({
        createKlage,
        dispatch,
        fullmaktsgiver,
        internalSaksnummer,
        key,
        language,
        navigate,
        sessionKlage,
      });

      return;
    }

    handleResumeOrCreateKlage({ fullmaktsgiver, internalSaksnummer, key, language, navigate, resumeOrCreateKlage });
  }, [
    createKlage,
    dispatch,
    fullmaktsgiver,
    hasFullmaktsgiver,
    hasFullmaktsgiverIsLoading,
    internalSaksnummer,
    isAuthenticated,
    isDone,
    isLoading,
    key,
    language,
    navigate,
    resumeOrCreateKlage,
    sessionKlage,
    sessionKlageIsLoading,
    user,
  ]);

  const hasFailed = createHasFailed || resumeHasFailed;

  const error = useMemo<string | null>(() => {
    if (hasFailed) {
      return klage_create.create_error;
    }

    if (temaKey === null) {
      return klage_create.invalid_tema(tema?.toString());
    }

    if (fullmaktsgiver !== null && !hasFullmaktsgiver && !hasFullmaktsgiverIsLoading) {
      return klage_create.finne_fullmaktsgiver_error(displayFnr(fullmaktsgiver));
    }

    return null;
  }, [hasFailed, temaKey, fullmaktsgiver, hasFullmaktsgiver, hasFullmaktsgiverIsLoading, klage_create, tema]);

  const loading = hasFullmaktsgiverIsLoading ? fullmakt.loading : klage_loader.loading_klage;

  return { error, loading };
};

const useHasFullmaktsgiver = (temaKey: TemaKey | null, fullmaktsgiver: string | null): [boolean, boolean] => {
  const query = temaKey === null || fullmaktsgiver === null ? skipToken : { temaKey, fullmaktsgiver };
  const { isLoading, isFetching, isSuccess } = useGetFullmaktsgiverQuery(query);

  return [isSuccess, isLoading || isFetching];
};
