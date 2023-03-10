import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '../../functions/get-query-value';
import { useSessionAnke } from '../../hooks/use-session-anke';
import { useIsAuthenticated, useUser } from '../../hooks/use-user';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { useAppDispatch } from '../../redux/configure-store';
import { SessionKey } from '../../redux/session/types';
import { useCreateAnkeMutation, useResumeOrCreateAnkeMutation } from '../../redux-api/case/anke/api';
import { ensureStringIsTema } from '../../tema/tema';
import { handleCreateAnke, handleResumeOrCreateAnke, handleSessionAnke } from './handlers';

export const useAnke = () => {
  const [query] = useSearchParams();
  const language = useLanguage();
  const navigate = useNavigate();
  const { anke_create, anke_loader } = useTranslation();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const tema = query.get('tema');
  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const titleKey = getQueryValue(query.get('tittel'));
  const internalSaksnummer = getQueryValue(query.get('saksnummer'));

  const [resumeOrCreateAnke, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateAnkeMutation();

  const [createAnke, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateAnkeMutation();

  const key = useMemo<SessionKey | typeof skipToken>(
    () => (temaKey === null ? skipToken : { temaKey, titleKey }),
    [temaKey, titleKey]
  );

  const sessionAnke = useSessionAnke(key);
  const dispatch = useAppDispatch();

  const sessionAnkeIsLoading = typeof sessionAnke === 'undefined';

  const isLoading = authIsLoading || createIsLoading || resumeIsLoading || userIsLoading;
  const isDone = createHasFailed || createIsSuccess || resumeHasFailed || resumeIsSuccess;

  useEffect(() => {
    if (isLoading || isDone || sessionAnkeIsLoading || key === skipToken) {
      return;
    }

    if (isAuthenticated === false) {
      handleSessionAnke({ sessionAnke, key, dispatch, internalSaksnummer, navigate, language });

      return;
    }

    if (user === undefined) {
      return;
    }

    if (sessionAnke !== null && sessionAnke.foedselsnummer === user.folkeregisteridentifikator?.identifikasjonsnummer) {
      handleCreateAnke({
        sessionAnke,
        internalSaksnummer,
        key,
        navigate,
        language,
        dispatch,
        createAnke,
      });
    }

    handleResumeOrCreateAnke({ internalSaksnummer, key, language, resumeOrCreateAnke, navigate });
  }, [
    isAuthenticated,
    language,
    navigate,
    internalSaksnummer,
    sessionAnkeIsLoading,
    dispatch,
    sessionAnke,
    key,
    createAnke,
    resumeOrCreateAnke,
    user,
    isLoading,
    isDone,
  ]);

  const hasFailed = createHasFailed || resumeHasFailed;

  const error = useMemo<string | null>(() => {
    if (hasFailed) {
      return anke_create.create_error;
    }

    if (temaKey === null) {
      return anke_create.invalid_tema(tema?.toString());
    }

    return null;
  }, [hasFailed, temaKey, anke_create, tema]);

  const loading = anke_loader.loading_anke;

  return { error, loading };
};
