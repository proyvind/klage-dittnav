import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '@app/functions/get-query-value';
import { useSessionCase } from '@app/hooks/use-session-klage';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { CASE_TYPE_PATH_SEGMENTS, CaseType } from '@app/redux-api/case/types';
import { LoadingPage } from '../../loading-page/loading-page';
import { ISessionCase } from './types';

interface Props {
  Component: React.ComponentType<{ data: ISessionCase }>;
  innsendingsytelse: Innsendingsytelse;
  type: CaseType;
}

export const KlageSessionLoader = ({ Component, innsendingsytelse, type }: Props) => {
  const { data: isAuthenticated, isLoading: userIsLoading, isFetching: userIsFetching } = useIsAuthenticated();
  const [query] = useSearchParams();
  const internalSaksnummer = getQueryValue(query.get('saksnummer'));
  const [data, isLoading] = useSessionCase(type, innsendingsytelse, internalSaksnummer);
  const { case_loader: klage_loader, user_loader } = useTranslation();
  const language = useLanguage();

  if (userIsLoading || userIsFetching) {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  if (isLoading) {
    return <LoadingPage>{klage_loader.loading}</LoadingPage>;
  }

  if (isAuthenticated === true) {
    return <Navigate to={`/${language}/${CASE_TYPE_PATH_SEGMENTS[type]}/${innsendingsytelse}`} replace />;
  }

  return <Component data={data} />;
};
