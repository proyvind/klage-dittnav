import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '@app/components/loading-page/loading-page';
import { useInnsendingsytelseFromQuery } from '@app/hooks/use-innsendingsytelse-from-query';
import { useUser } from '@app/hooks/use-user';
import { useTranslation } from '@app/language/use-translation';
import { NotFoundPage } from '@app/routes/not-found-page';

export const LandingPage = () => {
  const [query] = useSearchParams();
  const { isLoading } = useUser();
  const innsendingsytelse = useInnsendingsytelseFromQuery();
  const { landing_page } = useTranslation();

  if (isLoading) {
    return <LoadingPage>{landing_page.checking_user}</LoadingPage>;
  }

  if (innsendingsytelse === null) {
    return <NotFoundPage />;
  }

  query.delete('tema');
  query.delete('tittel');

  return <Navigate to={`${innsendingsytelse}?${query.toString()}`} />;
};
