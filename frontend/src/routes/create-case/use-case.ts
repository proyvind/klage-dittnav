import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '@app/functions/get-query-value';
import { useSessionCase } from '@app/hooks/use-session-klage';
import { useIsAuthenticated, useUser } from '@app/hooks/use-user';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { useAppDispatch } from '@app/redux/configure-store';
import { useCreateCaseMutation, useResumeOrCreateCaseMutation } from '@app/redux-api/case/api';
import { CaseType } from '@app/redux-api/case/types';
import { handleCreateCase, handleResumeOrCreateCase, handleSessionCase } from './handlers';

interface IResult {
  error: string | null;
  loading: string;
}

export const useCase = (type: CaseType, innsendingsytelse: Innsendingsytelse): IResult => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { case_loader, error_messages } = useTranslation();
  const [query] = useSearchParams();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const internalSaksnummer = getQueryValue(query.get('saksnummer'));

  const [createCase, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateCaseMutation();

  const [resumeOrCreateCase, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateCaseMutation();

  const [sessionCase, sessionCaseIsLoading] = useSessionCase(type, innsendingsytelse, internalSaksnummer);
  const dispatch = useAppDispatch();

  const isLoading = authIsLoading || createIsLoading || resumeIsLoading || userIsLoading;
  const isDone = createHasFailed || createIsSuccess || resumeHasFailed || resumeIsSuccess;

  useEffect(() => {
    if (isLoading || isDone || sessionCaseIsLoading || innsendingsytelse === null) {
      return;
    }

    if (isAuthenticated === false) {
      handleSessionCase({
        type,
        dispatch,
        internalSaksnummer,
        innsendingsytelse,
        language,
        navigate,
        sessionCase,
      });

      return;
    }

    if (user === undefined) {
      return;
    }

    if (sessionCase !== null && sessionCase.foedselsnummer === user.folkeregisteridentifikator?.identifikasjonsnummer) {
      handleCreateCase({
        createCase,
        dispatch,
        internalSaksnummer,
        innsendingsytelse,
        language,
        navigate,
        sessionCase,
      });

      return;
    }

    handleResumeOrCreateCase({
      type,
      internalSaksnummer,
      innsendingsytelse,
      language,
      navigate,
      resumeOrCreateCase,
    });
  }, [
    createCase,
    dispatch,
    innsendingsytelse,
    internalSaksnummer,
    isAuthenticated,
    isDone,
    isLoading,
    language,
    navigate,
    resumeOrCreateCase,
    sessionCase,
    sessionCaseIsLoading,
    type,
    user,
  ]);

  const hasFailed = createHasFailed || resumeHasFailed;

  const error = hasFailed ? error_messages.create_error[type] : null;

  const { loading } = case_loader;

  return { error, loading };
};
