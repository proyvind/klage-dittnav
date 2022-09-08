import React from 'react';
import { useParams } from 'react-router-dom';
import { getQueryValue } from '../functions/get-query-value';
import { ensureStringIsTema } from '../tema/tema';
import { InngangHovedkategorier } from './inngang/inngang-hovedkategorier';
import { LandingPage } from './landing-page';

export const RootWithQuery = () => {
  const { tema, tittel, ytelse, saksnummer } = useParams();

  const temaKey = ensureStringIsTema(getQueryValue(tema?.split(',')));

  if (temaKey === null) {
    return <InngangHovedkategorier />;
  }

  const titleKey = getQueryValue(tittel);
  const ytelseKey = getQueryValue(ytelse);

  if (titleKey === null && ytelseKey === null) {
    return <InngangHovedkategorier />;
  }

  const saksnummerValue = getQueryValue(saksnummer);

  return LandingPage(temaKey, titleKey, ytelseKey, saksnummerValue);
};
