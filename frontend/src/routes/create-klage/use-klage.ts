import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { displayFnr } from '../../functions/display';
import { getQueryValue } from '../../functions/get-query-value';
import { useSessionKlage } from '../../hooks/use-session-klage';
import { useIsAuthenticated, useUser } from '../../hooks/use-user';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { useAppDispatch } from '../../redux/configure-store';
import { useCreateKlageMutation, useResumeOrCreateKlageMutation } from '../../redux-api/case/klage/api';
import { useGetFullmaktsgiverQuery } from '../../redux-api/user/api';
import { handleCreateKlage, handleResumeOrCreateKlage, handleSessionKlage } from './handlers';

interface IResult {
  error: string | null;
  loading: string;
}

export const useKlage = (innsendingsytelse: Innsendingsytelse): IResult => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { klage_create, klage_loader, fullmakt } = useTranslation();
  const [query] = useSearchParams();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const internalSaksnummer = getQueryValue(query.get('saksnummer'));
  const fullmaktsgiver = getQueryValue(query.get('fullmaktsgiver'));

  const [hasFullmaktsgiver, hasFullmaktsgiverIsLoading] = useHasFullmaktsgiver(innsendingsytelse, fullmaktsgiver);

  const [createKlage, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateKlageMutation();

  const [resumeOrCreateKlage, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateKlageMutation();

  const [sessionKlage, sessionKlageIsLoading] = useSessionKlage(innsendingsytelse, internalSaksnummer);
  const dispatch = useAppDispatch();

  const isLoading = authIsLoading || createIsLoading || resumeIsLoading || userIsLoading;
  const isDone = createHasFailed || createIsSuccess || resumeHasFailed || resumeIsSuccess;

  useEffect(() => {
    if (isLoading || isDone || sessionKlageIsLoading || innsendingsytelse === null) {
      return;
    }

    if (isAuthenticated === false) {
      handleSessionKlage({ dispatch, internalSaksnummer, innsendingsytelse, language, navigate, sessionKlage });

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
        innsendingsytelse,
        language,
        navigate,
        sessionKlage,
      });

      return;
    }

    handleResumeOrCreateKlage({
      fullmaktsgiver,
      internalSaksnummer,
      innsendingsytelse,
      language,
      navigate,
      resumeOrCreateKlage,
    });
  }, [
    createKlage,
    dispatch,
    fullmaktsgiver,
    hasFullmaktsgiver,
    hasFullmaktsgiverIsLoading,
    innsendingsytelse,
    internalSaksnummer,
    isAuthenticated,
    isDone,
    isLoading,
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

    if (fullmaktsgiver !== null && !hasFullmaktsgiver && !hasFullmaktsgiverIsLoading) {
      return klage_create.finne_fullmaktsgiver_error(displayFnr(fullmaktsgiver));
    }

    return null;
  }, [hasFailed, fullmaktsgiver, hasFullmaktsgiver, hasFullmaktsgiverIsLoading, klage_create]);

  const loading = hasFullmaktsgiverIsLoading ? fullmakt.loading : klage_loader.loading_klage;

  return { error, loading };
};

const useHasFullmaktsgiver = (
  innsendingsytelse: Innsendingsytelse | null,
  fullmaktsgiver: string | null
): [boolean, boolean] => {
  const query =
    innsendingsytelse === null || fullmaktsgiver === null ? skipToken : { innsendingsytelse, fullmaktsgiver };
  const { isLoading, isFetching, isSuccess } = useGetFullmaktsgiverQuery(query);

  return [isSuccess, isLoading || isFetching];
};
