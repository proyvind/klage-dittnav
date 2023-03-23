import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '@app/components/loading-page/loading-page';
import { useInnsendingsytelseFromQuery } from '@app/hooks/use-innsendingsytelse-from-query';
import { useUser } from '@app/hooks/use-user';
import { innsendingsytelsePath } from '@app/kategorier/kategorier';
import { useTranslation } from '@app/language/use-translation';
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
