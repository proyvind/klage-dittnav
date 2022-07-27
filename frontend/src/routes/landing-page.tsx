import React from 'react';
import { Navigate } from 'react-router-dom';
import { queryStringify } from '../functions/query-string';
import { useTranslation } from '../language/use-translation';
import { LoadingPage } from '../loading-page/loading-page';
import { useGetUserQuery } from '../redux-api/user/api';
import { TemaKey } from '../tema/tema';
import { InngangInnsendingDigital } from './inngang/inngang-innsendingsvalg-digital';

export const LandingPage = (
  temaKey: TemaKey,
  titleKey: string | null,
  ytelse: string | null,
  saksnummer: string | null = null
) => {
  const { data: user, isLoading } = useGetUserQuery();
  const { landing_page } = useTranslation();

  if (isLoading) {
    return <LoadingPage>{landing_page.checking_user}</LoadingPage>;
  }

  if (typeof user === 'undefined') {
    return (
      <InngangInnsendingDigital temaKey={temaKey} ytelse={ytelse} titleKey={titleKey} internalSaksnummer={saksnummer} />
    );
  }

  const query = queryStringify({
    tema: temaKey,
    tittel: titleKey,
    ytelse,
    saksnummer,
  });

  return <Navigate to={`/ny?${query}`} />;
};
