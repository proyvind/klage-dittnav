import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { queryStringify } from '../functions/query-string';
import { useUser } from '../hooks/use-user';
import { useTranslation } from '../language/use-translation';
import { TemaKey } from '../tema/tema';
import { InngangInnsending } from './inngang/inngang-innsendingsvalg';

export const LandingPage = (temaKey: TemaKey, titleKey: string, saksnummer: string | null = null) => {
  const { data: user, isLoading } = useUser();
  const { landing_page } = useTranslation();

  if (isLoading) {
    return <LoadingPage>{landing_page.checking_user}</LoadingPage>;
  }

  if (typeof user === 'undefined') {
    return (
      <InngangInnsending temaKey={temaKey} titleKey={titleKey} internalSaksnummer={saksnummer} supportsDigitalKlage />
    );
  }

  const query = queryStringify({
    tema: temaKey,
    tittel: titleKey,
    saksnummer,
  });

  return <Navigate to={`/klage/ny?${query}`} />;
};
