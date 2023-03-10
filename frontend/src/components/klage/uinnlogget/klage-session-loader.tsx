import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '../../../functions/get-query-value';
import { useSessionKlage } from '../../../hooks/use-session-klage';
import { useIsAuthenticated } from '../../../hooks/use-user';
import { Innsendingsytelse } from '../../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { LoadingPage } from '../../loading-page/loading-page';
import { ISessionKlage } from './types';

interface Props {
  Component: React.ComponentType<{ klage: ISessionKlage }>;
  innsendingsytelse: Innsendingsytelse;
}

export const KlageSessionLoader = ({ Component, innsendingsytelse }: Props) => {
  const { data: isAuthenticated, isLoading: userIsLoading, isFetching: userIsFetching } = useIsAuthenticated();
  const [query] = useSearchParams();
  const internalSaksnummer = getQueryValue(query.get('saksnummer'));
  const [klage, klageIsLoading] = useSessionKlage(innsendingsytelse, internalSaksnummer);
  const { klage_loader, user_loader } = useTranslation();
  const language = useLanguage();

  if (userIsLoading || userIsFetching) {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  if (klageIsLoading) {
    return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
  }

  if (isAuthenticated === true) {
    return <Navigate to={`/${language}/klage/ny/${innsendingsytelse}`} replace />;
  }

  return <Component klage={klage} />;
};
