import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '../../functions/get-query-value';
import { useSessionAnke } from '../../hooks/use-session-anke';
import { useIsAuthenticated, useUser } from '../../hooks/use-user';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { useAppDispatch } from '../../redux/configure-store';
import { useCreateAnkeMutation, useResumeOrCreateAnkeMutation } from '../../redux-api/case/anke/api';
import { handleCreateAnke, handleResumeOrCreateAnke, handleSessionAnke } from './handlers';

interface IResult {
  error: string | null;
  loading: string;
}

export const useAnke = (innsendingsytelse: Innsendingsytelse): IResult => {
  const language = useLanguage();
  const navigate = useNavigate();
  const { anke_create, anke_loader } = useTranslation();
  const [query] = useSearchParams();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const internalSaksnummer = getQueryValue(query.get('saksnummer'));

  const [createAnke, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateAnkeMutation();

  const [resumeOrCreateAnke, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateAnkeMutation();

  const [sessionAnke, sessionAnkeIsLoading] = useSessionAnke(innsendingsytelse, internalSaksnummer);
  const dispatch = useAppDispatch();

  const isLoading = authIsLoading || createIsLoading || resumeIsLoading || userIsLoading;
  const isDone = createHasFailed || createIsSuccess || resumeHasFailed || resumeIsSuccess;

  useEffect(() => {
    if (isLoading || isDone || sessionAnkeIsLoading || innsendingsytelse === null) {
      return;
    }

    if (isAuthenticated === false) {
      handleSessionAnke({ sessionAnke, innsendingsytelse, dispatch, internalSaksnummer, navigate, language });

      return;
    }

    if (user === undefined) {
      return;
    }

    if (sessionAnke !== null && sessionAnke.foedselsnummer === user.folkeregisteridentifikator?.identifikasjonsnummer) {
      handleCreateAnke({
        sessionAnke,
        internalSaksnummer,
        innsendingsytelse,
        navigate,
        language,
        dispatch,
        createAnke,
      });

      return;
    }

    handleResumeOrCreateAnke({ internalSaksnummer, innsendingsytelse, language, resumeOrCreateAnke, navigate });
  }, [
    createAnke,
    dispatch,
    innsendingsytelse,
    internalSaksnummer,
    isAuthenticated,
    isDone,
    isLoading,
    language,
    navigate,
    resumeOrCreateAnke,
    sessionAnke,
    sessionAnkeIsLoading,
    user,
  ]);

  const hasFailed = createHasFailed || resumeHasFailed;

  const error = hasFailed ? anke_create.create_error : null;

  const loading = anke_loader.loading_anke;

  return { error, loading };
};
