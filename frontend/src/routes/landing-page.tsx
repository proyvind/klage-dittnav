import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { useInnsendingsytelseFromQuery } from '../hooks/use-innsendingsytelse-from-query';
import { useUser } from '../hooks/use-user';
import { innsendingsytelsePath } from '../kategorier/kategorier';
import { useTranslation } from '../language/use-translation';
import { InngangHovedkategorier } from './inngang/inngang-hovedkategorier';

export const LandingPage = () => {
  const [query] = useSearchParams();
  const { isLoading } = useUser();
  const innsendingsytelse = useInnsendingsytelseFromQuery();
  const { landing_page } = useTranslation();

  if (isLoading) {
    return <LoadingPage>{landing_page.checking_user}</LoadingPage>;
  }

  const path = innsendingsytelsePath(innsendingsytelse);

  if (path === null) {
    return <InngangHovedkategorier />;
  }

  query.delete('tema');
  query.delete('tittel');

  return <Navigate to={`${path}?${query.toString()}`} />;
};
