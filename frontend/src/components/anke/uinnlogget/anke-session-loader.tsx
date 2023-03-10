import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '../../../components/loading-page/loading-page';
import { getQueryValue } from '../../../functions/get-query-value';
import { useSessionAnke } from '../../../hooks/use-session-anke';
import { useIsAuthenticated } from '../../../hooks/use-user';
import { Innsendingsytelse } from '../../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { ISessionAnke } from './types';

interface Props {
  Component: React.ComponentType<{ anke: ISessionAnke }>;
  innsendingsytelse: Innsendingsytelse;
}

export const AnkeSessionLoader = ({ Component, innsendingsytelse }: Props) => {
  const { data: isAuthenticated, isLoading: userIsLoading, isFetching: userIsFetching } = useIsAuthenticated();
  const [query] = useSearchParams();
  const internalSaksnummer = getQueryValue(query.get('saksnummer'));
  const [anke, ankeIsLoading] = useSessionAnke(innsendingsytelse, internalSaksnummer);
  const { anke_loader, user_loader } = useTranslation();
  const language = useLanguage();

  if (userIsLoading || userIsFetching) {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  if (ankeIsLoading) {
    return <LoadingPage>{anke_loader.loading_anke}</LoadingPage>;
  }

  if (isAuthenticated === true) {
    return <Navigate to={`/${language}/anke/ny/${innsendingsytelse}`} replace />;
  }

  return <Component anke={anke} />;
};
