import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '@app/functions/get-query-value';
import { useSessionKlage } from '@app/hooks/use-session-klage';
import { useIsAuthenticated, useUser } from '@app/hooks/use-user';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { useAppDispatch } from '@app/redux/configure-store';
import { useCreateKlageMutation, useResumeOrCreateKlageMutation } from '@app/redux-api/case/klage/api';
import { handleCreateKlage, handleResumeOrCreateKlage, handleSessionKlage } from './handlers';

interface IResult {
  error: string | null;
  loading: string;
}

export const useKlage = (innsendingsytelse: Innsendingsytelse): IResult => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { klage_create, klage_loader } = useTranslation();
  const [query] = useSearchParams();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const internalSaksnummer = getQueryValue(query.get('saksnummer'));

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

    if (user === undefined) {
      return;
    }

    if (
      sessionKlage !== null &&
      sessionKlage.foedselsnummer === user.folkeregisteridentifikator?.identifikasjonsnummer
    ) {
      handleCreateKlage({
        createKlage,
        dispatch,
        internalSaksnummer,
        innsendingsytelse,
        language,
        navigate,
        sessionKlage,
      });

      return;
    }

    handleResumeOrCreateKlage({
      internalSaksnummer,
      innsendingsytelse,
      language,
      navigate,
      resumeOrCreateKlage,
    });
  }, [
    createKlage,
    dispatch,
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

  const error = hasFailed ? klage_create.create_error : null;

  const loading = klage_loader.loading_klage;

  return { error, loading };
};
