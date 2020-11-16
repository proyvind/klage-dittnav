import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ensureStringIsTema } from '../tema/tema';
import InngangHovedkategorier from './inngang/inngang-hovedkategorier';
import LandingPage from './landing-page';
import { getQueryValue } from '../query/get-query-value';
import { getTitle } from '../query/get-title';

const RootWithQuery = () => {
    const { search } = useLocation();

    const query = queryString.parse(search);
    const temaKey = ensureStringIsTema(getQueryValue(query.tema));
    if (temaKey === null) {
        return <InngangHovedkategorier />;
    }

    const title = getTitle(query, temaKey);
    const saksnummer = getQueryValue(query.saksnummer);
    return LandingPage(temaKey, title, saksnummer);
};

export default RootWithQuery;
