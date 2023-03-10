import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useInnsendingsytelseFromQuery } from '../hooks/use-innsendingsytelse-from-query';
import { useLanguage } from '../language/use-language';

interface Props {
  type?: 'klage' | 'anke';
}

export const QueryParamsHandler = ({ type = 'klage' }: Props) => {
  const language = useLanguage();
  const [query] = useSearchParams();
  const innsendingsytelse = useInnsendingsytelseFromQuery();

  if (innsendingsytelse === null) {
    return <Navigate to={`/${language}`} replace />;
  }

  query.delete('tema');
  query.delete('tittel');

  return <Navigate to={`/${language}/${type}/ny/${innsendingsytelse}?${query.toString()}`} replace />;
};
