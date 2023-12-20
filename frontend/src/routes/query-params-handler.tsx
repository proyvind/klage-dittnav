import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { ENVIRONMENT } from '@app/environment/environment';
import { useInnsendingsytelseFromQuery } from '@app/hooks/use-innsendingsytelse-from-query';
import { useLanguage } from '@app/language/use-language';

interface Props {
  type: 'klage' | 'anke';
}

export const QueryParamsHandler = ({ type }: Props) => {
  const language = useLanguage();
  const [query] = useSearchParams();
  const innsendingsytelse = useInnsendingsytelseFromQuery();

  if (innsendingsytelse === null) {
    console.error('Innsendingsytelse is null.');

    if (!ENVIRONMENT.isLocal) {
      location.replace(ENVIRONMENT.isProduction ? 'https://www.nav.no/klage' : 'https://www.ekstern.dev.nav.no/klage');
    }

    return <h1>404</h1>;
  }

  query.delete('tema');
  query.delete('tittel');

  return <Navigate to={`/${language}/${type}/ny/${innsendingsytelse}?${query.toString()}`} replace />;
};
